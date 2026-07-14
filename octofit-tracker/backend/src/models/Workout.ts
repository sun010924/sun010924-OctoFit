import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  description: string;
  category: 'cardio' | 'strength' | 'flexibility' | 'balance';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  exercises: Array<{
    name: string;
    sets?: number;
    reps?: number;
    duration?: number;
  }>;
  caloriesEstimate: number;
  equipment?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const WorkoutSchema = new Schema<IWorkout>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ['cardio', 'strength', 'flexibility', 'balance'],
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    duration: {
      type: Number,
      required: true,
      min: 1,
    },
    exercises: [
      {
        name: {
          type: String,
          required: true,
        },
        sets: Number,
        reps: Number,
        duration: Number,
      },
    ],
    caloriesEstimate: {
      type: Number,
      required: true,
      min: 0,
    },
    equipment: [String],
  },
  {
    timestamps: true,
  }
);

// Index for efficient querying by difficulty
WorkoutSchema.index({ difficulty: 1, category: 1 });

export default mongoose.model<IWorkout>('Workout', WorkoutSchema);
