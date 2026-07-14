import { Router } from 'express';
import {
  getAllTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
  addMemberToTeam,
  removeMemberFromTeam,
  getTeamLeaderboard,
} from '../controllers/teamController';

const router = Router();

router.get('/', getAllTeams);
router.get('/leaderboard', getTeamLeaderboard);
router.get('/:id', getTeamById);
router.post('/', createTeam);
router.put('/:id', updateTeam);
router.delete('/:id', deleteTeam);
router.post('/:id/members', addMemberToTeam);
router.delete('/:id/members', removeMemberFromTeam);

export default router;
