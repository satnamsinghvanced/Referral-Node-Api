import Joi from "joi";

export const signupSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  mobile: Joi.string().required(),
  practiceName: Joi.string().optional(),
  role: Joi.string().required(),
  medicalSpecialty: Joi.array()
    .items(
      Joi.string().valid(
        "orthodontics",
        "generalDentistry",
        "OralSurgery",
        "endodontics",
        "periodontics",
        "other"
      )
    )
    .required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const updateUserSchema = Joi.object({
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional(),
  mobile: Joi.string().optional(),
  practiceName: Joi.string().optional(),
  role: Joi.string().optional(),
  medicalSpecialty: Joi.array()
    .items(
      Joi.string().valid(
        "orthodontics",
        "generalDentistry",
        "OralSurgery",
        "endodontics",
        "periodontics",
        "other"
      )
    )
    .optional(),
});

export const userIdParamSchema = Joi.object({
  userId: Joi.string().length(24).hex().required().messages({
    "string.base": `"userId" should be a type of 'text'`,
    "string.length": `"userId" must be 24 characters long`,
    "string.hex": `"userId" must only contain hexadecimal characters`,
    "any.required": `"userId" is a required field`,
  }),
});
