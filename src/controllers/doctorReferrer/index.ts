import { Request, Response } from "express";
import docReferrer from "../../models/docReferrer.ts";
import QRCode from "qrcode";

export default {
  async getDocReferrer(req: Request, res: Response) {
    try {
      const getDocRef = await docReferrer.find();
      return res.status(200).json({ message: "All Referrer doctors",getDocRef });
    } catch (error: any) {
      return res
        .status(500)
        .json({ success: false, message: "Internal error" });
        
    }
  },
  async addReferrerDoctor(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const {
        name,
        number,
        email,
        practiceName,
        practiceAddress,
        practiceType,
        notes,
      } = req.body;

      if (!name || !number || !email) {
        return res.status(400).json({
          success: false,
          message: "Type, name, number, and email are required",
        });
      }

      const existingReferrer = await docReferrer.findOne({ email });

      if (existingReferrer) {
        return res.status(409).json({
          success: false,
          message: "Doctor Referrer with this email already exists",
        });
      }

      const newReferrer = new docReferrer({
        referredBy: userId,
        name,
        number,
        email,
        practiceName: practiceName || "",
        practiceAddress: practiceAddress || "",
        practiceType: practiceType || undefined,
        notes: notes || "",
      });

      const savedReferrer = await newReferrer.save();
      const qrCodeDataUrl = await QRCode.toDataURL(
        JSON.stringify("https://practicemarketer.ai/referral/general")
      );
      // const qrCodeDataUrl = await QRCode.toDataURL(JSON.stringify(`https://practicemarketer.ai/referral/general/${savedReferrer._id}`))
      savedReferrer.qrCode = qrCodeDataUrl;
      await savedReferrer.save();

      const populatedReferrer = await docReferrer
        .findById(savedReferrer._id)
        .populate("referredBy", "name email")
        .populate("practiceType", "name")
        .exec();

      return res.status(201).json({
        success: true,
        message: "Doctor Referrer added successfully",
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
        name,
        number,
        email,
        practiceName,
        practiceAddress,
        practiceType,
        notes,
        isActive,
      } = req.body;

      const existingReferrer = await docReferrer.findById(referrerId);
      if (!existingReferrer) {
        return res.status(404).json({
          success: false,
          message: "Referrer not found",
        });
      }

      if (email && email !== existingReferrer.email) {
        const emailExists = await docReferrer.findOne({
          email,
          _id: { $ne: referrerId },
        });

        if (emailExists) {
          return res.status(409).json({
            success: false,
            message: "Another doctor referrer with this email already exists",
          });
        }
      }
      const updateData: any = {};

      if (name) updateData.name = name;
      if (number) updateData.number = number;
      if (email) updateData.email = email;
      if (practiceName !== undefined) updateData.practiceName = practiceName;
      if (practiceAddress !== undefined)
        updateData.practiceAddress = practiceAddress;
      if (practiceType !== undefined) updateData.practiceType = practiceType;
      if (notes !== undefined) updateData.notes = notes;
      if (isActive !== undefined) updateData.isActive = isActive;

      const updatedReferrer = await docReferrer
        .findByIdAndUpdate(referrerId, updateData, {
          new: true,
          runValidators: true,
        })
        .populate("referredBy", "name email")
        .populate("practiceType", "name");

      return res.status(200).json({
        success: true,
        message: "Doctor Referrer updated successfully",
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
        return res
          .status(400)
          .json({ message: "Doctor Referrer Id not found" });
      }
      const deletedUser = await docReferrer.findByIdAndDelete(referrerId);
      return res
        .status(200)
        .json({ message: "Doctor Referrer Id deleted", deletedUser });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  },
};
