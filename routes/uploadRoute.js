
const express = require("express");
const upload = require("../middleware/upload");
const userController = require("../controllers/userController");

const route = express.Router();


route.post("/upload/:id", upload.single("profile"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const updatedUser = await userController.updateUser(req.params.id, {
      profileImage: req.file.filename,
    });

    res.json({
      message: "Profile image uploaded successfully",
      file: req.file,
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ error: "File upload failed", details: err.message });
  }
});

module.exports = route;
