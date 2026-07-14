import { Router } from 'express';
import {
  getAllActivities,
  getActivityById,
  getActivitiesByUserId,
  createActivity,
  updateActivity,
  deleteActivity,
} from '../controllers/activityController';

const router = Router();

router.get('/', getAllActivities);
router.get('/:id', getActivityById);
router.get('/user/:userId', getActivitiesByUserId);
router.post('/', createActivity);
router.put('/:id', updateActivity);
router.delete('/:id', deleteActivity);

export default router;
