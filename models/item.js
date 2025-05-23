import mongoose from "mongoose";

const itemSchema = mongoose.Schema(
  {
    objectClass: {
      type: String,
      required: true,
    },
    unitVolume: {
      type: Number,
      required: true,
    },
    shelf: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shelf",
    },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);
export default Item;
