const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

class ApiService {
  // Users
  async getUsers() {
    const response = await fetch(`${API_BASE_URL}/users`);
    return response.json();
  }

  async getUserById(id) {
    const response = await fetch(`${API_BASE_URL}/users/${id}`);
    return response.json();
  }

  async createUser(userData) {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return response.json();
  }

  async updateUser(id, userData) {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return response.json();
  }

  async getLeaderboard(limit = 10) {
    const response = await fetch(`${API_BASE_URL}/users/leaderboard?limit=${limit}`);
    return response.json();
  }

  // Teams
  async getTeams() {
    const response = await fetch(`${API_BASE_URL}/teams`);
    return response.json();
  }

  async getTeamById(id) {
    const response = await fetch(`${API_BASE_URL}/teams/${id}`);
    return response.json();
  }

  async createTeam(teamData) {
    const response = await fetch(`${API_BASE_URL}/teams`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(teamData),
    });
    return response.json();
  }

  async updateTeam(id, teamData) {
    const response = await fetch(`${API_BASE_URL}/teams/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(teamData),
    });
    return response.json();
  }

  async addMemberToTeam(teamId, userId) {
    const response = await fetch(`${API_BASE_URL}/teams/${teamId}/members`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });
    return response.json();
  }

  async getTeamLeaderboard(limit = 10) {
    const response = await fetch(`${API_BASE_URL}/teams/leaderboard?limit=${limit}`);
    return response.json();
  }

  // Activities
  async getActivities() {
    const response = await fetch(`${API_BASE_URL}/activities`);
    return response.json();
  }

  async getActivitiesByUserId(userId) {
    const response = await fetch(`${API_BASE_URL}/activities/user/${userId}`);
    return response.json();
  }

  async createActivity(activityData) {
    const response = await fetch(`${API_BASE_URL}/activities`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(activityData),
    });
    return response.json();
  }

  async updateActivity(id, activityData) {
    const response = await fetch(`${API_BASE_URL}/activities/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(activityData),
    });
    return response.json();
  }

  async deleteActivity(id) {
    const response = await fetch(`${API_BASE_URL}/activities/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  }

  // Workouts
  async getWorkouts() {
    const response = await fetch(`${API_BASE_URL}/workouts`);
    return response.json();
  }

  async getWorkoutsByDifficulty(difficulty) {
    const response = await fetch(`${API_BASE_URL}/workouts/difficulty/${difficulty}`);
    return response.json();
  }

  async getWorkoutsByCategory(category) {
    const response = await fetch(`${API_BASE_URL}/workouts/category/${category}`);
    return response.json();
  }
}

export default new ApiService();
