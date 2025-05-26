# WhatsApp Chatbot Setup using Twilio and Node.js

## Prerequisites

- Node.js installed
- MongoDB Atlas account
- Twilio account with WhatsApp Sandbox access

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/whizzy23/JanSahayak.git
   cd whatsapp-chatbot
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory:

   ```env
   PORT=5500
   MONGO_URI=mongodb+srv://<your-cluster-url>
   ```

## Start Local Server (for testing)

To start the local server, run:

```bash
npm start
```

## Expose Local Server (for testing)

Use LocalTunnel to expose your local development server:

```bash
npx localtunnel --port 5500
```

Copy the generated URL (e.g., `https://your-url.loca.lt`).

## Twilio WhatsApp Sandbox Setup

1. Sign in to your Twilio account and go to:

   ```
   Messaging → Settings → WhatsApp Sandbox Settings
   ```

2. Set the **Webhook URL** to:

   ```
   https://your-url.loca.lt/webhook
   ```

3. Follow Twilio's instructions to join the sandbox:

   - Send `join <your-code>` to the sandbox number from your personal WhatsApp.
   - You will receive a confirmation reply from Twilio.

4. Open a new WhatsApp chat with the sandbox number and send any message to begin testing.
