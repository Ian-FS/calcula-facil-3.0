import { format, formatDistanceToNow } from 'date-fns';
import { calculateTotalValidPipe } from './compression-utils';
import { ptBR } from 'date-fns/locale';

interface IRateCompressionFormatMessage {
  totalLengthCarcass: number;
  initialNEDLengthExtrusion: number;
  finalNEDLengthCarcass: number;
  rateCompression: number;
}

export function formatRateCompressionMessage({
  finalNEDLengthCarcass,
  initialNEDLengthExtrusion,
  rateCompression,
  totalLengthCarcass,
}: IRateCompressionFormatMessage) {
  const totalValidPipeAfterCompress = calculateTotalValidPipe({
    totalLengthCarcass,
    initialNEDLengthExtrusion,
    finalNEDLengthCarcass,
    rateCompression,
  });

  return rateCompression > 0
    ? `A taxa de compressão está atualmente em ${rateCompression.toFixed(
        2,
      )}%. Caso essa taxa permaneça até o final da produção, o valor total de tubo válido será de aproximadamente ${totalValidPipeAfterCompress.toFixed(
        2,
      )} metros. `
    : `A taxa de compressão está atualmente em ${rateCompression.toFixed(
        2,
      )}%. Isso indica que o tubo está esticando. Caso essa taxa permaneça até o final da produção, o valor total de tubo válido será de aproximadamente ${totalValidPipeAfterCompress.toFixed(
        2,
      )}.`;
}

export function formatEndProductionMessage(
  productionEndDate: Date | undefined,
) {
  if (!productionEndDate) return 'Termino de produção não válido';

  return `A produção terminará ${formatDistanceToNow(productionEndDate, {
    addSuffix: true,
    locale: ptBR,
  })},
${format(productionEndDate, "'no dia' d 'de' LLLL 'às' HH:mm", {
  locale: ptBR,
})}.`;
}
