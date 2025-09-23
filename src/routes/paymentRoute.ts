import { Router } from "express";
import PaymentController from "../controllers/subscription/payment.ts";
import { validateBody, validateParams } from "..//validators/validator.ts";
import paymentValidator from "../validators/paymentValidate.ts";
import { idParamSchema } from "../validators/idValidator.ts"

const router = Router();

router.get("/", PaymentController.getAll);
router.get("/:id", validateParams(idParamSchema), PaymentController.getOne);
router.post("/", validateBody(paymentValidator), PaymentController.create);
router.delete("/:id", validateParams(idParamSchema), PaymentController.delete);

export default router;
