# student-teacher-appoinment
A web-based appointment booking system that enables students to book appointments with teachers, and allows administrators to manage the entire system efficiently.
# Features
Admin Module

Add/Update/Delete Teachers
Approve Student Registrations
View All Appointments
Manage System Users

Teacher Module

Login/Logout
Schedule Appointments
Approve/Cancel Appointments
View Messages from Students
View All Appointments

Student Module

Register/Login
Search Teachers by Name/Department/Subject
Book Appointments
Send Messages to Teachers
View Appointment Status

# Technologies Used

Frontend: HTML5, CSS3, JavaScript (ES6+)
Backend: Firebase

Authentication
Firestore Database
Hosting


Styling: Custom CSS with modern design patterns
Version Control: Git & GitHub

# Project Structure
appointment-system/
├── public/
│   ├── index.html              
│   ├── admin.html              
│   ├── teacher.html            
│   ├── student.html           
│   ├── css/
│   │   └── styles.css          
│   └── js/
│       ├── config.js           
│       ├── auth.js            
│       ├── admin.js           
│       ├── teacher.js          
│       ├── student.js          
│       └── logger.js           
├── firebase.json               
├── .firebaserc                 
└── README.md                  
# Installation & Setup
Prerequisites

Node.js (v14 or higher)
Firebase CLI
Git

Step 1: Clone the Repository
bashgit clone https://github.com/yourusername/appointment-system.git
cd appointment-system
Step 2: Install Firebase CLI
bashnpm install -g firebase-tools
Step 3: Firebase Setup

Go to Firebase Console
Create a new project
Enable Authentication (Email/Password)
Create Firestore Database
Copy your Firebase configuration

Step 4: Configure Firebase

Update public/js/config.js with your Firebase credentials
Initialize Firebase in your project:

bashfirebase login
firebase init
Step 5: Run Locally
bashfirebase serve
Access the application at http://localhost:5000
Step 6: Deploy to Firebase
bashfirebase deploy
# Default Admin Credentials
Important: Change these credentials after first login!

Email: admin@appointment.com
Password: admin123

# Database Schema
Collections
1. users
javascript{
  uid: string,
  email: string,
  role: 'admin' | 'teacher' | 'student',
  name: string,
  department: string (for teachers),
  subject: string (for teachers),
  approved: boolean (for students),
  createdAt: timestamp
}
2. appointments
javascript{
  appointmentId: string,
  studentId: string,
  studentName: string,
  teacherId: string,
  teacherName: string,
  date: string,
  time: string,
  purpose: string,
  status: 'pending' | 'approved' | 'cancelled',
  createdAt: timestamp
}
3. messages
javascript{
  messageId: string,
  from: string,
  to: string,
  subject: string,
  body: string,
  read: boolean,
  timestamp: timestamp
}
4. teachers
javascript{
  teacherId: string,
  name: string,
  email: string,
  department: string,
  subject: string,
  availability: object,
  createdAt: timestamp
}
# Security Rules
Firebase Security Rules are configured to:

Allow authenticated users to read/write their own data
Restrict admin operations to admin role
Prevent unauthorized access to sensitive data

# Testing
Test Cases

Admin Tests

Add new teacher with valid data
Update existing teacher information
Delete teacher
Approve student registration
View all appointments


Teacher Tests

Login with valid credentials
Schedule new appointment
Approve pending appointment
Cancel appointment
View messages from students


Student Tests

Register new account
Login with approved account
Search teachers by name/department
Book appointment with available teacher
Send message to teacher



Running Tests
bash# Manual testing checklist provided
# Automated tests can be added using Jest or similar frameworks
# Logging
All actions are logged using the custom Logger module:

User authentication events
Database operations
Error tracking
User actions

Logs are stored in browser console and can be extended to use external logging services.
# Design Principles

Modular Code: Separated concerns for maintainability
Responsive Design: Works on desktop, tablet, and mobile
User-Friendly: Intuitive interface for all user types
Secure: Firebase security rules and authentication
Scalable: Cloud-based architecture

# Optimization Strategies
Code Level

Modular JavaScript with clear separation of concerns
Efficient DOM manipulation
Lazy loading of components
Minification and compression

Architecture Level

Firebase serverless architecture
Real-time database updates
Caching strategies
CDN for static assets

Database Level

Indexed queries for faster retrieval
Proper data normalization
Efficient security rules

# Future Enhancements

Email notifications for appointments
Calendar integration
Video call integration
Mobile app (React Native)
Analytics dashboard
Recurring appointments
Teacher availability calendar


# License
This project is for education purpose.
# Authors

Name - Nanditha Krishna EM

# Acknowledgments

Firebase Documentation
MDN Web Docs
Stack Overflow Community
