const {registerUser, loginUser, refreshTokenService} = require("../../services/auth")
const logger = require("../../utils/logger")

const register = async (req, res) => {
    try {
        // User Registration Controller (Now returns tokens)
        const user = await registerUser(req.body) // Register the user

        console.log(user, 'user userrrrrrr')

        // Generate tokens after successful registration
        const tokens = loginUser(req.body) // Logging in immediately after registration

        console.log(tokens, 'tokens userrrrrrr')

        res.status(201).json({message: "User registered successfully", tokens})
    } catch (error) {
        // logger.info(`${error}`)
        res.status(400).json({error: error.message})
    }
}

const login = async (req, res) => {
    try {
        const tokens = await loginUser(req.body)
        res.json(tokens)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const refreshToken = async (req, res) => {
    try {
        const {refreshToken} = req.body
        const tokens = await refreshTokenService(refreshToken)
        res.json(tokens)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {register, login, refreshToken}
