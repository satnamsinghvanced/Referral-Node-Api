
const userMessage = {
  validation: {
    emailRequired: "Email is required and must be a valid email.",
    passwordRequired: "Password is required and must be at least 6 characters.",
    mobileRequired: "Mobile number is required.",
    roleRequired: "Role is required.",
    medicalSpecialtyRequired:
      "Medical Specialty is required and must be one of the predefined values.",
    userExists: "User already exists.",
    userNotFound: "User not found.",
    invalidCredentials: "Invalid credentials.",
    userIdRequired: "User ID is required.",
    validationError: "Validation Error",
  },
  auth: {
    noToken: "No token provided.",
    invalidToken: "Invalid token.",
  },
  success: {
    userRegistered: "User registered successfully.",
    loginSuccess: "Login successful.",
    userFetched: "User data fetched successfully.",
    allUsersFetched: "All users fetched successfully.",
    userUpdated: "User updated successfully.",
    userDeleted: "User deleted successfully.",
  },
  serverError: "Internal Server Error",
};

export default userMessage;
