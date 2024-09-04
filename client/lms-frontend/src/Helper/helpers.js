export const isValidEmail = (email) => {
    // Regular expression for validating an Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  export const isValidPassword = (password) => {
    // Regular expression for validating a password
    // ^(?=.*[!@#$%^&*]) - Ensures at least one special character from the set is present
    // .{5,}$ - Ensures the password is at least 5 characters long
    const passwordRegex = /^(?=.*[!@#$%^&*]).{5,}$/;
    return passwordRegex.test(password);
  };