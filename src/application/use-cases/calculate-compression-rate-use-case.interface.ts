export interface CalculateCompressionRateRequest {
  carcassDirection: 'ascending' | 'descending';
  referencePointToCounterDistance: number;
  finalNEDLengthCarcass: number;
  initialNEDLengthExtrusion: number;
  lengthCarcassToBeProduced: number;
  producedLengthAtCounter: number;
  totalLengthCarcass: number;
}

export interface CalculateCompressionRateResponse {
  rateCompression: number;
  formattedMessage: string;
}

export interface ICalculateCompressionRateUseCase {
  execute(request: CalculateCompressionRateRequest): CalculateCompressionRateResponse;
}
