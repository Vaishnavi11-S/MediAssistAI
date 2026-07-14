# MediAssist AI - API Documentation

## Base URL

```
http://localhost:8080/api
```

## Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### Authentication

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "user": {
    "id": "123",
    "name": "John Doe",
    "email": "user@example.com",
    "role": "USER"
  }
}
```

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "user@example.com",
  "phone": "+1234567890",
  "password": "password123"
}
```

**Response:**
```json
{
  "id": "123",
  "name": "John Doe",
  "email": "user@example.com",
  "role": "USER"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### AI Services

#### Chat
```http
POST /api/ai/chat
Authorization: Bearer <token>
Content-Type: application/json

{
  "message": "I have a headache",
  "history": [
    {
      "role": "user",
      "content": "Hello"
    },
    {
      "role": "assistant",
      "content": "Hi! How can I help you today?"
    }
  ]
}
```

**Response:**
```json
{
  "response": "I understand you're experiencing a headache...",
  "timestamp": 1234567890
}
```

#### Analyze Symptoms
```http
POST /api/ai/analyze-symptoms
Authorization: Bearer <token>
Content-Type: application/json

{
  "symptoms": "Fever, sore throat, headache"
}
```

**Response:**
```json
{
  "analysis": "Based on your symptoms...",
  "timestamp": 1234567890
}
```

#### Summarize Report
```http
POST /api/ai/summarize-report
Authorization: Bearer <token>
Content-Type: application/json

{
  "reportText": "Blood test results..."
}
```

**Response:**
```json
{
  "summary": "The report indicates...",
  "timestamp": 1234567890
}
```

### Appointments

#### Get User Appointments
```http
GET /api/appointments
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": "123",
    "userId": "user123",
    "doctorName": "Dr. Smith",
    "hospitalName": "City Hospital",
    "date": "2024-01-20",
    "time": "10:00 AM",
    "status": "CONFIRMED"
  }
]
```

#### Create Appointment
```http
POST /api/appointments
Authorization: Bearer <token>
Content-Type: application/json

{
  "doctorName": "Dr. Smith",
  "hospitalName": "City Hospital",
  "date": "2024-01-20",
  "time": "10:00 AM"
}
```

#### Update Appointment
```http
PUT /api/appointments/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "CONFIRMED"
}
```

#### Delete Appointment
```http
DELETE /api/appointments/{id}
Authorization: Bearer <token>
```

### Hospitals

#### Get All Hospitals
```http
GET /api/hospitals
```

**Response:**
```json
[
  {
    "id": "123",
    "name": "City General Hospital",
    "address": "123 Main Street",
    "phone": "+1234567890",
    "rating": 4.5,
    "isOpen": true,
    "specialties": ["Emergency", "Cardiology"]
  }
]
```

#### Get Hospital by ID
```http
GET /api/hospitals/{id}
```

#### Create Hospital (Admin)
```http
POST /api/hospitals
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "New Hospital",
  "address": "456 Oak Avenue",
  "phone": "+1234567890",
  "rating": 4.0,
  "specialties": ["General Medicine"]
}
```

### Medical Reports

#### Get User Reports
```http
GET /api/medical-reports
Authorization: Bearer <token>
```

#### Upload Report
```http
POST /api/medical-reports/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: <file>
```

#### Delete Report
```http
DELETE /api/medical-reports/{id}
Authorization: Bearer <token>
```

### Chat Conversations

#### Get User Conversations
```http
GET /api/chat
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": "123",
    "userId": "user123",
    "title": "Health Consultation",
    "messages": [
      {
        "role": "user",
        "content": "Hello",
        "timestamp": 1234567890
      }
    ]
  }
]
```

#### Create Conversation
```http
POST /api/chat
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "New Conversation",
  "messages": []
}
```

#### Update Conversation
```http
PUT /api/chat/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "messages": [
    {
      "role": "user",
      "content": "New message"
    }
  ]
}
```

#### Delete Conversation
```http
DELETE /api/chat/{id}
Authorization: Bearer <token>
```

### Health Tips

#### Get All Health Tips
```http
GET /api/health-tips
```

**Response:**
```json
[
  {
    "id": "123",
    "category": "NUTRITION",
    "title": "Eat More Fiber",
    "description": "Include fruits and vegetables..."
  }
]
```

#### Get Tips by Category
```http
GET /api/health-tips/category/{category}
```

#### Get Daily Tip
```http
GET /api/health-tips/daily
```

### Admin Endpoints

#### Get Dashboard Stats
```http
GET /api/admin/dashboard
Authorization: Bearer <admin-token>
```

**Response:**
```json
{
  "totalUsers": 1000,
  "totalAppointments": 500,
  "totalHospitals": 50,
  "totalFeedback": 200
}
```

#### Get All Users
```http
GET /api/admin/users
Authorization: Bearer <admin-token>
```

#### Update User Status
```http
PUT /api/admin/users/{id}/status
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "active": false
}
```

#### Delete User
```http
DELETE /api/admin/users/{id}
Authorization: Bearer <admin-token>
```

#### Get All Appointments
```http
GET /api/admin/appointments
Authorization: Bearer <admin-token>
```

#### Update Appointment Status
```http
PUT /api/admin/appointments/{id}/status
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "status": "CONFIRMED"
}
```

#### Get All Hospitals
```http
GET /api/admin/hospitals
Authorization: Bearer <admin-token>
```

#### Get All Feedback
```http
GET /api/admin/feedback
Authorization: Bearer <admin-token>
```

## Error Responses

All endpoints may return error responses in the following format:

```json
{
  "message": "Error description",
  "status": 400
}
```

### Common Status Codes

- `200 OK` - Request successful
- `201 Created` - Resource created
- `400 Bad Request` - Invalid request
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## Rate Limiting

API endpoints may be rate-limited to prevent abuse. Check the `X-RateLimit-*` headers in responses.

## Pagination

List endpoints support pagination via query parameters:

```
GET /api/appointments?page=0&size=10&sort=date,desc
```

## Filtering

Some endpoints support filtering:

```
GET /api/hospitals?status=ACTIVE&rating=4.5
```
