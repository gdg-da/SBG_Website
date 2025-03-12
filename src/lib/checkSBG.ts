export const isSBGUser = (email?: string): boolean => {
    const SBG_EMAIL = process.env.SBG_EMAIL;
    return email === SBG_EMAIL;
};