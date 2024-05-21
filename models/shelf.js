import mongoose from "mongoose";

const shelfSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    maxVolume: {
      type: Number,
      required: true,
    },
    usedVolume: {
      type: Number,
      required: true,
    },
    warehouse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warehouse",
    },
  },
  { timestamps: true }
);

const Shelf = mongoose.model("Shelf", shelfSchema);

export default Shelf;
