export const DOC_REFERRER_MESSAGES = {
  FETCH_ALL_SUCCESS: "All doctors fetched successfully",
  CREATED_MESSAGE: "Doctor added successfully",
  UPDATED_MESSAGE: "Doctor updated successfully",
  DELETED_MESSAGE: "Doctor deleted successfully",
  NOT_FOUND: "Doctor not found",
  CONFLICT_EMAIL_EXISTS: "A doctor with this email already exists for this user",
  REQUIRED_FIELDS: "Name, number, and email are required",
  INVALID_REFERRED_BY_ID: "Invalid referredBy ID",
  REFERRING_USER_NOT_FOUND: "Referring user not found",
  SERVER_ERROR: "Internal server error",
  MISSING_ID: "Invalid ID",
  VALIDATION_ERROR: "Validation Error",
};

export const DOCTOR_REFERRER_VALIDATION = {
  NAME: {
    "string.empty": `"name" is required`,
  },
  NUMBER: {
    "string.empty": `"number" is required`,
  },
  EMAIL: {
    "string.empty": `"email" is required`,
    "string.email": `"email" must be a valid email`,
  },
  PRACTICE_TYPE: {
    "any.required": `"practiceType" is required`,
    "string.empty": `"practiceType" cannot be empty`,
  },
  EMAIL_OPTIONAL: {
    "string.email": `"email" must be a valid email`,
  }
};
