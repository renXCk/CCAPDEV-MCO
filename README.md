PGT Digital - Talent Management SystemA full-stack web application designed for Philippine's Got Talent (PGT) to manage audition schedules, talent profiles, and recruiter evaluations.

Overview
This system allows:
Talents: To register, update their vitals (height, weight, etc.), and book audition slots.
Recruiters: To browse talent profiles, rate performances, and manage specific audition bookings.
Admins: Full control over the user database and the creation/deletion of audition dates.

Tech Stack
Frontend: React (Vite) + Tailwind CSS + Lucide Icons
Backend: Node.js + Express
Database: MongoDB Atlas (Cloud)
State Management: LocalStorage & React State

How to Run the Project
1. PrerequisitesEnsure you have Node.js installed on your machine.
2. Clone and Install

Run: 
npm install

3. Start the Backend ServerIn your current terminal window, start the Node server: 
node app.js

You should see: Server is running on http://localhost:3000 and Connected to MongoDB Atlas!4. Start the Frontend ApplicationOpen a second, separate terminal window, navigate to the same project folder, and run:

npm run dev

Open the localhost link provided in the terminal (http://localhost:5173) in your browser.

This project uses a Shared Cloud Database. All data created on your machine will be visible to all the other group members.If the database is completely empty, run node seed.js in the terminal one time to populate it with sample data.

Gemini said
My bad, I totally get what you mean. The extra labels make it annoying to just double-click and copy the exact text you need.

Here is the updated README with the credentials written totally normally so you and your groupmates can just highlight, copy, and paste without grabbing extra words.

PGT Digital - Talent Management System
A full-stack web application designed for Philippine's Got Talent (PGT) to manage audition schedules, talent profiles, and recruiter evaluations.

Overview
This system allows:

Talents: To register, update their vitals (height, weight, etc.), and book audition slots.

Recruiters: To browse talent profiles, rate performances, and manage specific audition bookings.

Admins: Full control over the user database and the creation/deletion of audition dates.

Tech Stack
Frontend: React (Vite) + Tailwind CSS + Lucide Icons

Backend: Node.js + Express

Database: MongoDB Atlas (Cloud)

State Management: LocalStorage & React State

How to Run the Project
1. Prerequisites
Ensure you have Node.js installed on your machine.

2. Clone and Install
Open your terminal and run the following commands:

Bash
git clone [PASTE_YOUR_REPO_LINK_HERE]
cd [YOUR_PROJECT_FOLDER_NAME]
npm install
3. Start the Backend Server
In your current terminal window, start the Node server:

Bash
node app.js
You should see: Server is running on http://localhost:3000 and Connected to MongoDB Atlas!

4. Start the Frontend Application
Open a second, separate terminal window, navigate to the same project folder, and run:

Bash
npm run dev
Open the localhost link provided in the terminal (usually http://localhost:5173) in your browser.

Database Instructions
This project uses a Shared Cloud Database.

Do not change the connection string in app.js unless instructed.

All data created on your machine will be visible to all other group members.

If the database is completely empty, run node seed.js in the terminal one time to populate it with sample data.

Sample Login Credentials in seed.js
Admin
admin@pgt.com
admin123

Recruiter
smith@pgt.com
password123

Talent
emma@test.com
password123

