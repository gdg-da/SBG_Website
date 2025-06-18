import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebaseConfig";

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        if (!user.email?.endsWith("@dau.ac.in")) {
            await signOut(auth);
            throw new Error("Only @dau.ac.in email addresses are allowed.");
        }

        return user;
    } catch (error) {
        throw error;
    }
};

export const logout = async () => {
    try {
        await signOut(auth);
    } catch {
        //handle error
    }
};

export const getCurrentUserToken = async (): Promise<string | null> => {
    try {
        const user = auth.currentUser;
        if (user) {
            return await user.getIdToken();
        }
        return null;
    } catch {
        return null;
    }
};