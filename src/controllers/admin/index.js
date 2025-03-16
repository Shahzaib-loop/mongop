const {refreshTokenService, registerUser, loginUser, logoutUser, dataUser,} = require("../../services/admin")
const logger = require("../../utils/logger")

const refreshToken = async (req, res) => {
    try {
        const {refreshToken} = req.body
        const tokens = await refreshTokenService(refreshToken)
        res.json(tokens)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const adminRegister = async (req, res) => {
    try {
        const user = await registerUser(req.body)

        console.log(user, 'user userrrrrrr')

        const tokens = loginUser(req.body)

        console.log(tokens, 'tokens userrrrrrr')

        res.status(201).json({message: "User registered successfully", tokens})
    } catch (error) {
        logger.info(`${error}`)
        res.status(400).json({error: error.message})
    }
}

const adminLogin = async (req, res) => {
    try {
        const tokens = await loginUser(req.body)
        res.json(tokens)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const adminLogout = async (req, res) => {
    try {
        const tokens = await logoutUser(req.body)
        res.json(tokens)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const adminData = async (req, res) => {
    try {
        const tokens = await dataUser(req?.params?.id)
        res.json(tokens)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {refreshToken, adminRegister, adminLogin, adminLogout, adminData,}
