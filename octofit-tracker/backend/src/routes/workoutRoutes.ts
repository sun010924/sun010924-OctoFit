import { Router } from 'express';
import {
  getAllWorkouts,
  getWorkoutById,
  getWorkoutsByDifficulty,
  getWorkoutsByCategory,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} from '../controllers/workoutController';

const router = Router();

router.get('/', getAllWorkouts);
router.get('/:id', getWorkoutById);
router.get('/difficulty/:difficulty', getWorkoutsByDifficulty);
router.get('/category/:category', getWorkoutsByCategory);
router.post('/', createWorkout);
router.put('/:id', updateWorkout);
router.delete('/:id', deleteWorkout);

export default router;
