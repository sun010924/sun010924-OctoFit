import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  userId: mongoose.Types.ObjectId;
  activityType: 'running' | 'walking' | 'cycling' | 'swimming' | 'strength_training' | 'yoga' | 'other';
  duration: number; // in minutes
  distance?: number; // in kilometers
  caloriesBurned?: number;
  points: number;
  notes?: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ActivitySchema = new Schema<IActivity>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    activityType: {
      type: String,
      enum: ['running', 'walking', 'cycling', 'swimming', 'strength_training', 'yoga', 'other'],
      required: true,
    },
    duration: {
      type: Number,
      required: true,
      min: 1,
    },
    distance: {
      type: Number,
      min: 0,
    },
    caloriesBurned: {
      type: Number,
      min: 0,
    },
    points: {
      type: Number,
      default: 0,
    },
    notes: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient querying
ActivitySchema.index({ userId: 1, date: -1 });

export default mongoose.model<IActivity>('Activity', ActivitySchema);
