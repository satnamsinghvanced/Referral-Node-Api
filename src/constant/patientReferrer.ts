export const PATIENT_REFERRER_MESSAGES = {
  CREATED: "Patient Referrer added successfully.",
  UPDATED: "Patient Referrer updated successfully.",
  DELETED: "Patient Referrer deleted successfully.",
  NOT_FOUND: "Patient Referrer not found.",
  MISSING_FIELDS: "Name, number, and email are required.",
  CONFLICT_EMAIL_EXISTS: "A Patient Referrer with this email already exists.",
  MISSING_ID: "Referrer ID is required.",
  INVALID_REFERRED_BY: "Invalid referredBy ID.",
  REFERRED_BY_NOT_FOUND: "Referring user not found.",
  FETCH_ALL_SUCCESS: "All Patient Referrers fetched successfully.",
  FETCH_ONE_SUCCESS: "Patient Referrer fetched successfully.",
  SERVER_ERROR: "Internal server error.",
  VALIDATION_ERROR: "Validation Error",
};


export const PATIENT_REFERRER_VALIDATION = {
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