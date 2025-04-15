export function generatePriceRanges(
  min: number,
  max: number
): { label: string; value: string }[] {
  const steps = [1000, 5000, 10000, 25000, 50000, 100000];
  const ranges = [];
  let currentMin = min;

  for (let i = 0; i < steps.length; i++) {
    const currentMax = steps[i];
    if (currentMax > max) break;

    if (currentMin < currentMax) {
      ranges.push({
        label: `USD ${currentMin} - ${currentMax}`,
        value: `${currentMin}-${currentMax}`,
      });
      currentMin = currentMax;
    }
  }

  // último rango hasta el max real
  if (currentMin < max) {
    ranges.push({
      label: `USD ${currentMin} - ${max}`,
      value: `${currentMin}-${max}`,
    });
  }

  return ranges;
}
