import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Profile() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [userActivities, setUserActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUserId) {
      fetchUserActivities(selectedUserId);
    }
  }, [selectedUserId]);

  const fetchUsers = async () => {
    try {
      const data = await api.getUsers();
      setUsers(data);
      if (data.length > 0) {
        setSelectedUserId(data[0]._id);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserActivities = async (userId) => {
    try {
      const data = await api.getActivitiesByUserId(userId);
      setUserActivities(data);
    } catch (error) {
      console.error('Error fetching user activities:', error);
    }
  };

  const selectedUser = users.find((u) => u._id === selectedUserId);

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
      <h1 className="mb-4">User Profile</h1>

      <div className="card mb-4">
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">Select User</label>
            <select
              className="form-select"
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
            >
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.firstName} {user.lastName} (@{user.username})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {selectedUser && (
        <>
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Profile Information</h5>
              <div className="row">
                <div className="col-md-6">
                  <p><strong>Name:</strong> {selectedUser.firstName} {selectedUser.lastName}</p>
                  <p><strong>Username:</strong> @{selectedUser.username}</p>
                  <p><strong>Email:</strong> {selectedUser.email}</p>
                </div>
                <div className="col-md-6">
                  <p><strong>Age:</strong> {selectedUser.age || 'Not specified'}</p>
                  <p><strong>Fitness Level:</strong> 
                    <span className="badge bg-secondary text-capitalize ms-2">
                      {selectedUser.fitnessLevel}
                    </span>
                  </p>
                  <p><strong>Team:</strong> {selectedUser.teamId?.name || 'No Team'}</p>
                  <p><strong>Total Points:</strong> 
                    <span className="badge bg-primary ms-2 fs-6">{selectedUser.totalPoints}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Activity History</h5>
              {userActivities.length === 0 ? (
                <p className="text-muted">No activities logged yet.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Activity</th>
                        <th>Duration</th>
                        <th>Distance</th>
                        <th>Points</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userActivities.map((activity) => (
                        <tr key={activity._id}>
                          <td>{new Date(activity.date).toLocaleDateString()}</td>
                          <td className="text-capitalize">
                            {activity.activityType.replace('_', ' ')}
                          </td>
                          <td>{activity.duration} min</td>
                          <td>{activity.distance ? `${activity.distance} km` : '-'}</td>
                          <td>
                            <span className="badge bg-primary">{activity.points}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
