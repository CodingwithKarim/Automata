# 🤖 Automata

Automate post creation for a professional networking platform. Allows you to publish text, images / vidoes, and documents such as .PDF and .docx.

This tool simulates real user interactions in a browser environment to create and publish updates with optional media or document attachments. Ideal for scheduled content, test automation, or hands-free personal branding. 

---

## ✨ Features

- 🔒 Secure login via environment variables
- 👥 Session Managment + Multi-profile support via profile folder
- 📝 Posts text content with optional delays to mimic human typing
- 📸 Supports image / videos and document uploads
- ⏱️ Built-in scheduling compatibility (e.g., cron) with scheduler file

---

## 📦 Installation

```bash
git clone https://github.com/CodingwithKarim/Automata.git
cd Automata
npm install
```

---

## 🛠️ Setup

1. Create a `.env` file:

```env
EMAIL=you@example.com
PASSWORD=your_password
```

2. Populate posts in the data.json file in project root. This social platform only allows either media or pdf/document. You can define a new profile on a post as long as you make sure the email + password are configured. 

```json
{
  "posts": [
    {
      "id": 1,
      "content": "Hello everyone",
      "media": [
        "abolute-path-to-image-or-video"
      ],
      "pdf": {
        "title": "",
        "path": ""
      },
      "scheduleAt": "2025-07-25T000:38:00-04:00",
      "status": "sent",
      "profile": "profile"
    }
  ]
}
```

3. Run single pass or use the cron bot:

```bash
// A single pass run that will run any pending post jobs
npm run past-due

// Using a node cron scheduler, this bot will stay running and check for updates every couple of mins
npm run cron
```

---

## 🧩 How It Works

AutoPostBot launches a real browser, signs into your account, and mimics how a user would:

- Click “Start a post”
- Fill in text
- Upload optional files (images or documents)
- Submit the post

All interactions are scoped to visible UI components and carefully timed to respect dynamic rendering delays. We do not want to act like a typical bot.

---


## ⚠️ Disclaimer

This tool is designed for **educational, personal, or internal use** only.  
Use responsibly and respect the platform’s terms of service.  
The author is not responsible for misuse or unintended consequences.
The platform this was built on already supports scheduled posts, however this can be used as a framework to interact with future web services in a **harmless** and **respectfull** way. 

---