# Build Applications with GitHub Copilot Agent Mode

<img src="https://octodex.github.com/images/Professortocat_v2.png" align="right" height="200px" />

## OctoFit Tracker - Fitness Application for Mergington High School

A comprehensive fitness tracking application built with GitHub Copilot Agent Mode, designed to help students at Mergington High School stay active and engaged through activity logging, team challenges, and friendly competition.

### 🎯 Features

- **User Profiles**: Manage student information with fitness levels and achievements
- **Activity Logging**: Track various activities (running, walking, cycling, swimming, strength training, yoga)
- **Team Management**: Create and join teams for collaborative fitness challenges
- **Competitive Leaderboards**: Individual and team rankings based on points earned
- **Personalized Workouts**: Discover workout suggestions tailored to different fitness levels

### 🏗️ Technology Stack

**Frontend** (Port 5173):
- React 19 with Vite
- React Router DOM for navigation
- Bootstrap 5 for styling

**Backend** (Port 8000):
- Node.js with Express
- TypeScript
- MongoDB with Mongoose

**Database** (Port 27017):
- MongoDB 8.0 (Docker container)

### 📋 Prerequisites

- Node.js (LTS version)
- Docker (for MongoDB)
- npm or yarn

### 🚀 Getting Started

#### 1. Clone the Repository

```bash
git clone https://github.com/sun010924/sun010924-OctoFit.git
cd sun010924-OctoFit
```

#### 2. Start MongoDB

```bash
docker run -d --name mongodb -p 27017:27017 mongo:8.0
```

#### 3. Set Up Backend

```bash
cd octofit-tracker/backend
npm install
npm run seed  # Seed database with sample data
npm run dev   # Start backend server
```

Backend API will be available at `http://localhost:8000`

#### 4. Set Up Frontend

```bash
cd octofit-tracker/frontend
npm install
npm run dev   # Start frontend server
```

Frontend will be available at `http://localhost:5173`

### 📚 API Documentation

Base URL: `http://localhost:8000/api`

#### Users

- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `GET /users/leaderboard` - Get top users by points
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

#### Teams

- `GET /teams` - Get all teams
- `GET /teams/:id` - Get team by ID
- `GET /teams/leaderboard` - Get top teams by points
- `POST /teams` - Create new team
- `PUT /teams/:id` - Update team
- `POST /teams/:id/members` - Add member to team
- `DELETE /teams/:id/members` - Remove member from team
- `DELETE /teams/:id` - Delete team

#### Activities

- `GET /activities` - Get all activities
- `GET /activities/:id` - Get activity by ID
- `GET /activities/user/:userId` - Get activities by user
- `POST /activities` - Create new activity
- `PUT /activities/:id` - Update activity
- `DELETE /activities/:id` - Delete activity

#### Workouts

- `GET /workouts` - Get all workouts
- `GET /workouts/:id` - Get workout by ID
- `GET /workouts/difficulty/:difficulty` - Get workouts by difficulty
- `GET /workouts/category/:category` - Get workouts by category
- `POST /workouts` - Create new workout
- `PUT /workouts/:id` - Update workout
- `DELETE /workouts/:id` - Delete workout

### 🎮 Usage

1. **Home Page**: Overview of the application and quick access to main features
2. **Activities**: Log new workouts and view activity history
3. **Teams**: Browse teams, view members, and see team statistics
4. **Leaderboard**: Check rankings for both individuals and teams
5. **Workouts**: Explore workout suggestions filtered by difficulty and category
6. **Profile**: View user information and activity history

### 🧪 Testing

Test API endpoints:
```bash
# Get all users
curl http://localhost:8000/api/users

# Get leaderboard
curl http://localhost:8000/api/users/leaderboard

# Get workouts
curl http://localhost:8000/api/workouts
```

### 🎓 About

OctoFit Tracker was created by Paul Octo, a PE teacher at Mergington High School, to encourage students to stay active outside of class through gamification, team challenges, and friendly competition.

Built with GitHub Copilot Agent Mode, demonstrating rapid application development with AI assistance.

### 📝 Project Structure

```
octofit-tracker/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts
│   │   ├── models/
│   │   │   ├── User.ts
│   │   │   ├── Team.ts
│   │   │   ├── Activity.ts
│   │   │   └── Workout.ts
│   │   ├── controllers/
│   │   │   ├── userController.ts
│   │   │   ├── teamController.ts
│   │   │   ├── activityController.ts
│   │   │   └── workoutController.ts
│   │   ├── routes/
│   │   │   ├── userRoutes.ts
│   │   │   ├── teamRoutes.ts
│   │   │   ├── activityRoutes.ts
│   │   │   └── workoutRoutes.ts
│   │   ├── scripts/
│   │   │   └── seed.ts
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navigation.jsx
    │   │   └── Footer.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Activities.jsx
    │   │   ├── Teams.jsx
    │   │   ├── Leaderboard.jsx
    │   │   ├── Workouts.jsx
    │   │   └── Profile.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

### 🤝 Contributing

This is an educational project demonstrating GitHub Copilot Agent Mode capabilities.

### 📄 License

MIT License - See LICENSE file for details

---

Built with ❤️ using GitHub Copilot Agent Mode

