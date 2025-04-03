class CustomError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status; 
  }
}

function NotFoundError(message) {
  return new CustomError(message || 'Resource not found', 404);
}

const statusCodes = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};