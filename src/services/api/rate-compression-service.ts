interface IRateCompressionService {
  calculateRateCompression(
    carcassDirection: 'ascending' | 'descending',
    referencePointToCounterDistance: number,
    finalNEDLengthCarcass: number,
    initialNEDLengthExtrusion: number,
    lengthCarcassToBeProduced: number,
    producedLengthAtCounter: number,
    totalLengthCarcass: number,
  ): number;
}

export class RateCompressionService implements IRateCompressionService {
  calculateRateCompression(
    carcassDirection: 'ascending' | 'descending',
    referencePointToCounterDistance: number,
    finalNEDLengthCarcass: number,
    initialNEDLengthExtrusion: number,
    lengthCarcassToBeProduced: number,
    producedLengthAtCounter: number,
    totalLengthCarcass: number,
  ): number {
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

    return this.calculateCompressionRate(
      producedLengthToReference,
      actualCarcassLengthToReference,
    );
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
