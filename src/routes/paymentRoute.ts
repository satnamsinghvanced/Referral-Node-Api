import { Router } from "express";
import PaymentController from "../controllers/subscription/payment.ts";
import { validateBody, validateParams } from "..//validators/validator.ts";
import paymentValidator from "../validators/paymentValidate.ts";
import { idParamSchema } from "../validators/idValidator.ts"
import { COMMON_ROUTES as CR } from "../helper/routehelper.ts";

const router = Router();

router.get(CR.ROOT, PaymentController.getAll);
router.get(CR.ID_PARAM, validateParams(idParamSchema), PaymentController.getOne);
router.post(CR.ROOT, validateBody(paymentValidator), PaymentController.create);
router.delete(CR.ID_PARAM, validateParams(idParamSchema), PaymentController.delete);

export default router;
