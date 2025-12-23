const error = (err, req, res, next) => {

  console.error("Global Error:", err);

  const statusCode = 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message
  });
};

export default error;