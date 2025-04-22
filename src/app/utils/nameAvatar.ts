export function getInitials(name: string, lastName: string): string {
  const firsLetter = name.charAt(0).toUpperCase();
  const lastLetter = lastName.charAt(0).toUpperCase();
  return `${firsLetter}${lastLetter}`;
}
