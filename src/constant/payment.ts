export const VALIDATION_MESSAGES = {
  USER_ID_STRING: "UserId must be a string",
  SUBSCRIPTION_ID_REQUIRED: "SubscriptionId is required",
  SUBSCRIPTION_ID_INVALID: "SubscriptionId must be a valid ObjectId",
  EMAIL_INVALID: "Email must be a valid email",
  EMAIL_REQUIRED: "Email is required",
  AMOUNT_NUMBER: "Amount must be a number",
  AMOUNT_POSITIVE: "Amount must be greater than zero",
  AMOUNT_REQUIRED: "Amount is required",
  CURRENCY_LENGTH: "Currency must be exactly 3 letters (e.g., USD)",
  CURRENCY_UPPERCASE: "Currency must be uppercase (e.g., USD)",
  PAYMENT_METHOD_STRING: "PaymentMethod must be a string",
  PAYMENT_METHOD_REQUIRED: "PaymentMethod is required",
  STATUS_INVALID: "Status must be one of: pending, succeeded, failed",
  TRANSACTION_ID_STRING: "TransactionId must be a string",
};

export const CONTROLLER_MESSAGES = {
  PAYMENT_FETCH_SUCCESS: "Payments fetched successfully",
  PAYMENT_FETCH_ERROR: "Failed to fetch payments",
  PAYMENT_CREATE_SUCCESS: "Payment created successfully", 
  PAYMENT_CREATE_ERROR: "Failed to payment",
  PAYMENT_DELETE_SUCCESS: "Payment deleted successfully",
  PAYMENT_DELETE_ERROR: "Failed to delete payment",
  PAYMENT_NOT_FOUND : "Payment not found"
}