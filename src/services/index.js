dataTest = async (req, res) => {
    res.json({title: 'Express', Message: `I'm listening from auth on ${process.env.PORT}`})
}

module.exports = {
    dataTest
}