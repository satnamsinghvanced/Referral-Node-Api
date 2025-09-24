import Joi from "joi";

// Schema for creating a role
export const createRoleSchema = Joi.object({
  role: Joi.string()
    .trim()
    .required()
    .messages({
      "string.base": "Role must be a string",
      "string.empty": "Role is required",
      "any.required": "Role is required",
    }),
  description: Joi.string()
    .trim()
    .required()
    .messages({
      "string.base": "Description must be a string",
      "string.empty": "Description is required",
      "any.required": "Description is required",
    }),
  permissions: Joi.object({
    manageReferrals: Joi.boolean().required(),
    manageTeam: Joi.boolean().required(),
    manageSettings: Joi.boolean().required(),
    manageIntegrations: Joi.boolean().required(),
    viewAnalytics: Joi.boolean().required(),
    manageBilling: Joi.boolean().required(),
    manageReviews: Joi.boolean().required(),
  })
    .required()
    .messages({
      "object.base": "Permissions must be an object",
      "any.required": "Permissions are required",
    }),
});

// Schema for updating a role (at least one field required)
export const updateRoleSchema = Joi.object({
  role: Joi.string()
    .trim()
    .optional()
    .messages({
      "string.base": "Role must be a string",
    }),
  description: Joi.string()
    .trim()
    .optional()
    .messages({
      "string.base": "Description must be a string",
    }),
  permissions: Joi.object({
    manageReferrals: Joi.boolean(),
    manageTeam: Joi.boolean(),
    manageSettings: Joi.boolean(),
    manageIntegrations: Joi.boolean(),
    viewAnalytics: Joi.boolean(),
    manageBilling: Joi.boolean(),
    manageReviews: Joi.boolean(),
  })
    .optional()
    .messages({
      "object.base": "Permissions must be an object",
    }),
}).min(1).messages({
  "object.min": "At least one field must be updated",
});

// Schema to validate 'id' path parameter
export const idParamSchema = Joi.object({
  id: Joi.string()
    .required()
    .messages({
      "string.base": "Id must be a string",
      "any.required": "Id is required",
      "string.empty": "Id cannot be empty",
    }),
});

// Schema to validate 'role' path parameter (for getRoleWithPermissions)
export const roleParamSchema = Joi.object({
  role: Joi.string()
    .trim()
    .required()
    .messages({
      "string.base": "Role must be a string",
      "any.required": "Role is required",
      "string.empty": "Role cannot be empty",
    }),
});
