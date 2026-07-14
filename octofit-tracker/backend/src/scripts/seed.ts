import mongoose from 'mongoose';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    // Clear existing data
    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Workout.deleteMany({});

    console.log('Cleared existing data');

    // Create users
    const users = await User.create([
      {
        username: 'paul_octo',
        email: 'paul@mergington.edu',
        password: 'password123',
        firstName: 'Paul',
        lastName: 'Octo',
        age: 35,
        fitnessLevel: 'advanced',
        totalPoints: 0,
      },
      {
        username: 'jessica_cat',
        email: 'jessica@mergington.edu',
        password: 'password123',
        firstName: 'Jessica',
        lastName: 'Cat',
        age: 28,
        fitnessLevel: 'intermediate',
        totalPoints: 0,
      },
      {
        username: 'alex_runner',
        email: 'alex@mergington.edu',
        password: 'password123',
        firstName: 'Alex',
        lastName: 'Runner',
        age: 16,
        fitnessLevel: 'intermediate',
        totalPoints: 0,
      },
      {
        username: 'sam_fitness',
        email: 'sam@mergington.edu',
        password: 'password123',
        firstName: 'Sam',
        lastName: 'Fitness',
        age: 17,
        fitnessLevel: 'beginner',
        totalPoints: 0,
      },
    ]);

    console.log(`Created ${users.length} users`);

    // Create teams
    const teams = await Team.create([
      {
        name: 'Running Warriors',
        description: 'Team focused on cardio and running activities',
        captainId: users[0]._id,
        members: [users[0]._id, users[2]._id],
        totalPoints: 0,
      },
      {
        name: 'Strength Squad',
        description: 'Team focused on strength training',
        captainId: users[1]._id,
        members: [users[1]._id, users[3]._id],
        totalPoints: 0,
      },
    ]);

    console.log(`Created ${teams.length} teams`);

    // Update users with team assignments
    await User.findByIdAndUpdate(users[0]._id, { teamId: teams[0]._id });
    await User.findByIdAndUpdate(users[2]._id, { teamId: teams[0]._id });
    await User.findByIdAndUpdate(users[1]._id, { teamId: teams[1]._id });
    await User.findByIdAndUpdate(users[3]._id, { teamId: teams[1]._id });

    // Create activities
    const activities = await Activity.create([
      {
        userId: users[0]._id,
        activityType: 'running',
        duration: 30,
        distance: 5,
        caloriesBurned: 300,
        points: 30,
        notes: 'Morning run in the park',
        date: new Date(),
      },
      {
        userId: users[2]._id,
        activityType: 'walking',
        duration: 45,
        distance: 3,
        caloriesBurned: 150,
        points: 15,
        notes: 'Evening walk',
        date: new Date(),
      },
      {
        userId: users[1]._id,
        activityType: 'strength_training',
        duration: 60,
        caloriesBurned: 250,
        points: 25,
        notes: 'Upper body workout',
        date: new Date(),
      },
      {
        userId: users[3]._id,
        activityType: 'yoga',
        duration: 30,
        caloriesBurned: 100,
        points: 10,
        notes: 'Beginner yoga session',
        date: new Date(),
      },
    ]);

    console.log(`Created ${activities.length} activities`);

    // Update user and team points
    for (const activity of activities) {
      await User.findByIdAndUpdate(activity.userId, {
        $inc: { totalPoints: activity.points },
      });

      const user = await User.findById(activity.userId);
      if (user && user.teamId) {
        await Team.findByIdAndUpdate(user.teamId, {
          $inc: { totalPoints: activity.points },
        });
      }
    }

    // Create workouts
    const workouts = await Workout.create([
      {
        title: '5K Running Plan - Beginner',
        description: 'A beginner-friendly 5K running workout to build endurance',
        category: 'cardio',
        difficulty: 'beginner',
        duration: 30,
        exercises: [
          { name: 'Warm-up walk', duration: 5 },
          { name: 'Jog', duration: 20 },
          { name: 'Cool-down walk', duration: 5 },
        ],
        caloriesEstimate: 250,
        equipment: ['Running shoes'],
      },
      {
        title: 'Full Body Strength',
        description: 'Complete full-body strength training workout',
        category: 'strength',
        difficulty: 'intermediate',
        duration: 45,
        exercises: [
          { name: 'Push-ups', sets: 3, reps: 15 },
          { name: 'Squats', sets: 3, reps: 20 },
          { name: 'Lunges', sets: 3, reps: 12 },
          { name: 'Plank', sets: 3, duration: 60 },
        ],
        caloriesEstimate: 300,
        equipment: ['Dumbbells', 'Exercise mat'],
      },
      {
        title: 'Yoga for Flexibility',
        description: 'Improve flexibility and balance with this yoga routine',
        category: 'flexibility',
        difficulty: 'beginner',
        duration: 30,
        exercises: [
          { name: 'Sun Salutations', sets: 5 },
          { name: 'Warrior Pose', duration: 3 },
          { name: 'Tree Pose', duration: 2 },
          { name: 'Downward Dog', duration: 3 },
        ],
        caloriesEstimate: 100,
        equipment: ['Yoga mat'],
      },
      {
        title: 'HIIT Cardio Blast',
        description: 'High-intensity interval training for advanced users',
        category: 'cardio',
        difficulty: 'advanced',
        duration: 20,
        exercises: [
          { name: 'Burpees', sets: 4, reps: 10 },
          { name: 'Mountain Climbers', sets: 4, reps: 20 },
          { name: 'Jump Squats', sets: 4, reps: 15 },
          { name: 'High Knees', sets: 4, duration: 30 },
        ],
        caloriesEstimate: 400,
        equipment: [],
      },
    ]);

    console.log(`Created ${workouts.length} workouts`);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
