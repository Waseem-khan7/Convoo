import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required },
    recieverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required },
    text: { type: String },
    image: { type: String },
    seen: { type: Boolean },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
