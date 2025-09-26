const USER_MESSAGE = {
  VALIDATION: {
    EMAIL_REQUIRED: "Email is required and must be a valid email.",
    PASSWORD_REQUIRED: "Password is required and must be at least 6 characters.",
    MOBILE_REQUIRED: "Mobile number is required.",
    ROLE_REQUIRED: "Role is required.",
    MEDICAL_SPECIALTY_REQUIRED: "Medical Specialty is required and must be one of the predefined values.",
    USER_EXISTS: "User already exists.",
    USER_NOT_FOUND: "User not found.",
    INVALID_CREDENTIALS_EMAIL: "User not found!",
    INVALID_CREDENTIALS_PASS: "Please enter a valid password.",
    USER_ID_REQUIRED: "User ID is required.",
    VALIDATION_ERROR: "Validation Error",
    SOMETHING_WRONG_ERROR: 'Something went wrong please try again!',
    INVALID_SUBSCRIPTION: "Subscription not found in database!",
    INVALID_PAYMENT: "Payment details not found in database!",
    INVALID_MEDICAL_SPECIALITY: "Medicial speciality not found in database!",
    TOKEN_ERROR: "User already logout"
  },
  AUTH: {
    NO_TOKEN: "No token provided.",
    INVALID_TOKEN: "Invalid token.",
  },
  SUCCESS: {
    USER_REGISTERED: "User registered successfully.",
    LOGIN_SUCCESS: "Login successful.",
    USER_FETCHED: "User data fetched successfully.",
    ALL_USERS_FETCHED: "All users fetched successfully.",
    USER_UPDATED: "User updated successfully.",
    USER_DELETED: "User deleted successfully.",
    LOGOUT_SUCCESS: "User logout successfully"
  },
  SERVER_ERROR: "Internal Server Error",
};

const USER_VALIDATION_MESSAGES = {
  FIRST_NAME: {
    "string.base": "First name must be a string",
    "string.empty": "First name is required",
    "any.required": "First name is required",
    "string.pattern.base": "First name can only contain letters and spaces",
  },
  LAST_NAME: {
    "string.base": "Last name must be a string",
    "string.empty": "Last name is required",
    "any.required": "Last name is required",
    "string.pattern.base": "Last name can only contain letters and spaces",
  },
  EMAIL: {
    "string.base": "Email must be a string",
    "string.empty": "Email is required",
    "string.pattern.base": "Email must be a valid format",
    "any.required": "Email is required",
  },
  PASSWORD: {
    "string.base": "Password must be a string",
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters long",
    "any.required": "Password is required",
  },
  MOBILE: {
    "string.base": "Mobile number must be a string",
    "string.empty": "Mobile number is required",
    "any.required": "Mobile number is required",
  },
  PRACTICE_NAME: {
    "string.base": "Practice name must be a string",
  },
  ROLE: {
    "string.base": "Role must be a string",
    "string.empty": "Role is required",
    "any.required": "Role is required",
  },
  MEDICAL_SPECIALTY: {
    "string.base": "Medical specialty must be a string",
    "string.empty": "Medical specialty is required",
    "any.required": "Medical specialty is required",
  },
  TERM_CONDITION_ERROR: {
    "boolean.base": "Terms Accepted must be true or false."
  },
  SUBSCRIPTION_ERROR: {
    "string.base": "Subscription ID must be a string."
  }
};

export { USER_VALIDATION_MESSAGES, USER_MESSAGE };


