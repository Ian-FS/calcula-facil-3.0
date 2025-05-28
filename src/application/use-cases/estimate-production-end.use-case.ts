import {
  IEstimateProductionEndUseCase,
  EstimateProductionEndRequest,
  EstimateProductionEndResponse,
} from './estimate-production-end-use-case.interface';
import { ILineStrategy } from '../strategies/line-strategy.interface';
import { LineStrategy } from '../strategies/line-strategy';
import { add, format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export class EstimateProductionEndUseCase
  implements IEstimateProductionEndUseCase
{
  private lineStrategy: ILineStrategy;

  constructor(lineStrategy: ILineStrategy = new LineStrategy()) {
    this.lineStrategy = lineStrategy;
  }

  execute(request: EstimateProductionEndRequest): EstimateProductionEndResponse {
    const {
      totalLength,
      lengthProducedCounter,
      currentLineSpeed,
      currentLine,
    } = request;

    const distanceBetweenToolCounter =
      this.lineStrategy.distanceBetweenToolCounter(currentLine);

    const remainingMinutesOfProduction =
      (totalLength - (lengthProducedCounter + distanceBetweenToolCounter)) /
      currentLineSpeed;

    const productionEndDate = add(new Date(), {
      minutes: remainingMinutesOfProduction,
    });

    // Integrate formatting logic from formatEndProductionMessage
    let formattedMessage: string;
    if (!productionEndDate) {
      formattedMessage = 'Termino de produção não válido';
    } else {
      formattedMessage = `A produção terminará ${formatDistanceToNow(
        productionEndDate,
        {
          addSuffix: true,
          locale: ptBR,
        },
      )},
${format(productionEndDate, "'no dia' d 'de' LLLL 'às' HH:mm", {
  locale: ptBR,
})}.`;
    }

    return {
      productionEndDate,
      formattedMessage,
    };
  }
}
