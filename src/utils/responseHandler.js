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
  notFound: (res, message = "Resource not found") => {
    res.status(404).json({
      success: false,
      message
    })
  },
  unauthorized: (res, message = "Unauthorized access") => {
    res.status(401).json({
      success: false,
      message
    })
  },
  forbidden: (res, message = "Forbidden access") => {
    res.status(403).json({
      success: false,
      message
    })
  }
}

module.exports = responseHandler
