//  @desc Get user profile
//  @route GET /api/users/profile
//  @access Private
export const getUserProfile = (req, res) => {
    const user = {
        name: 'Polya',
        age: 18
    }

    res.json(user)
}