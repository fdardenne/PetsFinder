/** 
• author v
• thumbnail
• pet name
• localization
• date
• owner name
• phone
• description
• img 1
• img 2
• img 3
• img 4
• found
• tags
• created at
• updated at
**/
var mongoose = require('mongoose');
var user = require('./user')


var postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    thumbnail: {
        type:String
    },
    petname: {
        type: String,
    },
    location: {
        type: String,     
    },
    date:{
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type:Date,
        default:Date.now
    },
    coordinates: {
        type: {type: String},
        coordinates: [Number]
    },
    description: String,
    found:Boolean,
    tags: String,
    
  
});
postSchema.index({"coordinates": "2dsphere"});
var Post = mongoose.model('Post', postSchema);

module.exports = Post;