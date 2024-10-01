interface ICalculateTotalValidPipe {
  totalLengthCarcass: number;
  initialNEDLengthExtrusion: number;
  finalNEDLengthCarcass: number;
  rateCompression: number;
}

export function calculateTotalValidPipe({
  finalNEDLengthCarcass,
  initialNEDLengthExtrusion,
  rateCompression,
  totalLengthCarcass,
}: ICalculateTotalValidPipe): number {
  return (
    totalLengthCarcass -
    (initialNEDLengthExtrusion - finalNEDLengthCarcass) -
    totalLengthCarcass * (rateCompression / 100)
  );
}
