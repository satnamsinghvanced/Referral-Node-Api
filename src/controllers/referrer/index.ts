import { Request, Response } from "express";
import Referrer from "../../models/referrer.ts";

export default {
  async addReferrerDoctor(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const {
        type,
        name,
        number,
        email,
        practiceName,
        practiceAddress,
        practiceType,
        notes,
      } = req.body;

      if (!type || !name || !number || !email) {
        return res.status(400).json({
          success: false,
          message: "Type, name, number, and email are required",
        });
      }

      const existingReferrer = await Referrer.findOne({ email });

      if (existingReferrer) {
        return res.status(409).json({
          success: false,
          message: "Referrer with this email already exists",
        });
      }

      const newReferrer = new Referrer({
        referredBy: userId,
        type,
        name,
        number,
        email,
        practiceName: practiceName || "",
        practiceAddress: practiceAddress || "",
        practiceType: practiceType || undefined,
        notes: notes || "",
      });

      const savedReferrer = await newReferrer.save();

      const populatedReferrer = await Referrer.findById(savedReferrer._id)
        .populate("referredBy", "name email")
        .populate("practiceType", "name")
        .exec();

      return res.status(201).json({
        success: true,
        message: "Referrer added successfully",
        data: populatedReferrer,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }
};
