import { auth } from "@/lib/firebaseConfig";
import { User } from "firebase/auth";
import { isSBGUser } from "./checkSBG";

export const getCurrentUser = async (): Promise<User | null> => {
    return new Promise((resolve) => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            unsubscribe();
            resolve(user);
        });
    });
};

export const checkSBGAccess = async (): Promise<boolean> => {
    const user = await getCurrentUser();
    return isSBGUser(user?.email || undefined);
};