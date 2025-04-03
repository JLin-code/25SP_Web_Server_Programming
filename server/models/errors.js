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
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,

  MOVED_PERMANENTLY: 301, // 301 Moved Permanently
  FOUND: 302, // 302 Found (Temporary Redirect)
  NOT_MODIFIED: 304, // 304 Not Modified


  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,


  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVLIBLE: 503, // 503 Service Unavailable
  
};