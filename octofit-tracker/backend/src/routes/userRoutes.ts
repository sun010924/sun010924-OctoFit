import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getLeaderboard,
} from '../controllers/userController';

const router = Router();

router.get('/', getAllUsers);
router.get('/leaderboard', getLeaderboard);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
