const bcrypt = require('bcrypt')
const { generateJWT } = require('../utils/jwt-utils')
const { ErrorResponse } = require('../utils/error-schema')
const UserModel = require('../models/User')

const authController = {
    register: async (req, res, next) => {
        const { firstname, lastname, email, password } = req.validatedData

        try {
            // Check if the user email already exists in Database
            const existingUser = await UserModel.findOne({ email })
            if (existingUser) {
                return res
                    .status(422)
                    .json(new ErrorResponse('Email already in use', 422))
            }

            // Generate hash with salt for bcrypt
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)

            // Store the new registered user with the hashed password
            const newUser = new UserModel({
                firstname,
                lastname,
                email,
                password: hashedPassword,
            })

            const savedUser = await newUser.save()
            req.user = { id: savedUser._id }

            next()
        } catch (error) {
            res.status(422).json(
                new ErrorResponse('Registration failed: ' + error.message, 422)
            )
        }
    },

    login: async (req, res) => {
        const { email, password } = req.validatedData

        try {
            // Find the user
            const user = await UserModel.findOne({ email })
            if (!user) {
                return res
                    .status(422)
                    .json(
                        new ErrorResponse(
                            'Invalid credentials: user not found',
                            422
                        )
                    )
            }

            // Check password
            const isValid = await bcrypt.compare(password, user.password)
            if (!isValid) {
                return res
                    .status(422)
                    .json(
                        new ErrorResponse(
                            'Invalid credentials: password not correct',
                            422
                        )
                    )
            }

            // Generate JWT
            const token = await generateJWT({
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
            })

            res.json({
                title: 'Login Successful',
                message: `${user.firstname} ${user.lastname} is logged in`,
                token: token.token,
                user: {
                    id: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                },
            })
        } catch (error) {
            res.status(500).json(
                new ErrorResponse('Login failed: ' + error.message, 500)
            )
        }
    },

    // Google OAuth handler
    googleOAuth: async (req, res) => {
        const { email, firstname, lastname, googleId } = req.user // Data provided by Passport.js

        try {
            // Check if user exists
            let user = await UserModel.findOne({ email })
            if (!user) {
                // If the user does not exist, create a new user
                user = new UserModel({
                    firstname,
                    lastname,
                    email,
                    googleId,
                })
                await user.save()
            }

            // Generate JWT
            const token = await generateJWT({
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
            })

            res.json({
                title: 'Google Login Successful',
                message: `${user.firstname} ${user.lastname} is logged in`,
                token: token.token,
                user: {
                    id: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                },
            })
        } catch (error) {
            res.status(500).json(
                new ErrorResponse('Google login failed: ' + error.message, 500)
            )
        }
    },

    refresh: async (req, res) => {
        const { email } = req.validatedData

        try {
            const user = await UserModel.findOne({ email })
            if (!user) {
                return res.status(404).json({ message: 'User not found' })
            }

            const token = await generateJWT({
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
            })

            res.json({ token: token.token })
        } catch (error) {
            res.status(500).json(
                new ErrorResponse('Token refresh failed: ' + error.message, 500)
            )
        }
    },
}

module.exports = authController
