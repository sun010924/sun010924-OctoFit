import { Request, Response } from 'express';
import Team from '../models/Team';
import User from '../models/User';

// Get all teams
export const getAllTeams = async (req: Request, res: Response) => {
  try {
    const teams = await Team.find()
      .populate('captainId', 'username firstName lastName')
      .populate('members', 'username firstName lastName totalPoints');
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching teams', error });
  }
};

// Get team by ID
export const getTeamById = async (req: Request, res: Response) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate('captainId', 'username firstName lastName')
      .populate('members', 'username firstName lastName totalPoints');
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team', error });
  }
};

// Create new team
export const createTeam = async (req: Request, res: Response) => {
  try {
    const team = new Team({
      ...req.body,
      members: [req.body.captainId], // Add captain as first member
    });
    await team.save();

    // Update captain's teamId
    await User.findByIdAndUpdate(req.body.captainId, { teamId: team._id });

    const populatedTeam = await Team.findById(team._id)
      .populate('captainId', 'username firstName lastName')
      .populate('members', 'username firstName lastName totalPoints');
    res.status(201).json(populatedTeam);
  } catch (error) {
    res.status(400).json({ message: 'Error creating team', error });
  }
};

// Update team
export const updateTeam = async (req: Request, res: Response) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate('captainId', 'username firstName lastName')
      .populate('members', 'username firstName lastName totalPoints');
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json(team);
  } catch (error) {
    res.status(400).json({ message: 'Error updating team', error });
  }
};

// Delete team
export const deleteTeam = async (req: Request, res: Response) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    // Remove teamId from all members
    await User.updateMany({ teamId: team._id }, { $unset: { teamId: 1 } });
    res.json({ message: 'Team deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting team', error });
  }
};

// Add member to team
export const addMemberToTeam = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    // Check if user is already a member
    if (team.members.includes(userId)) {
      return res.status(400).json({ message: 'User is already a team member' });
    }

    // Add user to team
    team.members.push(userId);
    await team.save();

    // Update user's teamId
    await User.findByIdAndUpdate(userId, { teamId: team._id });

    const populatedTeam = await Team.findById(team._id)
      .populate('captainId', 'username firstName lastName')
      .populate('members', 'username firstName lastName totalPoints');
    res.json(populatedTeam);
  } catch (error) {
    res.status(400).json({ message: 'Error adding member to team', error });
  }
};

// Remove member from team
export const removeMemberFromTeam = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    // Remove user from team
    team.members = team.members.filter(
      (memberId) => memberId.toString() !== userId
    );
    await team.save();

    // Remove teamId from user
    await User.findByIdAndUpdate(userId, { $unset: { teamId: 1 } });

    const populatedTeam = await Team.findById(team._id)
      .populate('captainId', 'username firstName lastName')
      .populate('members', 'username firstName lastName totalPoints');
    res.json(populatedTeam);
  } catch (error) {
    res.status(400).json({ message: 'Error removing member from team', error });
  }
};

// Get team leaderboard
export const getTeamLeaderboard = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const teams = await Team.find()
      .sort({ totalPoints: -1 })
      .limit(limit)
      .populate('captainId', 'username firstName lastName')
      .populate('members', 'username firstName lastName totalPoints');
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team leaderboard', error });
  }
};
