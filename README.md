## 🩺 AI-Powered Medical Appointment Reminder Tool

An intelligent appointment tracking and reminder system designed to help clinics and private doctors keep patients on schedule for follow-ups. Built using AI-assisted tools like **lovable.dev** and **Supabase AI**, this project integrates smart technology with user-friendly design to automate reminders via SMS, WhatsApp, and email.
- Project pitch deck: https://gamma.app/docs/Medical-Appointment-Whisperer-7uvw0vctlray91t
---

## Contents
- Project Info
- Screenshots
- Features
- Tech Stack
- View project
- API / Frontend Modules
- AI Features
- Security Notes
- Future Improvements
- Technologies used
- Deploy project
- Prompts
- Licenses
- Created by

## Project info
- **[project hosted on Netlify](https://medicalappointmentwhisperer.netlify.app/)**
- Project details **URL**: https://lovable.dev/projects/8b1b2d06-2448-4b75-a149-4f89b6c5e25c

## 📸 Screenshots

### 📅 Appointment Dashboard
![Appointment Dashboard](Dashboard.png)

### Patient Preview
![Patient Preview](Patients.png)

### 🔔 Reminder Preview
![Reminder Preview](Reminders.png)

### Medical Appointment Schema 
![Schema overview](schema.png)


---
  ## 🚀 Features

- 🗓️ Create and manage patient appointments
- 🔔 Automated reminders to patients and doctors
- 💬 Twilio integration for SMS and WhatsApp messaging
- 📧 Optional email reminder support
- 🤖 AI-powered message personalization (OpenAI)
- 📋 Optional: Smart follow-up recommendations

  ## 🛠️ Tech Stack

### 🧠 AI & Backend Services
| Tool         | Purpose                                         |
|--------------|-------------------------------------------------|
| **Supabase AI**   | Data management, real-time syncing, and auth  |
| **OpenAI**        | Message personalization & NLP               |
| **Twilio API**    | SMS & WhatsApp message delivery             |

### 🎨 Frontend Stack (via lovable.dev)
| Tool           | Role                                   |
|----------------|----------------------------------------|
| **Vite**       | Frontend build tool (fast dev server)  |
| **TypeScript** | Type-safe development                  |
| **React**      | UI library for building interfaces     |
| **shadcn/ui**  | Modern UI components                   |
| **Tailwind CSS** | Utility-first styling framework       |

---

## To view project...
```
# Step 1: Clone the repository using the project's Git URL.
git clone <https://github.com/fiona12-code/med-appt-whisperer-bot.git>

# Step 2: Navigate to the project directory.
cd <'med-appt-whisperer-bot>

# Step 3: Install the necessary dependencies.
npm install

# Step 4: Start the development server with auto-reloading and an instant preview.
Create a .env file and add:
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
OPENAI_API_KEY=your-openai-key
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_PHONE_NUMBER=+123456789

#Run the development server
npm run dev

```

## 📲 API / Frontend Modules
**Module / Feature**        	**Description**
- Appointments CRUD          	 Add, view, edit, and delete appointments
- Reminders Engine	           Schedules reminders before appointments
- Patient Notifications	       Sends messages via Twilio API
- AI Messaging	               Personalizes messages using OpenAI
- UI Components	               Built using shadcn/ui & Tailwind CSS

# 🤖 AI Features
- ✨ Message Personalization – OpenAI customizes reminder tone and content

- ⏱️ Smart Scheduling – (Planned) Predict optimal follow-up times

- 🧠 Patient Response Understanding – (Planned) Detects reschedule/cancel intents via AI

# 🔐 Security Notes
- Keep .env files out of version control

- Use HTTPS in production

- Secure all API keys and sanitize input data

# 📌 Future Improvements
- 📅 Google Calendar / Outlook integration

- 📲 Two-way WhatsApp messaging with AI reply parsing

- 🌐 Multilingual support

- 📊 Dashboard analytics for doctors



## Technologies used in this project

This project is built with:
- Lovable.ai
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase.com(database elements)
- Chatgpt
- Gamma Ai

## Deploy this project

Simply open [Lovable](https://lovable.dev/projects/8b1b2d06-2448-4b75-a149-4f89b6c5e25c) and click on Share -> Publish.

## ⚙️ My prompts
# ⚙️ Lovable.dev and Supabase prompts
1. Develop a website tool that automatically reminds both doctors and patients of appointments via SMS, WhatsApp, or other channels.
2. Connect to Supabase and add a database with patients and doctors details and tailor it to match the medical appointment reminder site built above
3. connect my supabase project `Medical Appointment`
4. Add a database with patients and doctors details and tailor it to match the medical appointment reminder site built above
5. I have reviewed the SQL and it looks good. Integrate the medical appointment reminder system with the Supabase database. 
6. How do I push this code to github and host project on netlify?

# ⚙️ ChatGpt Prompts
1. Give me the overview to developing a tool that automatically reminds both doctors and patients of appointments via SMS, WhatsApp, or other channels.
2. I used lovable.dev and supabase ai to build the platform. Generate a readme file to include these technologies used by lovable.dev ai and include their roles: Vite 
TypeScript
React
shadcn-ui
Tailwind CSS
3. I have uploaded the code used by Supabase and lovable.dev to create a schema. From the schema, generate a rough draft that I can use on draw.io
4. The photos uploaded show how the final project looks like. Generate a prompt for Gamma Ai to generate a pitch deck for the above project i.e   a tool that automatically reminds both doctors and patients of appointments via SMS, WhatsApp, or other channels. 


# 📄 License
MIT License

# 👩‍⚕️ Created by
# Group Lead
- Mary Fiona Atieno – Doctor | Aspiring Health-Tech Developer
- Email: omondifiona77@gmail.com
- GitHub: https://github.com/fiona12-code

# Software Testing
- Victor Mutua - Software Developer
- Email: victorkamole@gmail.com
- Github: https://github.com/vkamole

# ReadMe content
- Patience Jerop - Doctor | Aspiring Health-Tech Developer
- Email: peshchero1@gmail.com
- Github: https://github.com/pjayy99

 - Built with love using lovable.dev ❤️ and Supabase ai





