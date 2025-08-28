import Message from "../models/message.model.js";
import User from "../models/user.model.js";

// Get all users except Logged in User
export const getUsersForSidebar = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get all users except me
    const filteredUser = await User.find({ _id: { $ne: userId } }).select(
      "-password"
    );

    // Build unseen message counts
    const unseenMessages = {};

    // Count number of messages not seen
    const promises = filteredUser.map(async (user) => {
      const messages = await Message.find({
        senderId: user._id,
        receiverId: userId,
        seen: false,
      });
      if (messages.length > 0) {
        unseenMessages[user._id] = messages.length;
      }
    });

    // Wait for all async operations
    await Promise.all(promises);
    res
      .status(200)
      .json({ success: true, users: filteredUser, unseenMessages });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all the Messages for Selected User
export const getMessages = async (req, res) => {
  try {
    // Extracting ID of user to chatting
    const { id: selectedUserId } = req.params;

    // Extract my (logged-in) user ID from the auth middleware
    const myId = req.user._id;

    // Get all messages between me and the selected user
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: selectedUserId },
        { senderId: selectedUserId, receiverId: myId },
      ],
    }).sort({ createdAt: 1 });

    // Mark all messages as seen
    await Message.updateMany(
      { senderId: selectedUserId, receiverId: myId },
      { seen: true }
    );

    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
