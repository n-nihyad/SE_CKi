// const express = require("express");
// const bcrypt = require("bcryptjs");

// const router = express.Router();

// const auth = require("../middlewares/auth");
// const User = require("../models/User");

// router.get("/me", auth, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// router.put("/change-password", auth, async (req, res) => {
//   const { oldPassword, newPassword } = req.body;

//   try {
//     const user = await User.findByIdWithPassword(req.user.id);

//     const isMatch = await bcrypt.compare(oldPassword, user.password);

//     if (!isMatch) {
//       return res.status(400).json({ message: "Old password incorrect" });
//     }

//     const hashed = await bcrypt.hash(newPassword, 10);

//     await User.updatePassword(req.user.id, hashed);

//     res.json({ message: "Change password success" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;
