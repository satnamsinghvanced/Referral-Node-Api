import { Request, Response } from "express";
import Referrer from "../../models/referrer.ts";
import { json } from "stream/consumers";

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
  },
  async updateReferrerDoctor(req: Request, res: Response) {
    try {
      const { referrerId } = req.params;
      const {
        type,
        name,
        number,
        email,
        practiceName,
        practiceAddress,
        practiceType,
        notes,
        isActive,
      } = req.body;

      const existingReferrer = await Referrer.findById(referrerId);
      if (!existingReferrer) {
        return res.status(404).json({
          success: false,
          message: "Referrer not found",
        });
      }

      if (email && email !== existingReferrer.email) {
        const emailExists = await Referrer.findOne({
          email,
          _id: { $ne: referrerId },
        });

        if (emailExists) {
          return res.status(409).json({
            success: false,
            message: "Another referrer with this email already exists",
          });
        }
      }
      const updateData: any = {};

      if (type) updateData.type = type;
      if (name) updateData.name = name;
      if (number) updateData.number = number;
      if (email) updateData.email = email;
      if (practiceName !== undefined) updateData.practiceName = practiceName;
      if (practiceAddress !== undefined)
        updateData.practiceAddress = practiceAddress;
      if (practiceType !== undefined) updateData.practiceType = practiceType;
      if (notes !== undefined) updateData.notes = notes;
      if (isActive !== undefined) updateData.isActive = isActive;

      const updatedReferrer = await Referrer.findByIdAndUpdate(
        referrerId,
        updateData,
        { new: true, runValidators: true }
      )
        .populate("referredBy", "name email")
        .populate("practiceType", "name");

      return res.status(200).json({
        success: true,
        message: "Referrer updated successfully",
        data: updatedReferrer,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  },
  async deleteReferredDoctor(req: Request, res: Response) {
    try {
      const { referrerId } = req.params;
      if (!referrerId) {
        return res.status(400).json({ message: "Referrer Id not found" });
      }
      const deletedUser = await Referrer.findByIdAndDelete(referrerId);
      return res
        .status(200)
        .json({ message: "Referrer Id deleted", deletedUser });
    } catch (error:any) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  },
};
