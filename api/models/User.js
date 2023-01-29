const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			require: true,
			min: 6,
			max: 20,
			unique: true,
		},
		email: {
			type: String,
			require: true,
			max: 50,
			unique: true,
		},
		password: {
			type: String,
			require: true,
			min: 6,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		tokens: [{
			token: {
				type: String,
				required: true
			}
		}],
		tasks: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Task",
			},
		],
	},
	{ timestamps: true }
);

// userSchema.virtual("tasks", {
// 	ref: "Task",
// 	localField: "_id",
// 	foreignField: "owner",
// });

userSchema.methods.toJSON = function () {
	const user = this
	const userObject = user.toObject()

	delete userObject.tokens
	delete userObject.password

	return userObject
}

module.exports = mongoose.model("User", userSchema);
