class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
  }
}
const customError = (msg, statusCode) => {
  return new CustomAPIError(msg, statusCode)
}
module.exports = { customError, CustomAPIError }