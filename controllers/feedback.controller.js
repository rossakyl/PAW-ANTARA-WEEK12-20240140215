const { validationResult } = require("express-validator");
const Feedback = require("../models/feedback.model"); // Cek apakah path models sudah tepat

exports.getFeedbackPage = async (req, res) => {
  try {
    const feedbacks = await Feedback.findAll({ order: [["createdAt", "DESC"]] });
    res.render("feedback", {
      feedbacks,
      errors: [],
      oldInput: {},
      user: req.session.user,
    });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

exports.postFeedback = async (req, res) => {
  const errors = validationResult(req);
  const { message } = req.body;
  const username = req.session.user ? req.session.user.username : "Anonim";

  if (!errors.isEmpty()) {
    const feedbacks = await Feedback.findAll({ order: [["createdAt", "DESC"]] });
    return res.status(400).render("feedback", {
      feedbacks,
      errors: errors.array(),
      oldInput: { message },
      user: req.session.user,
    });
  }

  try {
    await Feedback.create({
      username,
      message,
    });

    res.redirect("/feedback");
  } catch (err) {
    res.status(500).send("Gagal menyimpan data");
  }
};