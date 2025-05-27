# WhatsApp Chatbot Setup using Twilio and Node.js

## Prerequisites

- Node.js installed
- Python 3.x installed
- MongoDB Atlas account
- Twilio account with WhatsApp Sandbox access
- ngrok (for local webhook testing) or localtunnel
  ```bash
  # Install localtunnel globally
  npm install -g localtunnel
  # OR use npx directly
  npx localtunnel --port 5500
  ```

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/whizzy23/JanSahayak.git
   cd whatsapp-chatbot
   ```

2. **Install Node.js dependencies**:

   ```bash
   npm install
   ```

3. **Install Python dependencies**:

   ```bash
   pip install -r requirements.txt
   python -m spacy download en_core_web_md  # Using medium model for better accuracy
   ```

4. **Create a `.env` file** in the root directory:

   ```env
   PORT=5500
   MONGO_URI=mongodb+srv://<your-cluster-url>
   TWILIO_ACCOUNT_SID=your_account_sid
   TWILIO_AUTH_TOKEN=your_auth_token
   TWILIO_PHONE_NUMBER=your_twilio_whatsapp_number
   ```

## Running the Application

The application consists of two services that need to be running simultaneously:

1. **Start the Flask API (spaCy service)**:
   Open a new terminal and run:
   ```bash
   cd whatsapp-chatbot/services/flask_services
   python app.py
   ```
   This will start the spaCy service on http://127.0.0.1:5000

2. **Start the Node.js application**:
   Open another terminal and run:
   ```bash
   cd whatsapp-chatbot
   npm start
   ```
   This will start the WhatsApp chatbot server on http://localhost:5500

## Setting up Webhook URL for Local Development

You can use either ngrok or localtunnel to expose your local server to the internet. Here are instructions for both:

### Option 1: Using ngrok

1. **Install ngrok**:
   - Download from [ngrok.com](https://ngrok.com)
   - Sign up for a free account
   - Follow installation instructions for your OS
   - After installation, authenticate your ngrok account:
     ```bash
     ngrok config add-authtoken your_auth_token
     ```
     (Get your auth token from ngrok dashboard after signing up)

2. **Start your Node.js application**:
   ```bash
   cd whatsapp-chatbot
   npm start
   ```
   This will start your server on http://localhost:5500

3. **Start ngrok**:
   Open a new terminal and run:
   ```bash
   ngrok http 5500
   ```
   You'll see output like this:
   ```
   Session Status                online
   Account                       your-email@example.com
   Version                       3.x.x
   Region                       United States (us)
   Forwarding                    https://xxxx-xx-xx-xxx-xx.ngrok.io -> http://localhost:5500
   ```
   The `https://xxxx-xx-xx-xxx-xx.ngrok.io` is your public webhook URL

### Option 2: Using localtunnel (Simpler Alternative)

1. **Install localtunnel**:
   ```bash
   npm install -g localtunnel
   ```

2. **Start your Node.js application**:
   ```bash
   cd whatsapp-chatbot
   npm start
   ```
   This will start your server on http://localhost:5500

3. **Start localtunnel**:
   Open a new terminal and run:
   ```bash
   npx localtunnel --port 5500
   ```
   You'll see output like this:
   ```
   your url is: https://xxxx-xx-xx-xxx-xx.loca.lt
   ```
   The `https://xxxx-xx-xx-xxx-xx.loca.lt` is your public webhook URL

### Configure Twilio Webhook

After getting your public URL from either ngrok or localtunnel:

1. Go to [Twilio Console](https://console.twilio.com)
2. Navigate to Messaging → Settings → WhatsApp Sandbox Settings
3. Set the **Webhook URL** to your public URL + `/webhook`:
   ```
   https://xxxx-xx-xx-xxx-xx.ngrok.io/webhook    # if using ngrok
   # OR
   https://xxxx-xx-xx-xxx-xx.loca.lt/webhook     # if using localtunnel
   ```
4. Save the settings

### Testing the Webhook

1. Send a message to your Twilio WhatsApp number
2. Monitor the requests:
   - For ngrok: Open http://localhost:4040 to see the dashboard
   - For localtunnel: Watch the terminal output for incoming requests

### Important Notes

- **ngrok**:
  - The URL changes each time you restart ngrok (in the free tier)
  - Provides a web dashboard for monitoring requests
  - More stable and feature-rich

- **localtunnel**:
  - Simpler to set up and use
  - No authentication required
  - URLs are more stable (don't change as frequently)
  - No dashboard for monitoring requests
  - May be less stable than ngrok

Choose the tool that best fits your needs:
- Use ngrok if you need request monitoring and more stability
- Use localtunnel if you want a simpler setup and don't need monitoring

## Testing the Application

### Using Postman

1. Send a POST request to your webhook endpoint:
   ```
   POST http://localhost:5500/webhook
   ```

2. Use this sample request body to start a new complaint:
   ```json
   {
     "From": "+1234567890",
     "Body": "REPORT"
   }
   ```

3. Follow the conversation flow by sending subsequent messages:
   - Select department (1-9)
   - Enter city
   - Enter street details (or SKIP)
   - Enter landmark
   - Enter pincode
   - Describe the issue
   - Optionally add a photo

### Using WhatsApp

1. Join the Twilio WhatsApp Sandbox:
   - Send `join <your-code>` to the sandbox number from your personal WhatsApp
   - You will receive a confirmation reply from Twilio

2. Start a conversation:
   - Send "REPORT" to begin filing a complaint
   - Follow the interactive prompts
   - You can send photos by attaching them to your message

## Features

- Automated complaint registration
- Smart urgency classification using spaCy
- Photo attachment support
- Complaint tracking
- Department-wise categorization
- Location-based ticket ID generation
- Semantic similarity matching for better urgency classification
- Fallback keyword matching if spaCy service is unavailable

## Troubleshooting

1. **Flask API not starting**:
   - Ensure Python 3.x is installed
   - Check if all Python dependencies are installed
   - Verify spaCy model is downloaded
   - Check if port 5000 is available

2. **Node.js application not starting**:
   - Check if MongoDB connection string is correct
   - Ensure all Node.js dependencies are installed
   - Verify port 5500 is not in use
   - Check if environment variables are properly set

3. **Webhook not receiving messages**:
   - Verify ngrok is running and the URL is correct
   - Check if the webhook URL in Twilio console is updated
   - Ensure your local server is running
   - Check ngrok dashboard for incoming requests

4. **Urgency classification not working**:
   - Ensure Flask API is running on port 5000
   - Check if spaCy model is properly loaded
   - Verify the request/response format
   - Check the fallback keyword matching if spaCy service fails

## API Endpoints

### Flask API (spaCy Service)
- **POST** `/classify`
  - Request body: `{ "text": "your complaint description" }`
  - Response: `{ "urgency": "High|Medium|Low" }`

### Node.js Webhook
- **POST** `/webhook`
  - Handles incoming WhatsApp messages
  - Processes complaint registration
  - Manages conversation flow

## Project Structure
```
whatsapp-chatbot/
├── services/
│   ├── flask_services/
│   │   ├── app.py              # Flask application
│   │   ├── nlp_service.py      # NLP and classification logic
│   │   └── requirements.txt    # Python dependencies
│   └── urgencyService.js       # Node.js urgency service
├── models/
│   ├── Issue.js               # Issue schema
│   └── Counter.js             # Counter schema
├── routes/
│   └── webhook.js             # Webhook route handler
├── .env                       # Environment variables
└── package.json              # Node.js dependencies
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
