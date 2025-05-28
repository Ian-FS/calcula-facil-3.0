import {
  ICalculateCompressionRateUseCase,
  CalculateCompressionRateRequest,
  CalculateCompressionRateResponse,
} from './calculate-compression-rate-use-case.interface';
import {
  calculateTotalValidPipe,
  ICalculationParams,
} from 'src/domain/services/compression-calculation-service';

export class CalculateCompressionRateUseCase
  implements ICalculateCompressionRateUseCase
{
  execute(request: CalculateCompressionRateRequest): CalculateCompressionRateResponse {
    const {
      carcassDirection,
      referencePointToCounterDistance,
      finalNEDLengthCarcass,
      initialNEDLengthExtrusion,
      lengthCarcassToBeProduced,
      producedLengthAtCounter,
      totalLengthCarcass,
    } = request;

    const actualCarcassLengthToReference =
      this.calculateActualCarcassLengthToReference(
        carcassDirection,
        lengthCarcassToBeProduced,
        initialNEDLengthExtrusion,
        finalNEDLengthCarcass,
        totalLengthCarcass,
      );

    const producedLengthToReference = this.calculateProducedLengthToReference(
      producedLengthAtCounter,
      referencePointToCounterDistance,
    );

    const rateCompression = this.calculateCompressionRate(
      producedLengthToReference,
      actualCarcassLengthToReference,
    );

    // Integrate formatting logic from formatRateCompressionMessage
    const calculationParams: ICalculationParams = {
      totalLengthCarcass,
      initialNEDLengthExtrusion,
      finalNEDLengthCarcass,
      rateCompression,
    };
    const totalValidPipeAfterCompress = calculateTotalValidPipe(calculationParams);

    let formattedMessage: string;
    if (rateCompression > 0) {
      formattedMessage = `A taxa de compressão está atualmente em ${rateCompression.toFixed(
        2,
      )}%. Caso essa taxa permaneça até o final da produção, o valor total de tubo válido será de aproximadamente ${totalValidPipeAfterCompress.toFixed(
        2,
      )} metros. `;
    } else {
      formattedMessage = `A taxa de compressão está atualmente em ${rateCompression.toFixed(
        2,
      )}%. Isso indica que o tubo está esticando. Caso essa taxa permaneça até o final da produção, o valor total de tubo válido será de aproximadamente ${totalValidPipeAfterCompress.toFixed(
        2,
      )}.`;
    }

    return {
      rateCompression,
      formattedMessage,
    };
  }

  private calculateActualCarcassLengthToReference(
    carcassDirection: 'ascending' | 'descending',
    lengthCarcassToBeProduced: number,
    initialNEDLengthExtrusion: number,
    finalNEDLengthCarcass: number,
    totalLengthCarcass: number,
  ): number {
    return carcassDirection === 'ascending'
      ? lengthCarcassToBeProduced -
          (initialNEDLengthExtrusion - finalNEDLengthCarcass)
      : totalLengthCarcass -
          lengthCarcassToBeProduced -
          (initialNEDLengthExtrusion - finalNEDLengthCarcass);
  }

  private calculateProducedLengthToReference(
    producedLengthAtCounter: number,
    referencePointToCounterDistance: number,
  ): number {
    return producedLengthAtCounter + referencePointToCounterDistance;
  }

  private calculateCompressionRate(
    producedLengthToReference: number,
    actualCarcassLengthToReference: number,
  ): number {
    return (
      100 - (producedLengthToReference * 100) / actualCarcassLengthToReference
    );
  }
}
