const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const feedbackController = require("../controllers/feedback.controller");

// HAPUS kurung kurawal {} karena auth.middleware.js di-export langsung sebagai fungsi
const requireAuth = require("../middlewares/auth.middleware");

// Middleware Validasi Server-Side & Sanitasi Input
const validateFeedback = [
  body("message")
    .trim()
    .escape()
    .isLength({ min: 5, max: 200 })
    .withMessage("Pesan feedback minimal 5 karakter dan maksimal 200 karakter!"),
];

router.get("/feedback", requireAuth, feedbackController.getFeedbackPage);
router.post(
  "/feedback",
  requireAuth,
  validateFeedback,
  feedbackController.postFeedback
);

module.exports = router;