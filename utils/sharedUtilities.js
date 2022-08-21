//For all status code and custom messages
export const customStatusMessage = (
  res,
  statusCode,
  success,
  message,
  data = null
) => {
  return res.status(statusCode).send({
    success,
    message,
    data,
  });
};
