export const formatPrice = (val: string) => {
  const numeric = val.replace(/\D/g, ""); // quita todo lo que no sea número
  const number = parseInt(numeric || "0", 10);
  return number.toLocaleString("en-US");
};
