import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-8 mx-auto text-center">
          <img src="/logo.png" alt="OctoFit" className="img-fluid mb-4" style={{ maxWidth: '300px' }} />
          <h1 className="display-4 mb-4">Welcome to OctoFit Tracker</h1>
          <p className="lead mb-4">
            Track your fitness journey, compete with friends, and achieve your health goals at Mergington High School!
          </p>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-6 col-lg-3 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center">
              <h2 className="display-6 mb-3">📊</h2>
              <h5 className="card-title">Track Activities</h5>
              <p className="card-text">Log your workouts and monitor your progress</p>
              <Link to="/activities" className="btn btn-primary">
                View Activities
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center">
              <h2 className="display-6 mb-3">👥</h2>
              <h5 className="card-title">Join Teams</h5>
              <p className="card-text">Create or join teams and compete together</p>
              <Link to="/teams" className="btn btn-primary">
                View Teams
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center">
              <h2 className="display-6 mb-3">🏆</h2>
              <h5 className="card-title">Leaderboard</h5>
              <p className="card-text">See who's leading and compete for the top spot</p>
              <Link to="/leaderboard" className="btn btn-primary">
                View Rankings
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center">
              <h2 className="display-6 mb-3">💪</h2>
              <h5 className="card-title">Workout Plans</h5>
              <p className="card-text">Discover personalized workout suggestions</p>
              <Link to="/workouts" className="btn btn-primary">
                View Workouts
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-lg-8 mx-auto">
          <div className="card bg-light">
            <div className="card-body">
              <h3 className="card-title">About OctoFit Tracker</h3>
              <p className="card-text">
                OctoFit Tracker was created by Paul Octo, a PE teacher at Mergington High School, 
                to help students stay active and engaged in fitness activities outside of class. 
                The app makes tracking workouts fun through gamification, team challenges, and 
                friendly competition!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
