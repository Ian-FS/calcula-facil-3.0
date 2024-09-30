interface IRateCompressionService {
  calculatesRateCompression(
    carcassSense: string,
    distanceBetweenReferencePointAndCounter: number,
    finalNEDLengthCarcass: number,
    initialNEDLengthExtrusion: number,
    lengthCarcassToBeProduced: number,
    lengthProducedCounter: number,
    totalLengthCarcass: number,
  ): number;
}

export class RateCompressionService implements IRateCompressionService {
  calculatesRateCompression(
    carcassSense: string,
    distanceBetweenReferencePointAndCounter: number,
    finalNEDLengthCarcass: number,
    initialNEDLengthExtrusion: number,
    lengthCarcassToBeProduced: number,
    lengthProducedCounter: number,
    totalLengthCarcass: number,
  ): number {
    const isCrescente = carcassSense === 'crescente';

    const comprimentoCarcacaRealAtePontoReferencia = isCrescente
      ? lengthCarcassToBeProduced -
        (initialNEDLengthExtrusion - finalNEDLengthCarcass)
      : totalLengthCarcass -
        lengthCarcassToBeProduced -
        (initialNEDLengthExtrusion - finalNEDLengthCarcass);

    const comprimentoProduzidoAtePontoReferencia =
      lengthProducedCounter + distanceBetweenReferencePointAndCounter;

    const taxaDeCompressao =
      100 -
      (comprimentoProduzidoAtePontoReferencia * 100) /
        comprimentoCarcacaRealAtePontoReferencia;
    return taxaDeCompressao;
  }
}
