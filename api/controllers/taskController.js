const Task = require('../models/Task')
const User = require('../models/User')

const taskController = {
	createTasks: async (req, res) => {
		const task = new Task({
			...req.body,
			owner: req.user.id,
		});

		try {
			await task.save(); 

			if (req.user.id) {
				const user = User.findById(req.user.id);
				await user.updateOne({ $push: { tasks: task._id } });
			}

			res.status(201).send(task);
		} catch (e) {
			res.status(400).send(e);
		}
	},

	getAllTasks: async (req, res) => {
		const match = {};
		const sort = {};

		if (req.query.completed) {
			match.completed = req.query.completed === "true";
		}

		if (req.query.sortBy) {
			const parts = req.query.sortBy.split(":");
			sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
		}

		try {
			await req.user
				.populate({
					path: "tasks",
					match,
					options: {
						limit: parseInt(req.query.limit),
						skip: parseInt(req.query.skip),
						sort,
					},
				});
				// .execPopulate();
			res.send(req.user.tasks);
		} catch (e) {
			res.status(500).send();
		}
	},

	getTaskById: async (req, res) => {
		const _id = req.params.id;

		try {
			const task = await Task.findOne({ _id, owner: req.user.id }).populate('owner');

			if (!task) {
				return res.status(404).send();
			}

			res.send(task);
		} catch (e) {
			res.status(500).send();
		}
	},

	updateTasks: async (req, res) => {
		const updates = Object.keys(req.body);
		const allowedUpdates = ["name","description", "completed"];
		const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

		if (!isValidOperation) {
			return res.status(400).send({ error: "Invalid updates!" });
		}

		try {
			const task = await Task.findOne({
				_id: req.params.id,
				owner: req.user.id,
			});

			if (!task) {
				return res.status(404).send();
			}

			updates.forEach((update) => (task[update] = req.body[update]));
			await task.save();
			res.send(task);
		} catch (e) {
			res.status(400).send(e);
		}
	},

	deleteTasks: async (req, res) => {
		try {
			await User.updateMany(
				{tasks: req.params.id},
				{ $pull: { tasks: req.params.id }}
			);
			const task = await Task.findOneAndDelete({
				_id: req.params.id,
				owner: req.user.id,
			});

			if (!task) {
				res.status(404).send();
			}

			res.send(task);
		} catch (e) {
			res.status(500).send();
		}
	},
};

module.exports = taskController;
