import mongoose from "mongoose";

const warehouseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
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
    freeVolume: {
      type: Number,
      required: true,
    },
    shelves: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shelf",
      },
    ],
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Warehouse = mongoose.model("Warehouse", warehouseSchema);
export default Warehouse;
