// status codes
// 409 = for already existing data like adding same data again
// 401 = unauthorized means email password invalid or profile never created

const responseHandler = {
  success: (res, message = "Success", data = {}) => {
    res.status(200).json({
      success: true,
      message,
      data
    })
  },
  created: (res, message = "Resource created successfully", data = {}) => {
    res.status(201).json({
      success: true,
      message,
      data
    })
  },
  error: (res, statusCode = 500, message = "An error occurred", reason = '') => {
    res.status(statusCode).json({
      success: false,
      errors: {
        statusCode,
        message,
        reason,
      }
    })
  },
  notFound: (res, message = "Resource not found", reason = '') => {
    res.status(404).json({
      success: false,
      error: {
        message,
        reason,
      }
    })
  },
  unauthorized: (res, message = "Unauthorized access", reason = 'invalid data') => {
    res.status(401).json({
      success: false,
      error: {
        message,
        reason,
      }
    })
  },
  forbidden: (res, message = "Forbidden access", reason = '') => {
    res.status(403).json({
      success: false,
      error: {
        message,
        reason,
      }
    })
  }
}

module.exports = responseHandler
