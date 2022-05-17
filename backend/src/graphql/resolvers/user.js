const userModel = require('../../models/user.model');
const jwt = require('jsonwebtoken');
const { secret } = require("../../../config/auth.config");
const { UserInputError } = require('apollo-server');
// Encryption
const bcrypt = require('bcrypt');
const salt = 10;

module.exports = {
    Query: {
        getUserByEmail: async (_, { email }) => {
            const user = await userModel.User.findOne({ email: email },);
            if (user) {
                console.log("User Fetched");
                return user
            }
            else {
                console.log("Error while fetching user data with email", email);
                throw new UserInputError(`Couldn't find user with email: ${email}`)
            }

        }//end of getUserByEmail
    },//end of Query
    Mutation: {
        createUser: async (_, { userInput },) => {
            console.log(userInput, "salt:", salt);
            const userD = new userModel.User(userInput);
            userD.password = await bcrypt.hash(userD.password, salt);
            const existingUser = await userModel.User.findOne({ email: userD.email },);
            if (existingUser) {
                throw new UserInputError(`Username '${userD.email}' is already taken.`);
            }
            else {
                const user = await userD.save();
                if (user) {
                    console.log("user created:", user)
                    return {
                        _id: user._id,
                        email: user.email,
                    };
                }
            }
        },// end of createUser
        login: async (parent, { email, password }, context) => {
            console.log("inside login");
            console.log("email:", email, "password:", password);
            const user = await userModel.User.findOne({ email: email },);

            if (user) {

                const comparison = await bcrypt.compare(password, user.password)
                if (comparison) {
                    const payload = { _id: user._id, email: user.email };
                    const token = jwt.sign(payload, secret, {
                        expiresIn: 1008000
                    });
                    console.log("Login Success");
                    // const jwtToken = "JWT" + token;
                    return {
                        token: "JWT" + token,
                    };
                    //res.send("Login Success");
                    //res.send(user);
                }
                else {
                    console.log("Login Failed, Wrong Password");
                    throw new UserInputError('Invalid credentials.');

                }
            }
            else {

                console.log("User does not exist");
                throw new UserInputError(`User: '${email}' not found.`);
            }

        },//end of login
        updateProfile: async (parent, { userInput }, context) => {

            const userData = {
                name: userInput.name,
                image: userInput.image,
                email: userInput.email,
                about: userInput.about,
                city: userInput.city,
                dob: userInput.dob,
                address: userInput.address,
                country: userInput.country,
                phone_no: userInput.phone_no
            }
            console.log("userreqdata", userInput);
            const user = await userModel.User.findOneAndUpdate({ _id: userInput.id }, userData, { new: true },)
            if (user) {
                console.log("Profile updated");
                console.log(user, userInput.email);
                return {
                    _id: user._id,
                    email: user.email,
                    message: "Profile updated",
                }
            }
            else {
                console.log("error");
                throw new UserInputError(`error while updating ${userInput.email}`);
            }

        }// end of updateProfile
    },// end of mutation
};
