
const mongoose = require("mongoose");
const Comment = require("../database_schema/commentSchema");


exports.addComment = async (req, res) => {
  try {
    const { content, author, parentPostid } = req.body;

    if (!content || !author || !parentPostid) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const comment = new Comment({
      content,
      author,
      parentPostid,
    });

    await comment.save();

    res.status(201).json({
      message: "Comment added successfully",
      comment,
    });
  } catch (err) {
    console.error("Error adding comment:", err);
    res.status(500).json({
      message: "Error adding comment",
      error: err.message,
    });
  }
};




exports.getCommentsByProduct = async (req, res) => {
  try {
    // accept many common param/query names (case-insensitive)
    const id =
      req.params.productID ??
      req.params.productId ??
      req.params.parentPostid ??
      req.params.parentPostId ??
      req.params.postId ??
      req.query.productId ??
      req.query.postId ??
      req.query.parentPostid ??
      req.query.parentPostId ??
      req.query.id ??
      null;

    if (!id) {
      return res.status(400).json({
        message: "product/post id is required (path or query).",
      });
    }

    // normalize id:
    // - if all digits -> Number (handles Int32 parentPostid)
    // - else if valid ObjectId -> ObjectId
    // - else keep as string
    const trimmed = String(id).trim();

    let maybeObjectId;
    if (/^\d+$/.test(trimmed)) {
      // purely numeric id
      maybeObjectId = parseInt(trimmed, 10);
    } else if (mongoose.Types.ObjectId.isValid(trimmed)) {
      // valid Mongo ObjectId (24 hex chars)
      maybeObjectId = new mongoose.Types.ObjectId(trimmed);
    } else {
      // fallback to string (some apps store string slugs, etc.)
      maybeObjectId = trimmed;
    }

    // Optional pagination
    const page = Math.max(1, parseInt(req.query.page || "1", 10));
    const limit = Math.max(1, Math.min(100, parseInt(req.query.limit || "50", 10)));
    const skip = (page - 1) * limit;

    // Build query to match common field names
    const query = {
      $or: [
        { parentPostid: maybeObjectId },
        { productId: maybeObjectId },
        { post: maybeObjectId },
        { parentPostId: maybeObjectId }, // some schemas use camelCase
      ],
    };

    const [comments, total] = await Promise.all([
      Comment.find(query)
        .populate("author", "name email") // change fields as needed
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Comment.countDocuments(query),
    ]);

    return res.status(200).json({
      message: "Comments fetched successfully",
      meta: { total, page, limit },
      comments,
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
