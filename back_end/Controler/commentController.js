// controllers/commentController.js
const Comment = require("../database_schema/commentSchema"); // <-- use a single consistent name

// Post a new comment 
exports.addComment = async (req, res) => {
  try {
    const { content, author, parentPostid } = req.body;
    if (!content || !author || !parentPostid) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newComment = new Comment({
      content,
      author,
      parentPostid,
    });

    await newComment.save();
    return res.status(201).json({ message: "Comment added successfully", comment: newComment });
  } catch (error) {
    console.error("Error adding comment:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get comments by parentPostid (product/post id)
exports.getCommentsByProduct = async (req, res) => {
  try {
    const { parentPostid } = req.params;
    if (!parentPostid) {
      return res.status(400).json({ message: "parentPostid is required" });
    }

    const comments = await Comment.find({ parentPostid })
      .populate("author", "name email") // ensure your User model is registered to "users" or adjust accordingly
      .sort({ createdAt: -1 });

    return res.status(200).json({ message: "Comments fetched successfully", comments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Optional: delete comment (only author or admin)
exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params; // comment id
    const requesterId = req.user && req.user._id; // assuming you have auth middleware that sets req.user

    const comment = await Comment.findById(id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    // allow delete only by the comment author or admin (adjust check as needed)
    if (String(comment.author) !== String(requesterId) && !(req.user && req.user.isAdmin)) {
      return res.status(403).json({ message: "Not authorized to delete this comment" });
    }

    await Comment.findByIdAndDelete(id);
    return res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
