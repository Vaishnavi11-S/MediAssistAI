# MediAssist AI - Intelligent Symptom Assessment & Healthcare Guidance System

A comprehensive, production-ready AI-powered healthcare web application that helps users understand their symptoms through conversational AI. The application provides preliminary health guidance, urgency assessment, medical report summarization, hospital recommendations, and appointment management.

## 🚀 Features

### Core Features
- **AI Symptom Checker** - ChatGPT-style interface for symptom analysis with structured health guidance
- **Medical Report Summarizer** - Upload PDF, DOCX, or TXT files for AI-powered summaries
- **Hospital Finder** - Search nearby hospitals with Google Maps integration
- **Appointment Booking** - Book, manage, and track healthcare appointments
- **Health Tips** - Daily personalized health recommendations
- **Emergency Module** - Quick access to emergency information and first aid instructions
- **AI Chatbot** - Real-time conversational AI with voice support and image analysis

### User Features
- User authentication (Login/Register/Forgot Password)
- Personalized dashboard with health analytics
- Profile management with medical history
- Dark mode support
- Multi-language support (English, Tamil, Hindi)
- Voice assistant (Speech-to-Text and Text-to-Speech)
- Chat history and conversation management

### Admin Features
- Admin dashboard with analytics
- User management
- Appointment management
- Hospital management
- Feedback management
- System monitoring

## 🛠 Tech Stack

### Frontend
- **React.js 18** - UI Framework
- **React Router** - Client-side routing
- **TailwindCSS** - Styling
- **Framer Motion** - Animations
- **Chart.js** - Data visualization
- **React Toastify** - Notifications
- **Axios** - HTTP client
- **React Icons** - Icon library

### Backend
- **Java Spring Boot 3.2** - Application framework
- **Spring Security** - Security framework
- **Spring Data MongoDB** - Database integration
- **JWT** - Authentication
- **Maven** - Build tool

### Database
- **MongoDB Atlas** - NoSQL database

### AI
- **Google Gemini API** - AI/ML capabilities

### Deployment
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Render** - Backend hosting (recommended)
- **Vercel/Netlify** - Frontend hosting (recommended)

## 📋 Prerequisites

- Node.js 18+ and npm
- Java 17+
- Maven 3.9+
- MongoDB Atlas account
- Google Gemini API key

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/MediassistAI.git
cd MediassistAI
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here
```

Start the frontend:

```bash
npm start
```

The frontend will be available at `http://localhost:3000`

### 3. Backend Setup

```bash
cd backend
mvn clean install
```

Configure `src/main/resources/application.properties`:

```properties
# MongoDB Configuration
spring.data.mongodb.uri=mongodb+srv://username:password@cluster.mongodb.net/mediassist?retryWrites=true&w=majority

# JWT Configuration
jwt.secret=your-secret-key-change-this-in-production
jwt.expiration=86400000

# Gemini API Configuration
gemini.api.key=your-gemini-api-key

# CORS Configuration
cors.allowed-origins=http://localhost:3000,http://localhost:5173
```

Run the backend:

```bash
mvn spring-boot:run
```

The backend will be available at `http://localhost:8080`

### 4. Docker Setup (Optional)

Using Docker Compose for easy deployment:

```bash
docker-compose up -d
```

This will start:
- MongoDB on port 27017
- Backend on port 8080
- Frontend on port 3000

## 📁 Project Structure

```
MediassistAI/
├── frontend/                 # React frontend
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── context/         # React context
│   │   ├── pages/           # Page components
│   │   │   ├── admin/       # Admin pages
│   │   │   ├── AIChatbot.js
│   │   │   ├── Appointments.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Emergency.js
│   │   │   ├── HealthTips.js
│   │   │   ├── HospitalFinder.js
│   │   │   ├── LandingPage.js
│   │   │   ├── LoginPage.js
│   │   │   ├── MedicalReports.js
│   │   │   ├── Profile.js
│   │   │   ├── RegisterPage.js
│   │   │   ├── Settings.js
│   │   │   └── SymptomChecker.js
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── tailwind.config.js
├── backend/                  # Spring Boot backend
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/mediassist/
│   │       │       ├── controller/   # REST controllers
│   │       │       ├── model/       # Data models
│   │       │       ├── repository/  # MongoDB repositories
│   │       │       ├── security/    # Security configuration
│   │       │       ├── service/     # Business logic
│   │       │       └── MediassistApplication.java
│   │       └── resources/
│   │           └── application.properties
│   └── pom.xml
├── docker/                   # Docker configuration
│   ├── Dockerfile.frontend
│   ├── Dockerfile.backend
│   └── docker-compose.yml
├── docs/                     # Documentation
├── sample-data/              # Sample data for testing
└── README.md
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user

### AI Services
- `POST /api/ai/chat` - AI chat conversation
- `POST /api/ai/analyze-symptoms` - Analyze symptoms
- `POST /api/ai/summarize-report` - Summarize medical report

### Appointments
- `GET /api/appointments` - Get user appointments
- `POST /api/appointments` - Create appointment
- `PUT /api/appointments/{id}` - Update appointment
- `DELETE /api/appointments/{id}` - Delete appointment

### Hospitals
- `GET /api/hospitals` - Get all hospitals
- `GET /api/hospitals/{id}` - Get hospital by ID
- `POST /api/hospitals` - Create hospital (Admin)
- `PUT /api/hospitals/{id}` - Update hospital (Admin)
- `DELETE /api/hospitals/{id}` - Delete hospital (Admin)

### Medical Reports
- `GET /api/medical-reports` - Get user reports
- `POST /api/medical-reports/upload` - Upload report
- `DELETE /api/medical-reports/{id}` - Delete report

### Chat Conversations
- `GET /api/chat` - Get user conversations
- `POST /api/chat` - Create conversation
- `PUT /api/chat/{id}` - Update conversation
- `DELETE /api/chat/{id}` - Delete conversation

### Health Tips
- `GET /api/health-tips` - Get all health tips
- `GET /api/health-tips/category/{category}` - Get tips by category
- `GET /api/health-tips/daily` - Get daily tip

### Admin
- `GET /api/admin/dashboard` - Get dashboard stats
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/{id}/status` - Update user status
- `DELETE /api/admin/users/{id}` - Delete user
- `GET /api/admin/appointments` - Get all appointments
- `GET /api/admin/hospitals` - Get all hospitals
- `GET /api/admin/feedback` - Get all feedback

## 🗄️ Database Collections

- **users** - User accounts and profiles
- **appointments** - Appointment bookings
- **assessments** - Symptom assessments
- **medicalReports** - Medical report summaries
- **hospitals** - Hospital information
- **feedback** - User feedback
- **chatConversations** - AI chat conversations
- **healthTips** - Health tips and recommendations

## 🔒 Security Features

- JWT authentication
- Password encryption with BCrypt
- Role-based access control (USER, ADMIN)
- CORS configuration
- Input validation
- Global exception handling

## 🎨 UI Features

- Modern glassmorphism design
- Responsive layout (mobile, tablet, desktop)
- Dark mode support
- Smooth animations with Framer Motion
- Loading skeletons
- Toast notifications
- Professional healthcare branding
- Beautiful gradients and shadows

## 🚀 Deployment

### Frontend Deployment (Vercel)

1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - **Build Command**: `cd frontend && npm run build`
   - **Output Directory**: `frontend/build`
3. Add environment variables:
   - `REACT_APP_API_URL`
   - `REACT_APP_GEMINI_API_KEY`
4. Deploy

### Backend Deployment (Render)

1. Connect your GitHub repository to Render
2. Create a new web service
3. Configure:
   - **Build Command**: `mvn clean package`
   - **Start Command**: `java -jar target/mediassist-backend-1.0.0.jar`
4. Add environment variables
5. Deploy

### MongoDB Atlas

1. Create a free MongoDB Atlas account
2. Create a cluster
3. Create a database user
4. Get the connection string
5. Update `application.properties`

## 📝 Environment Variables

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_GEMINI_API_KEY=your_gemini_api_key
```

### Backend (application.properties)
```properties
spring.data.mongodb.uri=mongodb+srv://username:password@cluster.mongodb.net/mediassist
jwt.secret=your-secret-key
jwt.expiration=86400000
gemini.api.key=your-gemini-api-key
cors.allowed-origins=http://localhost:3000
```

## 🧪 Testing

### Frontend Tests
```bash
cd frontend
npm test
```

### Backend Tests
```bash
cd backend
mvn test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## ⚠️ Disclaimer

**MediAssist AI provides educational health guidance only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider for medical concerns.**

## 👥 Authors

- **Your Name** - Initial work

## 🙏 Acknowledgments

- Google Gemini API for AI capabilities
- React community for excellent libraries
- Healthcare professionals for domain expertise

## 📞 Support

For support, email support@mediassist.ai or open an issue in the repository.

---

**Built with ❤️ for better healthcare accessibility**
