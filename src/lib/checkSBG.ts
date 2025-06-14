export const isSBGUser = (email?: string): boolean => {
    if (!email) return false;
    const SBG_EMAIL = process.env.SBG_EMAIL;
    return email === SBG_EMAIL;
};