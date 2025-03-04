const responseHandler = {
  success: (res, message = "Success", data = {}) => {
    res.status(200).json({
      success: true,
      message,
      data
    });
  },
  created: (res, message = "Resource created successfully", data = {}) => {
    res.status(201).json({
      success: true,
      message,
      data
    });
  },
  error: (res, message = "An error occurred", statusCode = 500, errors = {}) => {
    res.status(statusCode).json({
      success: false,
      message,
      errors
    });
  },
  notFound: (res, message = "Resource not found") => {
    res.status(404).json({
      success: false,
      message
    });
  },
  unauthorized: (res, message = "Unauthorized access") => {
    res.status(401).json({
      success: false,
      message
    });
  },
  forbidden: (res, message = "Forbidden access") => {
    res.status(403).json({
      success: false,
      message
    });
  }
};

module.exports = responseHandler;
