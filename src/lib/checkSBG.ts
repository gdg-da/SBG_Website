export const isSBGUser = (email?: string): boolean => {
    if (!email) return false;
    const SBG_EMAIL = process.env.NEXT_PUBLIC_SBG_EMAIL;
    return email === SBG_EMAIL;
};

export const isGDGUser = (email?: string): boolean => {
    if (!email) return false;
    const GDG_EMAIL = process.env.NEXT_PUBLIC_GDG_EMAIL;
    return email === GDG_EMAIL;
};