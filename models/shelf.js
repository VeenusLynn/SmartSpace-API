import mongoose from "mongoose";

const shelfSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    maxVolume: {
      type: Number,
      required: true,
    },
    usedVolume: {
      type: Number,
      default: 0,
    },
    freeVolume: {
      type: Number,
      default: 0,
    },
    items: {
      type: Array,
      default: [],
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
