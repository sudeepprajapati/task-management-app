import mongoose from "mongoose";

const connectDB = async () => {
    const mongoDBUri = process.env.MONGODB_URI;

    if (!mongoDBUri) {
        console.error("MONGO_URI is not defined");
        process.exit(1);
    }

    try {
        await mongoose.connect(mongoDBUri, {
            autoIndex: false
        });

        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection failed");
        process.exit(1);
    }
};

export default connectDB;
