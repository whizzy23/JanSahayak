# WhatsApp Chatbot Setup using Twilio and Node.js

## Prerequisites

- Node.js installed
- Python 3.x installed
- MongoDB Atlas account
- Twilio account with WhatsApp Sandbox access

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
   python -m spacy download en_core_web_sm
   ```

4. **Create a `.env` file** in the root directory:

   ```env
   PORT=5500
   MONGO_URI=mongodb+srv://<your-cluster-url>
   ```

## Running the Application

The application consists of two services that need to be running simultaneously:

1. **Start the Flask API (spaCy service)**:
   Open a new terminal and run:
   ```bash
   cd whatsapp-chatbot
   python services/spacy_service.py
   ```
   This will start the spaCy service on http://127.0.0.1:5000

2. **Start the Node.js application**:
   Open another terminal and run:
   ```bash
   cd whatsapp-chatbot
   npm start
   ```
   This will start the WhatsApp chatbot server on http://localhost:5500

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

1. Sign in to your Twilio account and go to:
   ```
   Messaging → Settings → WhatsApp Sandbox Settings
   ```

2. Set the **Webhook URL** to:
   ```
   https://your-url.loca.lt/webhook
   ```

3. Follow Twilio's instructions to join the sandbox:
   - Send `join <your-code>` to the sandbox number from your personal WhatsApp
   - You will receive a confirmation reply from Twilio

4. Open a new WhatsApp chat with the sandbox number and send any message to begin testing

## Features

- Automated complaint registration
- Smart urgency classification using spaCy
- Photo attachment support
- Complaint tracking
- Department-wise categorization
- Location-based ticket ID generation

## Troubleshooting

1. **Flask API not starting**:
   - Ensure Python 3.x is installed
   - Check if all Python dependencies are installed
   - Verify spaCy model is downloaded

2. **Node.js application not starting**:
   - Check if MongoDB connection string is correct
   - Ensure all Node.js dependencies are installed
   - Verify port 5500 is not in use

3. **Urgency classification not working**:
   - Ensure Flask API is running on port 5000
   - Check if spaCy model is properly loaded
   - Verify the request/response format

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

## Flask API Setup

The Flask API provides natural language processing capabilities using spaCy for urgency classification of complaints.

### Flask API Structure
```
services/
├── spacy_service.py      # Main Flask application
├── urgency_classifier.py # Urgency classification logic
└── requirements.txt      # Python dependencies
```

### Flask API Features
- Real-time text analysis using spaCy
- Urgency classification (High/Medium/Low)
- RESTful API endpoints
- Asynchronous request handling

### Flask API Configuration
1. **Environment Setup**:
   ```bash
   # Create and activate virtual environment (optional but recommended)
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   
   # Install dependencies
   pip install -r requirements.txt
   python -m spacy download en_core_web_sm
   ```

2. **Running the Flask API**:
   ```bash
   python services/spacy_service.py
   ```
   The API will be available at `http://127.0.0.1:5000`

3. **Testing the Flask API**:
   ```bash
   curl -X POST http://127.0.0.1:5000/classify \
   -H "Content-Type: application/json" \
   -d '{"text": "There is a dangerous pothole on the main road"}'
   ```

### Flask API Dependencies
- Flask==2.0.1
- spacy==3.1.0
- python-dotenv==0.19.0
- requests==2.26.0
