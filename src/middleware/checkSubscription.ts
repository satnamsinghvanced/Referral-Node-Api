import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface User {
      subscriptionPlan?: "single" | "premium" | "enterprise";
    }
    interface Request {
      user?: User;
    }
  }
}

type SubscriptionPlan = "single" | "premium" | "enterprise";

export function checkSubscription(allowedPlans: SubscriptionPlan[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User information missing" });
    }

    const userPlan = user.subscriptionPlan;

    if (!userPlan) {
      return res
        .status(403)
        .json({ message: "Access denied: Subscription plan not found" });
    }

    if (!allowedPlans.includes(userPlan)) {
      return res.status(403).json({
        message:
          "Access denied: Your subscription plan does not allow access to this resource",
      });
    }

    next();
  };
}
