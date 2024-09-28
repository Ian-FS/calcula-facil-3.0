import { add } from 'date-fns';

interface IProductionService {
  calculatesEndPipe(
    totalLength: number,
    lengthProducedCounter: number,
    currentLineSpeed: number,
    currentLine: string,
  ): Date;
}
interface ILineStrategy {
  distanceBetweenToolCounter(line: string): number;
}

class LineStrategy implements ILineStrategy {
  distanceBetweenToolCounter(line: string): number {
    switch (line) {
      case '1':
        return 58;

      case '2':
        return 56;

      case '3':
        return 61;

      default:
        return 0;
    }
  }
}

export class ProductionServiceWithStrategy implements IProductionService {
  private lineStrategy: ILineStrategy;

  constructor(lineStrategy: ILineStrategy = new LineStrategy()) {
    this.lineStrategy = lineStrategy;
  }

  calculatesEndPipe(
    totalLength: number,
    lengthProducedCounter: number,
    currentLineSpeed: number,
    currentLine: string,
  ): Date {
    const distanceBetweenToolCounter =
      this.lineStrategy.distanceBetweenToolCounter(currentLine);

    const remainingMinutesOfProduction =
      (totalLength - (lengthProducedCounter + distanceBetweenToolCounter)) /
      currentLineSpeed;

    return add(new Date(), {
      minutes: remainingMinutesOfProduction,
    });
  }
}
