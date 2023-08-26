import userModel from "../models/userModel.js"

export const registerController = async (req, res, next) => {

    const { name, email, password } = req.body
    //validate
    if (!name) {
        next("name is requires");
    }
    if (!email) {
        next("email is needed");

    }
    if (!password) {
        next("password is needed");

    }
    const existingUser = await userModel.findOne({ email })
    if (existingUser) {
        next("email already registered pls login");
    }
    const user = await userModel.create({ name, email, password });
    //token
    const token = user.createJWT()
    res.status(201).send({
        success: true,
        message: 'user created succesfully',
        user: {
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            location: user.location
        },
        token
    });
};
export const loginController = async (req, res) => {
    const { email, password } = req.body
    //validation
    if (!email || !password) {
        next('please provide all fields')
    }
    //find user by email
    const user = await userModel.findOne({ email })
    if (!user) {
        next('invalid username or password')
    }
    //compare password
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
        next('Invalid username or password')
    }
    const token = user.createJWT()
    res.status(200).json({
        success: true,
        message: "login successfully",
        user,
        token,
    });
};
