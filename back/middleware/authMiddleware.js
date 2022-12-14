import jwt, { decode } from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../../models/userModel.js'

export const protect = asyncHandler(async (req, res, next) => {
    let token

    if (req.header.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN)

        const userFound = await User.findById(decode.Id).select('-password')

        if (userFound) {
            req.user = userFound
            next()
        } else {
            res.status(401)
            throw new Error('Not authorized, token does not work')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})