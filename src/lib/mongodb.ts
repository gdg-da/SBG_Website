import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI: string | undefined = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable.");
}

interface MongooseGlobal {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

declare global {
    // eslint-disable-next-line no-var
    var mongoose: MongooseGlobal | undefined;
}

const cached: MongooseGlobal = global.mongoose || { conn: null, promise: null };

global.mongoose = cached;

export async function connectDB(): Promise<Mongoose> {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI as string).then((mongoose) => mongoose);
    }

    cached.conn = await cached.promise;
    return cached.conn;
}