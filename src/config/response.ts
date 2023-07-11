const successCode = (res: any, data: any, message: string) => {
  res.status(200).json({
    message,
    content: data,
  });
};

const failCode = (res: any, message: string) => {
  res.status(400).json({
    message,
  });
};

const errorCode = (res: any, error: any, message: string) => {
  res.status(500).json({
    error,
    message,
  });
};
export { successCode, failCode, errorCode };
