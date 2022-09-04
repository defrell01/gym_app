import User from '../../models/userModel.js'
import asyncHandler from 'express-async-handler'

//  @desc Register user
//  @route POST /api/users/
//  @access Public

export const registerUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const isHaveUser = await User.findOne({ email })

    if (isHaveUser) {
        res.status(400)
        throw new Error('User is already registered')
    }

    const user = await User.create({
        email, password
    })

    //Create token

    res.json(user)
})