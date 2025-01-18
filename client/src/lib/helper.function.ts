export const getValueCaseInsensitive = (obj: any, key: string) => {
  const keyLower = key.toLowerCase();
  return obj[Object.keys(obj).find((k) => k.toLowerCase() === keyLower) || key];
};
