// responseMessages.ts
import { ResponseStatus } from "../utils/type.ts";

const VALIDATION_MESSAGES = {
  ROLE: {
    ROLE_NAME: {
      "string.base": "Role name must be a string",
      "string.empty": "Role name is required",
      "any.required": "Role name is required",
    },
    DESCRIPTION: {
      "string.base": "Description must be a string",
      "string.empty": "Description is required",
      "any.required": "Description is required",
    },
    PERMISSIONS: {
      "object.base": "Permissions must be an object",
      "any.required": "Permissions are required",
    },
    ID_PARAM: {
      "string.base": "Id must be a string",
      "any.required": "Id is required",
      "string.empty": "Id cannot be empty",
    },
    ROLE_PARAM: {
      "string.base": "Role must be a string",
      "any.required": "Role parameter is required",
      "string.empty": "Role cannot be empty",
    },
    UPDATE_MIN: "At least one field must be provided for update",
  },
};

const ROLE_MESSAGES = {
  NOT_FOUND: "Role not found",
  CONFLICT_ROLE_EXISTS: "Role already exists",
  CREATED_SUCCESS: "Role created successfully",
  UPDATED_SUCCESS: "Role updated successfully",
  DELETED_SUCCESS: "Role deleted successfully",
  FETCH_ALL_SUCCESS: "All roles fetched successfully",
  FETCH_ONE_SUCCESS: "Role fetched successfully",
  SERVER_ERROR: "Internal server error",
  SUCCESS_TEXT: "success" as ResponseStatus,
  ERROR_TEXT: "error" as ResponseStatus,
  EXIST_PERMISSION_MESSAGE : "Permissions document not found"
};

export { VALIDATION_MESSAGES, ROLE_MESSAGES };
