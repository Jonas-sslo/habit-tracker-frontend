export const getLogo = (theme) => {
    return theme === 'dark' ? '/logo-white.png' : '/logo-black.png';
};

export const getIcon = (theme) => {
    return theme === 'dark' ? '/logo-icon-white.png' : '/logo-icon-blue.png';
};

export const getGray300Or600 = (theme) => {
    return theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
};

export const getWhiteOrGray700 = (theme) => {
    return theme === 'dark' ? 'text-white' : 'text-gray-700';
};

export const getWhiteOrGray600 = (theme) => {
    return theme === 'dark' ? 'text-white' : 'text-gray-600';
};

export const getShadow = (theme) => {
    return theme === 'dark' ? 'shadow-[0_0_10px_2px_rgba(255,255,255,0.8)]' : 'shadow-lg';
};

export const getBg = (theme) => {
    return theme === 'dark' ? 'bg-[#121212]' : 'bg-white';
};

export const getHomeBg = (theme) => {
    return theme === 'dark' ? 'bg-[#121212]' : 'bg-[#DBEDFB]';
};

export const getGoogleButtonTheme = (theme) => {
    return theme === 'dark' ? 'filled_black' : 'outline';
};

export const getGray300OrLightGray = (theme) => {
    return theme === 'dark' ? 'text-gray-300' : 'text-[#1A1A1A]';
};
