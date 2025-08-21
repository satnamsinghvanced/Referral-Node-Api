const Patient = require("../../models/patient");

async function generateUniqueId(role) {
  let prefix;
  if (role === "patient") {
    prefix = "REF-P";
  } else {
    prefix = "REF-D";
  }
  const latestRecord = await Patient.findOne({
    uniqueId: { $regex: `^${prefix}` },
  }).sort({ uniqueId: -1 });
  let nextNumber = 1;
  if (latestRecord && latestRecord.uniqueId) {
    const numPart = parseInt(latestRecord.uniqueId.replace(prefix, ""), 10);
    nextNumber = numPart + 1;
  }
  const paddedNumber = String(nextNumber).padStart(3, "0");
  return `${prefix}${paddedNumber}`;
}

module.exports = {

  async userCreate(req, res) {
    try {
      const { role, email, fullName, referringByName, ...updatedFields } =
        req.body;
      const uniqueId = await generateUniqueId(role);
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      const existingUser = await Patient.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const newUser = await Patient.create({
        email,
        fullName,
        role,
        referringByName,
        uniqueId,
        ...updatedFields,
      });

      res.status(201).json({
        message: "User created successfully",
        data: newUser,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  async allUser(req, res) {
    try {
      const {
        role,
        page = 1,
        limit = 5,
        search,
        status,
        urgency,
        locations,
      } = req.query;

      const numericPage = parseInt(page, 10);
      const numericLimit = parseInt(limit, 10);
      const skip = (numericPage - 1) * numericLimit;

      const query = {};

      if (role) query.role = role;
      if (status) query.status = status;
      if (urgency) query.urgency = urgency;
      if (locations) query.practiceAddressCity = { $in: locations.split(",") };

      if (search?.trim()) {
        const regex = new RegExp(search.trim(), "i");
        query.$or = [
          { fullName: regex },
          { email: regex },
          { referringByName: regex },
          { referringByEmail: regex },
        ];
      }

      const totalUsers = await Patient.countDocuments(query);

      const users = await Patient.find(query)
        .skip(skip)
        .limit(numericLimit)
        .lean();

      return res.status(200).json({
        data: users,
        totalUsers,
        currentPage: numericPage,
        totalPages: Math.ceil(totalUsers / numericLimit),
      });
    } catch (error) {
      console.error("Error getting users:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  async userStatusUpdate(req, res) {
  try {
    const {id} = req.query;
    const {status}  = req.body
    const updatedUser = await Patient.findByIdAndUpdate(id, { status }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User status updated successfully", data: updatedUser });
  } catch (error) {
    console.error("Error updating user status:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
  },

  async referralStats(req, res) {
  try {
   
  } catch (error) {
    
  }
  }
};
