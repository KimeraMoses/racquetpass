export const showError = (error) => {
  const errorMsg =
    error?.response?.data?.message ||
    "Failed to perform action, An Error Occured!!";
  return errorMsg;
};
