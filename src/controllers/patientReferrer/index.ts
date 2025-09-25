import { Request, Response } from "express";
import patientReferrer from "../../models/patientReferrer.ts";

export default {
  async addReferrerPatient(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const { name, number, email, notes } = req.body;
      if (!name || !number || !email) {
        return res.status(400).json({
          success: false,
          message: "Type, name, number, and email are required",
        });
      }
      const existingReferrer = await patientReferrer.findOne({ email });

      if (existingReferrer) {
        return res.status(409).json({
          success: false,
          message: "Patient Referrer with this email already exists",
        });
      }
      const newReferrer = new patientReferrer({
        referredBy: userId,
        name,
        number,
        email,
        notes: notes || "",
      });

      const savedReferrer = await newReferrer.save();
      return res.status(201).json({
        success: true,
        message: "Patient Referrer added successfully",
        data: savedReferrer,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  },
  async updateReferrerPatient(req: Request, res: Response) {
    try {
      const { referrerId } = req.params;
      const { name, number, email, notes, isActive } = req.body;

      const existingReferrer = await patientReferrer.findById(referrerId);
      if (!existingReferrer) {
        return res.status(404).json({
          success: false,
          message: "Referrer not found",
        });
      }

      if (email && email !== existingReferrer.email) {
        const emailExists = await patientReferrer.findOne({
          email,
          _id: { $ne: referrerId },
        });

        if (emailExists) {
          return res.status(409).json({
            success: false,
            message: "Another Patient referrer with this email already exists",
          });
        }
      }
      const updateData: any = {};

      if (name) updateData.name = name;
      if (number) updateData.number = number;
      if (email) updateData.email = email;
      if (notes !== undefined) updateData.notes = notes;
      if (isActive !== undefined) updateData.isActive = isActive;

      const updatedReferrer = await patientReferrer
        .findByIdAndUpdate(referrerId, updateData, {
          new: true,
          runValidators: true,
        })
        .populate("referredBy", "name email")
        .populate("practiceType", "name");

      return res.status(200).json({
        success: true,
        message: "Patient Referrer updated successfully",
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
  async deleteReferredPatient(req: Request, res: Response) {
    try {
      const { referrerId } = req.params;
      if (!referrerId) {
        return res.status(400).json({ message: "Referred Id not found" });
      }
      const deleteRefPatient = await patientReferrer.findByIdAndDelete(
        referrerId
      );
      return res
        .status(200)
        .json({
          message: "Referred Patient deleted successfully",
          deleteRefPatient,
        });
    } catch (error:any) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  },
};
