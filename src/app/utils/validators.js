export const validateEmail = (email) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
};

export const validateEmailField = (email, setEmailError) => {
    const trimmedEmail = email.trim();
    const isValid = validateEmail(email);
    setEmailError(trimmedEmail && !isValid ? 'Insira um email válido!' : null);
    return isValid;
};

export const isFormValid = (formData, emailError) => {
    const isEmailValid = formData.email && validateEmail(formData.email);
    const isPasswordValid = formData.password.trim();
    const isNameValid = !('name' in formData) || formData.name?.trim().length > 0;
    return isEmailValid && isPasswordValid && isNameValid && !emailError;
};
