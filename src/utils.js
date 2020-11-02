export const asyncForEach = async (enumObject, callback) => {
  const promises = [];

  enumObject.forEach((obj) => promises.push(callback(obj)));

  return await Promise.all(promises);
};
