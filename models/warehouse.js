import mongoose from "mongoose";

const warehouseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: String,
      required: true,
    },
    maxVolume: {
      type: Number,
      default: 0,
    },
    usedVolume: {
      type: Number,
      default: 0,
    },
    freeVolume: {
      type: Number,
      default: 0,
    },
    shelves: {
      type: Array,
      default: [],
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Warehouse = mongoose.model("Warehouse", warehouseSchema);
export default Warehouse;
