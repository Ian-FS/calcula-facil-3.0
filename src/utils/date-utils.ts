import { formatDistanceToNow, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export class DateFormatterService {
  static formatEndProductionMessageWithDate(productionEndDate: Date) {
    return `A produção terminará ${
      productionEndDate &&
      formatDistanceToNow(productionEndDate, {
        addSuffix: true,
        locale: ptBR,
      })
    },
${
  productionEndDate &&
  format(productionEndDate, "'no dia' d 'de' LLLL 'às' HH:mm", {
    locale: ptBR,
  })
}.`;
  }
}
