import { z } from 'zod';

export const productionFormSchema = z
  .object({
    totalLength: z
      .string({ required_error: 'Informação necessária' })
      .min(1, 'Informação necessária')
      .transform((value) => value.replace(',', '.'))
      .refine((value) => !isNaN(Number(value)), {
        message: 'O valor deve ser um número válido',
      })
      .transform((value) => parseFloat(value)),
    lengthProducedCounter: z
      .string({ required_error: 'Informação necessária' })
      .min(1, 'Informação necessária')
      .transform((value) => value.replace(',', '.'))
      .refine((value) => !isNaN(Number(value)), {
        message: 'O valor deve ser um número válido',
      })
      .transform((value) => parseFloat(value)),
    currentLineSpeed: z
      .string({ required_error: 'Informação necessária' })
      .min(1, 'Informação necessária')
      .transform((value) => value.replace(',', '.'))
      .refine((value) => !isNaN(Number(value)), {
        message: 'O valor deve ser um número válido',
      })
      .transform((value) => parseFloat(value)),
    currentLine: z.enum(['1', '2', '3'], {
      required_error: 'Informação necessária',
      message: 'O valor deve ser um número válido',
    }),
  })
  .refine((data) => data.totalLength > data.lengthProducedCounter, {
    message: 'Comprimento total menor do que o comprimento atual no contador',
    path: ['totalLength'],
  });
