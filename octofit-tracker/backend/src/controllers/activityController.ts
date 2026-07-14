import { Request, Response } from 'express';
import Activity from '../models/Activity';
import User from '../models/User';
import Team from '../models/Team';

// Get all activities
export const getAllActivities = async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find()
      .populate('userId', 'username firstName lastName')
      .sort({ date: -1 });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching activities', error });
  }
};

// Get activity by ID
export const getActivityById = async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findById(req.params.id).populate(
      'userId',
      'username firstName lastName'
    );
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.json(activity);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching activity', error });
  }
};

// Get activities by user ID
export const getActivitiesByUserId = async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find({ userId: req.params.userId })
      .populate('userId', 'username firstName lastName')
      .sort({ date: -1 });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user activities', error });
  }
};

// Create new activity
export const createActivity = async (req: Request, res: Response) => {
  try {
    // Calculate points based on duration and activity type
    const pointsMultiplier: { [key: string]: number } = {
      running: 2,
      cycling: 1.5,
      swimming: 2.5,
      strength_training: 1.5,
      walking: 1,
      yoga: 1,
      other: 1,
    };
    
    const points = Math.round(
      req.body.duration * (pointsMultiplier[req.body.activityType] || 1)
    );

    const activity = new Activity({
      ...req.body,
      points,
    });
    await activity.save();

    // Update user points
    await User.findByIdAndUpdate(activity.userId, {
      $inc: { totalPoints: points },
    });

    // Update team points if user is in a team
    const user = await User.findById(activity.userId);
    if (user && user.teamId) {
      await Team.findByIdAndUpdate(user.teamId, {
        $inc: { totalPoints: points },
      });
    }

    const populatedActivity = await Activity.findById(activity._id).populate(
      'userId',
      'username firstName lastName'
    );
    res.status(201).json(populatedActivity);
  } catch (error) {
    res.status(400).json({ message: 'Error creating activity', error });
  }
};

// Update activity
export const updateActivity = async (req: Request, res: Response) => {
  try {
    const oldActivity = await Activity.findById(req.params.id);
    if (!oldActivity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    const oldPoints = oldActivity.points;

    // Recalculate points if duration or activity type changed
    const pointsMultiplier: { [key: string]: number } = {
      running: 2,
      cycling: 1.5,
      swimming: 2.5,
      strength_training: 1.5,
      walking: 1,
      yoga: 1,
      other: 1,
    };

    const newPoints = Math.round(
      (req.body.duration || oldActivity.duration) *
        (pointsMultiplier[req.body.activityType || oldActivity.activityType] || 1)
    );

    const activity = await Activity.findByIdAndUpdate(
      req.params.id,
      { ...req.body, points: newPoints },
      { new: true, runValidators: true }
    ).populate('userId', 'username firstName lastName');

    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    // Update user points (remove old points, add new points)
    const pointsDifference = newPoints - oldPoints;
    await User.findByIdAndUpdate(activity.userId, {
      $inc: { totalPoints: pointsDifference },
    });

    // Update team points if user is in a team
    const user = await User.findById(activity.userId);
    if (user && user.teamId) {
      await Team.findByIdAndUpdate(user.teamId, {
        $inc: { totalPoints: pointsDifference },
      });
    }

    res.json(activity);
  } catch (error) {
    res.status(400).json({ message: 'Error updating activity', error });
  }
};

// Delete activity
export const deleteActivity = async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    // Remove points from user
    await User.findByIdAndUpdate(activity.userId, {
      $inc: { totalPoints: -activity.points },
    });

    // Remove points from team if user is in a team
    const user = await User.findById(activity.userId);
    if (user && user.teamId) {
      await Team.findByIdAndUpdate(user.teamId, {
        $inc: { totalPoints: -activity.points },
      });
    }

    res.json({ message: 'Activity deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting activity', error });
  }
};
