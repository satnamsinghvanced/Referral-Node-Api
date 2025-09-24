const VALIDATION_MESSAGES = {
  PRACTICE_TYPE: {
    TITLE: {
      "string.base": "Title must be a string",
      "string.empty": "Title is required",
      "any.required": "Title is required",
      "string.pattern.base": "Title can only contain letters, numbers, spaces, dashes, or underscores",
      "string.min": "Title must be at least 3 characters",
      "string.max": "Title must be less than or equal to 30 characters",
    },
  },
};

const PRACTICE_TYPE_MESSAGES = {
  CREATED: "Practice type created successfully",
  UPDATED: "Practice type updated successfully",
  DELETED: "Practice type deleted successfully",
  FETCH_ALL_SUCCESS: "All practice types fetched successfully",
  FETCH_ONE_SUCCESS: "Practice type fetched successfully",
  NOT_FOUND: "Practice type not found",
  SERVER_ERROR: "Server error occurred",
  CONFLICT_TITLE_EXISTS: "Practice type with this title already exists",
};

export { VALIDATION_MESSAGES, PRACTICE_TYPE_MESSAGES };
