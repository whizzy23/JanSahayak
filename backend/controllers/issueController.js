const Issue = require('../models/Issue');

// GET all issues /api/issues
getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find().sort({ timestamp: -1 });
    res.json(issues);
  } catch (err) {
    res.status(500).json({ error: 'Server error while fetching issues.' });
  }
};

// GET particular issue /api/issues/:ticketId
getIssueById = async (req, res) => {
  try {
    const issue = await Issue.findOne({ ticketId: req.params.ticketId });
    if (!issue) return res.status(404).json({ error: 'Issue not found.' });
    res.json(issue);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching issue.' });
  }
};

const getIssueStats = async (req, res) => {
  try {
    const total = await Issue.countDocuments();
    const assigned = await Issue.countDocuments({ status: 'Assigned' });
    const pending = await Issue.countDocuments({ status: 'Pending' });
    const resolved = await Issue.countDocuments({ status: 'Resolved' });
    const unresolved = await Issue.countDocuments({ status: 'Unresolved' });

    const byDepartmentRaw = await Issue.aggregate([
      {
        $group: {
          _id: '$department',
          count: { $sum: 1 },
        },
      },
    ]);

    const byDepartment = {};
    byDepartmentRaw.forEach(dep => {
      byDepartment[dep._id] = dep.count;
    });

    res.json({ total, assigned, pending, resolved, unresolved, byDepartment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};

// PUT Update an issue /api/issues/:ticketId
updateIssue = async (req, res) => {
  try {
    const updates = (({
      status,
      urgency,
      comments,
      assignedTo,
      resolution,
      resolutionDate
    }) => ({
      ...(status && { status }),
      ...(urgency && { urgency }),
      ...(comments && { comments }),
      ...(assignedTo && { assignedTo }),
      ...(resolution && { resolution }),
      ...(resolutionDate && { resolutionDate }),
    }))(req.body);  

    const issue = await Issue.findOneAndUpdate(
      { ticketId: req.params.ticketId },
      { $set: updates },
      { new: true }
    );  

    if (!issue) return res.status(404).json({ error: 'Issue not found.' });
    res.json(issue);
  } catch (err) {
    res.status(500).json({ error: 'Error updating issue.' });
  }  
};  

module.exports = {
  getAllIssues,
  getIssueById,
  updateIssue,
  getIssueStats
};