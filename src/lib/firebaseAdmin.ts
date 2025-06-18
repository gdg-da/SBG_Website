import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const firebaseAdminConfig = {
    credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
};

const app = !getApps().length ? initializeApp(firebaseAdminConfig) : getApps()[0];
export const adminAuth = getAuth(app);

export async function verifyFirebaseToken(idToken: string) {
    try {
        const decodedToken = await adminAuth.verifyIdToken(idToken);
        return {
            uid: decodedToken.uid,
            email: decodedToken.email,
            emailVerified: decodedToken.email_verified,
        };
    } catch {
        throw new Error('Invalid or expired token');
    }
}

export function isAuthorizedUser(email: string | undefined): boolean {
    return email === process.env.SBG_EMAIL;
}