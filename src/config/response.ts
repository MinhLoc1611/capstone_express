const successCode = (res: any, data: any, message: string) => {
  res.status(200).json({
    message,
    content: data,
  });
};

const failCode = (res: any, data: any, message: string) => {
  res.status(400).json({
    message,
    content: data,
  });
};

const errorCode = (res: any, message: string) => {
  res.status(500).json({
    message,
  });
};
export { successCode, failCode, errorCode };
