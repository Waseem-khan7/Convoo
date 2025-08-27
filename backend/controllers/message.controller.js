// Get all users except Logged in User

export const getUsersForSidebar = async (req, res) => {
  try {
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
