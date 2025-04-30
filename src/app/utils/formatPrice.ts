export const formatPrice = (val: number): string => {
  const valueFormat = val.toLocaleString("en-US");
  return valueFormat;
};
