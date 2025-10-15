const comments = require("../database_schema/commentSchema");

//Post a new comment 
exports.addComment = async (req, res) => {
    try {
        const { content, author, parentPost } = req.body;
        if (!content || !author || !parentPost) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newComment = new Comment({
            content,
            author,
            parentPost
        })
        await newComment.save();
        res.status(201).json({ message: "Comment added successfully", comment: newComment });
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ message: "Internal server error" });
    };
};

//Get Comments by product name
exports.GetCommentsByProduct = async (req, res) => {
    try{
        const{parentPost} = req.params;

        const comments = await Comments.find({parentPost})
        .populate("author","name email")
        .sort({createdAt:-1});
        res.status(200).json({message:"Comments fetched successfully",comments});
    }
catch(error){
    console.error("Error fetching comments:" ,error);
    res.status(500).json({message:"Internal server error"});
}}