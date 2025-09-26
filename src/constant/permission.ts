const PERMISSION_MESSAGES = {
  CREATED_MESSAGE: "Permission created successfully",
  UPDATED_MESSAGE: "Permission updated successfully",
  DELETED_MESSAGE: "Permission deleted successfully",
  FETCH_ALL_SUCCESS: "All permission fetched successfully",
  FETCH_ONE_SUCCESS: "permission fetched successfully",
  NOT_FOUND: "Permission not found",
  SERVER_ERROR: "Server error occurred",
  CONFLICT_TITLE_EXISTS: "Permission with this title already exists",
    VALIDATION_ERROR: "Validation Error",

};

const VALIDATION_MESSAGES = {
  PERMISSION: {
    PERMISSION_NAME: {
      "string.base": "Title must be a string",
      "string.empty": "Title is required",
      "any.required": "Title is required",
      "string.pattern.base": "Title can only contain letters, numbers, spaces, dashes, or underscores",
      "string.min": "Title must be at least 3 characters",
      "string.max": "Title must be less than or equal to 30 characters",
    },
  },
};

export { VALIDATION_MESSAGES, PERMISSION_MESSAGES };