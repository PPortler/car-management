export const success = (
  res,
  {
    statusCode = 200,
    message = "Success",
    data = null,
    pagination = null,
  } = {}
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    ...(pagination && { pagination }),
  });
};

export const error = (
  res,
  {
    statusCode = 500,
    message = "Internal Server Error",
    error = null,
  } = {}
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    error,
  });
};

export const ok = (res, data, message = "Success") => {
  return success(res, {
    statusCode: 200,
    message,
    data,
  });
};

export const created = (res, data, message = "Created successfully") => {
  return success(res, {
    statusCode: 201,
    message,
    data,
  });
};

export const notFound = (res, message = "Resource not found") => {
  return error(res, {
    statusCode: 404,
    message,
  });
};

export const internal = (
  res,
  message = "Internal Server Error",
  err = null
) => {
  return error(res, {
    statusCode: 500,
    message,
    error:
      process.env.NODE_ENV === "development"
        ? err
        : null,
  });
};