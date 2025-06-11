export const isSBGUser = (email?: string): boolean => {
    const SBG_EMAIL = process.env.SBG_EMAIL;
    return email === SBG_EMAIL;
};

export const isGDGUser = (email?: string): boolean => {
    const GDG_EMAIL = process.env.GDG_EMAIL;
    return email === GDG_EMAIL;
};