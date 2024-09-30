interface IRateCompressionFormatMessage {
  totalLengthCarcass: number;
  initialNEDLengthExtrusion: number;
  finalNEDLengthCarcass: number;
  rateCompression: number;
}

export function RateCompressionFormatMessage({
  finalNEDLengthCarcass,
  initialNEDLengthExtrusion,
  rateCompression,
  totalLengthCarcass,
}: IRateCompressionFormatMessage) {
  const totalValidPipeAfterCompress =
    totalLengthCarcass -
    (initialNEDLengthExtrusion - finalNEDLengthCarcass) -
    totalLengthCarcass * (rateCompression / 100);

  const message = `A taxa de compressão está atualmente em ${rateCompression.toFixed(
    2,
  )}%. Caso essa taxa permaneça até o final da produção, o valor total de tubo válido será de aproximadamente ${totalValidPipeAfterCompress.toFixed(
    2,
  )} metros. `;

  return message;
}
