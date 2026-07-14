import { useState, useEffect } from 'react';
import api from '../services/api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    userId: '',
    activityType: 'running',
    duration: '',
    distance: '',
    caloriesBurned: '',
    notes: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchActivities();
    fetchUsers();
  }, []);

  const fetchActivities = async () => {
    try {
      const data = await api.getActivities();
      setActivities(data);
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await api.getUsers();
      setUsers(data);
      if (data.length > 0) {
        setFormData(prev => ({ ...prev, userId: data[0]._id }));
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.createActivity(formData);
      setShowForm(false);
      setFormData({
        userId: users.length > 0 ? users[0]._id : '',
        activityType: 'running',
        duration: '',
        distance: '',
        caloriesBurned: '',
        notes: '',
        date: new Date().toISOString().split('T')[0],
      });
      fetchActivities();
    } catch (error) {
      console.error('Error creating activity:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      try {
        await api.deleteActivity(id);
        fetchActivities();
      } catch (error) {
        console.error('Error deleting activity:', error);
      }
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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Activities</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Log Activity'}
        </button>
      </div>

      {showForm && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Log New Activity</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">User</label>
                <select
                  className="form-select"
                  value={formData.userId}
                  onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                  required
                >
                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.firstName} {user.lastName} (@{user.username})
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Activity Type</label>
                <select
                  className="form-select"
                  value={formData.activityType}
                  onChange={(e) => setFormData({ ...formData, activityType: e.target.value })}
                  required
                >
                  <option value="running">Running</option>
                  <option value="walking">Walking</option>
                  <option value="cycling">Cycling</option>
                  <option value="swimming">Swimming</option>
                  <option value="strength_training">Strength Training</option>
                  <option value="yoga">Yoga</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">Duration (minutes)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    required
                    min="1"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Distance (km)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.distance}
                    onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
                    step="0.1"
                    min="0"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Calories Burned</label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.caloriesBurned}
                    onChange={(e) => setFormData({ ...formData, caloriesBurned: e.target.value })}
                    min="0"
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Notes</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Log Activity
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="row">
        {activities.map((activity) => (
          <div key={activity._id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h5 className="card-title text-capitalize">
                    {activity.activityType.replace('_', ' ')}
                  </h5>
                  <span className="badge bg-primary">{activity.points} pts</span>
                </div>
                <p className="card-text">
                  <strong>User:</strong> {activity.userId.firstName} {activity.userId.lastName}
                </p>
                <p className="card-text">
                  <strong>Duration:</strong> {activity.duration} minutes
                </p>
                {activity.distance && (
                  <p className="card-text">
                    <strong>Distance:</strong> {activity.distance} km
                  </p>
                )}
                {activity.caloriesBurned && (
                  <p className="card-text">
                    <strong>Calories:</strong> {activity.caloriesBurned}
                  </p>
                )}
                {activity.notes && (
                  <p className="card-text">
                    <small className="text-muted">{activity.notes}</small>
                  </p>
                )}
                <p className="card-text">
                  <small className="text-muted">
                    {new Date(activity.date).toLocaleDateString()}
                  </small>
                </p>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(activity._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {activities.length === 0 && (
        <div className="alert alert-info" role="alert">
          No activities logged yet. Click "Log Activity" to get started!
        </div>
      )}
    </div>
  );
}

export default Activities;
