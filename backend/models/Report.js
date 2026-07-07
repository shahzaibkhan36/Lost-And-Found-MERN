import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["lost", "found"], required: true },
    name: { type: String, required: true, trim: true }, // reporter's name
    item: { type: String, required: true, trim: true }, // item title
    contact: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    date: { type: Date },
    imageUrl: { type: String, default: "" },
    isClaimed: { type: Boolean, default: false },
    claimerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    claimedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

reportSchema.index({ item: "text", description: "text", location: "text" });

export default mongoose.model("Report", reportSchema);
