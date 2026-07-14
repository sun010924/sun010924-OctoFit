import { useState, useEffect } from 'react';
import api from '../services/api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const data = await api.getWorkouts();
      setWorkouts(data);
    } catch (error) {
      console.error('Error fetching workouts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredWorkouts = workouts.filter((workout) => {
    const difficultyMatch = filterDifficulty === 'all' || workout.difficulty === filterDifficulty;
    const categoryMatch = filterCategory === 'all' || workout.category === filterCategory;
    return difficultyMatch && categoryMatch;
  });

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
      <h1 className="mb-4">💪 Workout Suggestions</h1>

      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Filter by Difficulty</label>
              <select
                className="form-select"
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Filter by Category</label>
              <select
                className="form-select"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="cardio">Cardio</option>
                <option value="strength">Strength</option>
                <option value="flexibility">Flexibility</option>
                <option value="balance">Balance</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {filteredWorkouts.map((workout) => (
          <div key={workout._id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h5 className="card-title">{workout.title}</h5>
                  <span className={`badge ${
                    workout.difficulty === 'beginner' ? 'bg-success' :
                    workout.difficulty === 'intermediate' ? 'bg-warning' :
                    'bg-danger'
                  }`}>
                    {workout.difficulty}
                  </span>
                </div>
                <p className="card-text">{workout.description}</p>
                <div className="mb-3">
                  <span className="badge bg-secondary text-capitalize me-2">{workout.category}</span>
                  <span className="badge bg-info text-dark">{workout.duration} min</span>
                  <span className="badge bg-light text-dark ms-2">{workout.caloriesEstimate} cal</span>
                </div>
                <h6>Exercises:</h6>
                <ul className="list-group list-group-flush">
                  {workout.exercises.map((exercise, index) => (
                    <li key={index} className="list-group-item">
                      <strong>{exercise.name}</strong>
                      {exercise.sets && <span className="text-muted ms-2">{exercise.sets} sets</span>}
                      {exercise.reps && <span className="text-muted ms-2">× {exercise.reps}</span>}
                      {exercise.duration && <span className="text-muted ms-2">{exercise.duration}s</span>}
                    </li>
                  ))}
                </ul>
                {workout.equipment && workout.equipment.length > 0 && (
                  <div className="mt-3">
                    <small className="text-muted">
                      <strong>Equipment:</strong> {workout.equipment.join(', ')}
                    </small>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredWorkouts.length === 0 && (
        <div className="alert alert-info" role="alert">
          No workouts found with the selected filters.
        </div>
      )}
    </div>
  );
}

export default Workouts;
