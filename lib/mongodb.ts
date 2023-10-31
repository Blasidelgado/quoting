import moongose from "mongoose";

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  throw new Error('Could not connect to database');
}

export const connectMongoDB = async () => {
  try {
    const {connection} = await moongose.connect(MONGODB_URI);

    if(connection.readyState === 1) {
      return Promise.resolve(true);
    }

  } catch (error) {
    return Promise.reject(error);
  }
};
