# Workflow Automation

A powerful workflow automation platform that allows you to create, manage, and execute automated workflows with a visual drag-and-drop interface.

## Features

- Visual workflow builder with drag-and-drop interface
- Multiple integration nodes (Gmail, Dropbox, MySQL, PostgreSQL, etc.)
- Real-time workflow execution
- User authentication and authorization
- Workflow scheduling and monitoring

## Project Structure

```
.
├── backend/             # Node.js backend server
├── frontend/           # React frontend application
└── workflow-builder/   # Workflow builder component
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (v4.4 or higher)

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Mecasa-hub/workflow-automation.git
cd workflow-automation
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your configuration
# Edit the .env file with your MongoDB URI and other settings

# Start the development server
npm run dev
```

The backend server will start on http://localhost:5000

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend application will start on http://localhost:3000

### 4. Workflow Builder Setup

```bash
cd workflow-builder

# Install dependencies
npm install

# Start the development server
npm start
```

## Production Deployment

### Backend Deployment

1. Set up your production environment variables:
   ```bash
   # In your production environment
   export NODE_ENV=production
   export MONGODB_URI=your_production_mongodb_uri
   export JWT_SECRET=your_jwt_secret
   ```

2. Build and start the server:
   ```bash
   cd backend
   npm install --production
   npm run build
   npm start
   ```

### Frontend Deployment

1. Build the production bundle:
   ```bash
   cd frontend
   npm install
   npm run build
   ```

2. Serve the static files using a web server like Nginx or Apache

### Using Docker (Optional)

1. Build the Docker images:
   ```bash
   docker-compose build
   ```

2. Run the containers:
   ```bash
   docker-compose up -d
   ```

## Environment Variables

### Backend (.env)

```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/workflow-automation
JWT_SECRET=your_jwt_secret
```

### Frontend (.env)

```
REACT_APP_API_URL=http://localhost:5000
```

## API Documentation

API documentation is available at `/api/docs` when running the backend server.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
