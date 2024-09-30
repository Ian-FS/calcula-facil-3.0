import { z } from 'zod';

export const compressionRateFormSchema = z.object({
  totalLengthCarcass: z
    .string({ required_error: 'Informação necessária' })
    .min(1, 'Informação necessária')
    .transform((value) => value.replace(',', '.'))
    .refine((value) => !isNaN(Number(value)), {
      message: 'O valor deve ser um número válido',
    })
    .transform((value) => parseFloat(value)),
  finalNEDLengthCarcass: z
    .string({ required_error: 'Informação necessária' })
    .min(1, 'Informação necessária')
    .transform((value) => value.replace(',', '.'))
    .refine((value) => !isNaN(Number(value)), {
      message: 'O valor deve ser um número válido',
    })
    .transform((value) => parseFloat(value)),
  initialNEDLengthExtrusion: z
    .string({ required_error: 'Informação necessária' })
    .min(1, 'Informação necessária')
    .transform((value) => value.replace(',', '.'))
    .refine((value) => !isNaN(Number(value)), {
      message: 'O valor deve ser um número válido',
    })
    .transform((value) => parseFloat(value)),
  lengthCarcassToBeProduced: z
    .string({ required_error: 'Informação necessária' })
    .min(1, 'Informação necessária')
    .transform((value) => value.replace(',', '.'))
    .refine((value) => !isNaN(Number(value)), {
      message: 'O valor deve ser um número válido',
    })
    .transform((value) => parseFloat(value)),
  distanceBetweenReferencePointAndCounter: z
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
  carcassSense: z.enum(['crescente', 'decrescente'], {
    required_error: 'Informação necessária',
    message: 'O valor deve ser um número válido',
  }),
});
// .refine((data) => data.totalLength > data.lengthProducedCounter, {
//   message: 'Comprimento total menor do que o comprimento atual no contador',
//   path: ['totalLength'],
// });
