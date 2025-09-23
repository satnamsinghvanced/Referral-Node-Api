import { ResponseStatus } from "../utils/type.ts"

const VALIDATION_MESSAGES = {
  PRICE: {
    DAILY: {
      "number.base": "Daily price must be a number",
      "number.min": "Daily price cannot be negative",
    },
    MONTHLY: {
      "number.base": "Monthly price must be a number",
      "number.min": "Monthly price cannot be negative",
    },
    YEARLY: {
      "number.base": "Yearly price must be a number",
      "number.min": "Yearly price cannot be negative",
    },
    CUSTOM: {
      "string.base": "Custom price must be a string",
    },
    OR_MISSING: "At least one price field (daily, monthly, yearly, or custom) is required",
  },

  SUBSCRIPTION: {
    TITLE: {
      "string.base": "Title must be a string",
      "string.empty": "Title is required",
      "any.required": "Title is required",
    },
    DESCRIPTION: {
      "string.base": "Description must be a string",
    },
    PRICE_REQUIRED: "Price object is required",
    POINT_TITLE: {
      "string.base": "Point title must be a string",
    },
    POINTS: {
      "array.base": "Points must be an array of strings",
      "string.base": "Each point must be a string",
    },
    UPDATE_MIN: "At least one field must be provided for update",
  },

  ID_PARAM: {
    "any.required": "ID parameter is required",
  },
};

const SUBSCRIPTION_MESSAGES = {
  NOT_FOUND: "Subscription not found",
  CONFLICT_TITLE_EXISTS: "Subscription title already exists",
  DELETED_SUCCESS: "Subscription deleted successfully",
  SERVER_ERROR: "Internal server error",
  SUCCESS_TEXT: "success" as ResponseStatus,
  SUCCESS_ERROR: "error" as ResponseStatus,
  FETCH_MESSAGE: "Subscriptions fetched successfully",
  CREATED_MESSAGE: "Subscription created successfully",
  UPDATE_MESSAGE: "Subscription updated successfully",
};

export { VALIDATION_MESSAGES, SUBSCRIPTION_MESSAGES };
