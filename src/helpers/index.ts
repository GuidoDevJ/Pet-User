/* eslint-disable prettier/prettier */
const isValidObjectId = (objectId) => {
  // Regular expression to match MongoDB ObjectID format
  const objectIdPattern = /^[0-9a-fA-F]{24}$/;
  return objectIdPattern.test(objectId);
};

export { isValidObjectId };
