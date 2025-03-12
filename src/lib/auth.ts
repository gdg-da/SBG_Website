import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebaseConfig";

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        if (!user.email?.endsWith("@daiict.ac.in")) {
            await signOut(auth);
            throw new Error("Only @daiict.ac.in email addresses are allowed.");
        }

        return user;
    } catch (error) {
        console.error("Google Sign-In Error:", error);
        throw error;
    }
};

export const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Logout Error:", error);
    }
};