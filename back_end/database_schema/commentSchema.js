const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content:{
        type :String,
        required :true,
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true,
    },
    parentPost:{
        type :String,
        required:true,
        index:true,
    },
    createdAt: {
        type:Date,
        default :Date.now,
    },
    }
)
module.exports = mongoose.model("comments",commentSchema);