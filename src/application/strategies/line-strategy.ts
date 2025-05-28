import { ILineStrategy } from './line-strategy.interface';

export class LineStrategy implements ILineStrategy {
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
