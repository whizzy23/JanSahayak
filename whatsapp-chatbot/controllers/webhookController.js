const Issue = require('../models/Issue');
const { getSession, clearSession } = require('../services/sessionService');

const deptMap = {
  '1': 'Roadways',
  '2': 'Electricity',
  '3': 'Water',
  '4': 'Gas',
};

// step IDs
const STEPS = {
  START:       0,
  DEPT:        1,
  DESCRIPTION: 2,
  PHOTO_OPT:   3,
  PHOTO:       4,
  COMPLETE:    5
};

exports.handleIncoming = async (req, res) => {
  const from     = req.body.From;
  const text     = (req.body.Body || '').trim();
  const media    = parseInt(req.body.NumMedia, 10);
  const mediaUrl = media > 0 ? req.body.MediaUrl0 : null;

  const session = getSession(from);

  // handle global commands
  if (/^RESET$/i.test(text)) {
    clearSession(from);
    session.step = STEPS.START;
  }
  if (/^BACK$/i.test(text) && session.history && session.history.length) {
    // pop last step and go back
    session.history.pop();
    const prev = session.history.pop() ?? STEPS.START;
    session.step = prev;
  }

  // record this step in history (unless resetting)
  session.history = session.history || [];
  if (session.history[session.history.length - 1] !== session.step) {
    session.history.push(session.step);
  }

  let reply;

  switch (session.step) {
    case STEPS.START:
      reply = [
        'Hi! Thanks for reporting an issue.',
        'Type **RESET** at any time to start over, or **BACK** to go to the previous question.',
        '',
        'Please select the department of concern:',
        '1. Roadways',
        '2. Electricity',
        '3. Water',
        '4. Gas'
      ].join('\n');
      session.step = STEPS.DEPT;
      break;

    case STEPS.DEPT:
      if (deptMap[text]) {
        session.department = deptMap[text];
        session.step = STEPS.DESCRIPTION;
        reply = `You chose *${session.department}*.\n\nPlease describe your issue in detail.`;
      } else {
        reply = [
          'Invalid choice.',
          'Select department by typing 1, 2, 3 or 4:',
          '1. Roadways',
          '2. Electricity',
          '3. Water',
          '4. Gas'
        ].join('\n');
      }
      break;

    case STEPS.DESCRIPTION:
      if (text.length < 5) {
        reply = 'Description too short. Please describe your issue in at least 5 characters.';
      } else {
        session.description = text;
        session.step = STEPS.PHOTO_OPT;
        reply = [
          'Would you like to share a photo?',
          '1. Yes',
          '2. No'
        ].join('\n');
      }
      break;

    case STEPS.PHOTO_OPT:
      if (text === '1') {
        session.step = STEPS.PHOTO;
        reply = 'Please send the photo now.';
      } else if (text === '2') {
        // save without photo
        try {
          const doc = await Issue.create({
            phone:       from,
            department:  session.department,
            description: session.description
          });
          console.log('Saved issue:', doc._id);
        } catch (err) {
          console.error('DB save error:', err);
          reply = 'Oops, something went wrong saving your issue. Please try again later.';
          break;
        }
        session.step = STEPS.COMPLETE;
        reply = 'Your issue has been recorded. Thank you!';
        clearSession(from);
      } else {
        reply = 'Reply with **1** for Yes or **2** for No.';
      }
      break;

    case STEPS.PHOTO:
      if (mediaUrl) {
        try {
          const doc = await Issue.create({
            phone:       from,
            department:  session.department,
            description: session.description,
            imageUrl:    mediaUrl
          });
          console.log('Saved issue with photo:', doc._id);
        } catch (err) {
          console.error('DB save error:', err);
          reply = 'Oops, couldn’t save your photo. Try again later.';
          break;
        }
        session.step = STEPS.COMPLETE;
        reply = 'Your issue (with photo) has been recorded. Thank you!';
        clearSession(from);
      } else {
        reply = 'No photo detected. Please send an image now, or type **BACK** to skip.';
      }
      break;

    default:
      reply = 'Something went wrong—type **RESET** to start over.';
      clearSession(from);
  }

  // Send TwiML response
  res.set('Content-Type', 'text/xml');
  res.send(`<Response><Message>${reply}</Message></Response>`);
};
