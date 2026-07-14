import { useState, useEffect } from 'react';
import api from '../services/api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const data = await api.getTeams();
      setTeams(data);
    } catch (error) {
      console.error('Error fetching teams:', error);
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
      <h1 className="mb-4">Teams</h1>

      <div className="row">
        {teams.map((team) => (
          <div key={team._id} className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h5 className="card-title">{team.name}</h5>
                  <span className="badge bg-success fs-6">{team.totalPoints} pts</span>
                </div>
                <p className="card-text">{team.description}</p>
                <p className="card-text">
                  <strong>Captain:</strong> {team.captainId.firstName} {team.captainId.lastName}
                </p>
                <div className="mt-3">
                  <h6>Team Members ({team.members.length}):</h6>
                  <ul className="list-group list-group-flush">
                    {team.members.map((member) => (
                      <li key={member._id} className="list-group-item d-flex justify-content-between align-items-center">
                        {member.firstName} {member.lastName} (@{member.username})
                        <span className="badge bg-primary">{member.totalPoints} pts</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {teams.length === 0 && (
        <div className="alert alert-info" role="alert">
          No teams created yet. Be the first to create a team!
        </div>
      )}
    </div>
  );
}

export default Teams;
