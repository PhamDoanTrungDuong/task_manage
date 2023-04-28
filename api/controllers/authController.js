const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let refreshTokens = [];

const authController = {
	//REGISTER
	registerUser: async (req, res) => {
		try {
			// console.log(req)
			const salt = await bcrypt.genSalt(10);
			const hashed = await bcrypt.hash(req.body.password, salt);

			//Create new user
			const newUser = await new User({
				username: req.body.username,
				email: req.body.email,
				password: hashed,
			});

			console.log(newUser)

			//Save user to DB
			const user = await newUser.save();
			console.log("USER", user)
			res.status(200).json(user);
		} catch (err) {
			res.status(500).json(err);
		}
	},

	generateAccessToken: (user) => {
		return jwt.sign(
			{
				id: user.id,
				isAdmin: user.isAdmin,
			},
			process.env.JWT_ACCESS_KEY,
			{ expiresIn: "7d" }
		);
	},

	generateRefreshToken: (user) => {
		const token = jwt.sign(
			{
				id: user.id,
				isAdmin: user.isAdmin,
			},
			process.env.JWT_REFRESH_KEY,
			{ expiresIn: "365d" }
		);
		user.tokens = user.tokens.concat({ token });
		user.save();
		return token;
	},

	//LOGIN
	loginUser: async (req, res) => {
		try {
			const user = await User.findOne({ username: req.body.username });
			if (!user) {
				res.status(404).json("Incorrect username");
			}
			const validPassword = await bcrypt.compare(
				req.body.password,
				user.password
			);
			if (!validPassword) {
				res.status(404).json("Incorrect password");
			}
			if (user && validPassword) {
				//Generate access token
				const accessToken = authController.generateAccessToken(user);
				//Generate refresh token
				const refreshToken = authController.generateRefreshToken(user);
				//STORE REFRESH TOKEN IN COOKIE
				res.cookie("refreshToken", refreshToken, {
					httpOnly: true,
					secure: false,
					path: "/",
					sameSite: "strict",
				});
				// const { password, tokens, ...others } = user._doc;
				res.status(200).json({ user, accessToken, refreshToken });
			}
		} catch (err) {
			res.status(500).json(err);
		}
	},

	requestRefreshToken: async (req, res) => {
		//Take refresh token from user
		const refreshToken = req.cookies.refreshToken;
		//Send error if token is not valid
		if (!refreshToken) return res.status(401).json("You're not authenticated??");
		if (!req.user.tokens.find((token) => token.token === refreshToken)) {
			return res.status(403).json("Refresh token is not valid");
		}
		jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
			if (err) {
				console.log(err);
			}
			req.user.tokens = req.user.tokens.filter((token) => token.token !== refreshToken);
			//create new access token, refresh token and send to user
			const newAccessToken = authController.generateAccessToken(user);
			const newRefreshToken = authController.generateRefreshToken(req.user);
			// refreshTokens.push(newRefreshToken);
			res.cookie("refreshToken", newRefreshToken, {
				httpOnly: true,
				secure: false,
				path: "/",
				sameSite: "strict",
			});
			res.status(200).json({
				accessToken: newAccessToken,
				refreshToken: newRefreshToken,
			});
		});
	},

	//LOG OUT
	logOut: async (req, res) => {
		//Clear cookies when user logs out
		req.user.tokens = req.user.tokens.filter((token) => token.token !== req.body.token);
		await req.user.save()
		res.clearCookie("refreshToken");
		res.status(200).json("Logged out successfully!");
	},
};

module.exports = authController;
