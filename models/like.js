const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    // this defines the object id of the liked object
    likeable:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        refPath : 'onModel'
    },
    //this field is used for defining the type of the liked object since this is dynamic reference
    onModel:{
        type:String,
        require:true,
        enum:['Post','Comment']  // enum restricts the like to belong to only post or comment , without this it would belong to any parent type
    }
},{
    timestamps:true
});


const Like = mongoose.model('Like',likeSchema);

module.exports = Like;