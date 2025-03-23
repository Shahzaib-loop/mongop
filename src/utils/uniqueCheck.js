const uniqueCheck = async (model, data = '', roleType = '', fieldType = '') => {
  let fieldValue =data[fieldType]
  const record = await model.findOne({ where: { [fieldType]: fieldValue, deleted: false }, raw: true })

  console.log(record, "rrrrrrrrrrrrrrr")

  if (record) {
    return {
      message: `${ fieldType } already exists`,
      reason: `${ fieldType } is already associated with another ${ roleType }`,
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