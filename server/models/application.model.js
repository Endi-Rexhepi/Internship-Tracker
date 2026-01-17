const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    company: { type: String, required: true, minlength: 2, trim: true },
    role: { type: String, required: true, minlength: 2, trim: true },
    link: { type: String, default: "", trim: true },
    status: { type: String, enum: ["Applied", "Interview", "Offer", "Rejected"], default: "Applied" },
    dateApplied: { type: Date, default: Date.now },
    notes: { type: String, default: "", trim: true },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Application", ApplicationSchema);
