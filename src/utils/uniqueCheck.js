const { Op } = require("sequelize")

const uniqueCheck = async (model, data = {}, roleType = '',) => {
  let numValue = data['number']
  let emailValue = data['email']

  const record = await model.findOne({
    where: {
      [Op.or]: [
        { email: emailValue },
        { number: numValue }
      ],
      deleted: false
    },
    raw: true
  })

  console.log("middlewareResponse: Unique Check Record: ", record)

  if (record) {
    return {
      message: `${ roleType } already exists`,
      reason: `email or number is already associated with another ${ roleType }`,
    }
  }
}

// const uniqueCheck = async (data = {}, contactType = '', fieldType = '') => {
//   const fieldValue = data[fieldType]
//   if (!fieldValue) return false
//
//   const models = {
//     customer: [Customers, fieldType === 'email' ? CustomerEmails : CustomerPhones],
//     company: [Companies, fieldType === 'email' ? CompanyEmails : CompanyPhones]
//   }
//
//   if (models[contactType]) {
//     const [mainModel, secondaryModel] = models[contactType]
//
//     const [record, secondaryRecord] = await Promise.all([
//         mainModel.findOne({ where: { [fieldType]: fieldValue, deleted: 0 }, raw: true }),
//         secondaryModel.findOne({ where: { [fieldType]: fieldValue, deleted: 0 }, raw: true }),
//       ]
//     )
//
//     if (record || secondaryRecord) {
//       return {
//         message: `${ fieldType } already exists`,
//         reason: `${ fieldType } is already associated with another ${ contactType }`,
//       }
//     }
//   }
// }

module.exports = {
  uniqueCheck,
}