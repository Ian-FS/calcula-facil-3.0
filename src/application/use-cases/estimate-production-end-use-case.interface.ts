export interface EstimateProductionEndRequest {
  totalLength: number;
  lengthProducedCounter: number;
  currentLineSpeed: number;
  currentLine: string; // Consider enum if lines are fixed
}

export interface EstimateProductionEndResponse {
  productionEndDate: Date;
  formattedMessage: string;
}

export interface IEstimateProductionEndUseCase {
  execute(request: EstimateProductionEndRequest): EstimateProductionEndResponse;
}
