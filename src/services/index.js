const Trainer = require("../models/trainer")

dataTest = async (req, res) => {
    let {fname, lname, age,} = req.body

    console.log(req.body, "reqreqreqreq")

    Trainer.create({fname, lname})
        .then(doc => console.log("Email saved:", doc))
        .catch(err => console.error("Error:", err))

    return res.json({title: 'Express', Message: `I'm listening on ${process.env.PORT}`})
}

module.exports = {
    dataTest
}