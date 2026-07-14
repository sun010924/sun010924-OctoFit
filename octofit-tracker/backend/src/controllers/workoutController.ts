import { Request, Response } from 'express';
import Workout from '../models/Workout';

// Get all workouts
export const getAllWorkouts = async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find().sort({ difficulty: 1, category: 1 });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching workouts', error });
  }
};

// Get workout by ID
export const getWorkoutById = async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.json(workout);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching workout', error });
  }
};

// Get workouts by difficulty
export const getWorkoutsByDifficulty = async (req: Request, res: Response) => {
  try {
    const { difficulty } = req.params;
    const workouts = await Workout.find({ difficulty }).sort({ category: 1 });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching workouts', error });
  }
};

// Get workouts by category
export const getWorkoutsByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const workouts = await Workout.find({ category }).sort({ difficulty: 1 });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching workouts', error });
  }
};

// Create new workout
export const createWorkout = async (req: Request, res: Response) => {
  try {
    const workout = new Workout(req.body);
    await workout.save();
    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({ message: 'Error creating workout', error });
  }
};

// Update workout
export const updateWorkout = async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.json(workout);
  } catch (error) {
    res.status(400).json({ message: 'Error updating workout', error });
  }
};

// Delete workout
export const deleteWorkout = async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.json({ message: 'Workout deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting workout', error });
  }
};
