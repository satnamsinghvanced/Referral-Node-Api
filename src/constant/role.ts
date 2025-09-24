import { ResponseStatus } from "../utils/type.ts";

const VALIDATION_MESSAGES = {
  ROLE: {
    ROLE_NAME: {
      "string.base": "Role must be a string",
      "string.empty": "Role is required",
      "any.required": "Role is required",
      "string.pattern.base": "Role can only contain letters, numbers, spaces, dashes, or underscores",
      "string.min": "Role must be at least 3 characters",
      "string.max": "Role must be less than or equal to 30 characters",
    },
    DESCRIPTION: {
      "string.base": "Description must be a string",
    },
  },
};

const ROLE_MESSAGES = {
  NOT_FOUND: "Role not found",
  CONFLICT_ROLE_EXISTS: "Role already exists",
  CREATED_MESSAGE: "Role created successfully",
  UPDATED_MESSAGE: "Role updated successfully",
  DELETED_MESSAGE: "Role deleted successfully",
  FETCH_ALL_SUCCESS: "All roles fetched successfully",
  FETCH_ONE_SUCCESS: "Role fetched successfully",
  SERVER_ERROR: "Internal server error please try again!",
  SUCCESS_TEXT: "success" as ResponseStatus,
  ERROR_TEXT: "error" as ResponseStatus,
};

export { VALIDATION_MESSAGES, ROLE_MESSAGES };
