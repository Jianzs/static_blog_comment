const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
	articleUrl: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	author: {
		type: String,
		default: 'Raggedy Man'
	},
	createdDate: {
		type: Date,
		default: Date.now
	}
});
CommentSchema.statics.save = (data, callback) => {
	data.articleUrl = data.article_url;
	data.author = data.author.length == 0 ? undefined : data.author;
	const comment = new Comment(data);
	comment.save(callback);
}
const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;