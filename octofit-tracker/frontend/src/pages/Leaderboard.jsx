import { useState, useEffect } from 'react';
import api from '../services/api';

function Leaderboard() {
  const [userLeaderboard, setUserLeaderboard] = useState([]);
  const [teamLeaderboard, setTeamLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('users');

  useEffect(() => {
    fetchLeaderboards();
  }, []);

  const fetchLeaderboards = async () => {
    try {
      const [users, teams] = await Promise.all([
        api.getLeaderboard(10),
        api.getTeamLeaderboard(10),
      ]);
      setUserLeaderboard(users);
      setTeamLeaderboard(teams);
    } catch (error) {
      console.error('Error fetching leaderboards:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h1 className="mb-4">🏆 Leaderboard</h1>

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Individual Rankings
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'teams' ? 'active' : ''}`}
            onClick={() => setActiveTab('teams')}
          >
            Team Rankings
          </button>
        </li>
      </ul>

      {activeTab === 'users' && (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title mb-4">Top Students</h5>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Fitness Level</th>
                    <th>Team</th>
                    <th className="text-end">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {userLeaderboard.map((user, index) => (
                    <tr key={user._id}>
                      <td>
                        <strong className={index < 3 ? 'text-warning' : ''}>
                          {index === 0 && '🥇 '}
                          {index === 1 && '🥈 '}
                          {index === 2 && '🥉 '}
                          #{index + 1}
                        </strong>
                      </td>
                      <td>
                        {user.firstName} {user.lastName}
                      </td>
                      <td>@{user.username}</td>
                      <td>
                        <span className="badge bg-secondary text-capitalize">
                          {user.fitnessLevel}
                        </span>
                      </td>
                      <td>{user.teamId?.name || 'No Team'}</td>
                      <td className="text-end">
                        <strong className="text-primary">{user.totalPoints}</strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'teams' && (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title mb-4">Top Teams</h5>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Team Name</th>
                    <th>Captain</th>
                    <th>Members</th>
                    <th className="text-end">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {teamLeaderboard.map((team, index) => (
                    <tr key={team._id}>
                      <td>
                        <strong className={index < 3 ? 'text-warning' : ''}>
                          {index === 0 && '🥇 '}
                          {index === 1 && '🥈 '}
                          {index === 2 && '🥉 '}
                          #{index + 1}
                        </strong>
                      </td>
                      <td>{team.name}</td>
                      <td>
                        {team.captainId.firstName} {team.captainId.lastName}
                      </td>
                      <td>{team.members.length}</td>
                      <td className="text-end">
                        <strong className="text-success">{team.totalPoints}</strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
