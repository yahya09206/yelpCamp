var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
	text: String,
	author: {
		id: {
			type: mongoose.Schema.types.ObjectId,
		}
		username:
	}
});

module.exports = mongoose.model("Comment", commentSchema);