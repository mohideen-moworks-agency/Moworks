# Moworks.AI - Business Analysis Platform

## Overview
Moworks.AI is a sophisticated business analysis platform that leverages AI to provide detailed insights and recommendations for businesses across various industries. The platform uses the Perplexity API for generating comprehensive business analyses and Firebase for authentication and data management.

## Features
- **AI-Powered Analysis**: Detailed business analysis using Perplexity API
- **User Authentication**: Secure Google authentication via Firebase
- **Rate Limiting**: 3 analyses per user per day
- **Responsive Design**: Professional UI that works across all devices
- **Real-time Updates**: Instant analysis results with live updates

## Tech Stack
- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth
- **API Integration**: Perplexity API
- **State Management**: React Context
- **Build Tool**: Vite

## Prerequisites
- Node.js 16+
- Firebase account
- Perplexity API key

## Setup Instructions

1. **Clone the Repository**
```bash
git clone <repository-url>
cd moworks-ai
```

2. **Install Dependencies**
```bash
npm install
```

3. **Environment Configuration**
Create a `.env` file in the root directory:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_PERPLEXITY_API_KEY=your_perplexity_api_key
```

4. **Firebase Setup**
- Create a new Firebase project
- Enable Google Authentication
- Add authorized domains in Firebase Console
- Copy Firebase configuration to `.env` file

5. **Development**
```bash
npm run dev
```

6. **Build for Production**
```bash
npm run build
```

## Project Structure
```
moworks-ai/
├── src/
│   ├── components/        # React components
│   ├── contexts/         # React context providers
│   ├── lib/             # Utility functions and API clients
│   ├── config/          # Configuration files
│   └── assets/          # Static assets
├── public/              # Public assets
└── package.json         # Project dependencies
```

## Key Components
- **AnalysisForm**: Main form for submitting analysis requests
- **ResultsDisplay**: Displays analysis results in a structured format
- **UserDashboard**: Shows user's analysis history and limits
- **AuthContext**: Manages authentication state
- **AnalysisContext**: Handles analysis state and API calls

## Rate Limiting
- 3 analyses per user per day
- Resets at midnight UTC
- Tracked using Firebase Firestore

## API Integration
- **Perplexity API**: Used for generating business analyses
- **Firebase Auth**: Handles user authentication
- **Firestore**: Stores user data and analysis history

## Deployment
The application can be deployed to various platforms:
- Vercel
- Netlify
- Firebase Hosting

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Open a pull request

## License
MIT License

## Support
For support, email support@moworks.ai