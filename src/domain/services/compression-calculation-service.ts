export interface ICalculationParams {
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
}: ICalculationParams): number {
  return (
    totalLengthCarcass -
    (initialNEDLengthExtrusion - finalNEDLengthCarcass) -
    totalLengthCarcass * (rateCompression / 100)
  );
}
