// loggerMiddleware.js
const loggerMiddleware = (req, res, next) => {
    // Log the HTTP method and the requested URL (API)
    console.log(`${req.method} ${req.originalUrl}`);
    // Call the next middleware or route handler
    next();
  };
  
  module.exports = loggerMiddleware;
  