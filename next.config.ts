import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    env:{
        FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
        FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
        FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
        FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
        FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
        FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
        FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
        MONGO_URI: process.env.MONGO_URI,
        SBG_EMAIL: process.env.SBG_EMAIL,
    },
    images: {
        domains: [
            'firebasestorage.googleapis.com',
            'drive.google.com'
        ],
    },
};

export default nextConfig;