export const errorHandler = (err, _req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  return res.status(503).json({ error: "Internal Server Error" });
};
