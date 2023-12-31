import mongoose from "mongoose";

const { MONGODB_URI } = process.env;


export const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI);
  } catch (error) {
    throw new Error('Could not connect to database');
  }
};

export const isConnectedToDatabase = (): boolean => {
  return mongoose.connection.readyState === 1;
};
