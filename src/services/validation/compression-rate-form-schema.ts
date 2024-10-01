import { z } from 'zod';

export const compressionRateFormSchema = z
  .object({
    totalLengthCarcass: z
      .string({ required_error: 'Informação necessária' })
      .min(1, 'Informação necessária')
      .transform((value) => value.replace(',', '.'))
      .refine((value) => !isNaN(Number(value)), {
        message: 'O valor deve ser um número válido',
      })
      .transform((value) => parseFloat(value))
      .refine((value) => value > 0, {
        message: 'O valor deve ser maior que zero',
      }),
    finalNEDLengthCarcass: z
      .string({ required_error: 'Informação necessária' })
      .min(1, 'Informação necessária')
      .transform((value) => value.replace(',', '.'))
      .refine((value) => !isNaN(Number(value)), {
        message: 'O valor deve ser um número válido',
      })
      .transform((value) => parseFloat(value))
      .refine((value) => value > 0, {
        message: 'O valor deve ser maior que zero',
      }),
    initialNEDLengthExtrusion: z
      .string({ required_error: 'Informação necessária' })
      .min(1, 'Informação necessária')
      .transform((value) => value.replace(',', '.'))
      .refine((value) => !isNaN(Number(value)), {
        message: 'O valor deve ser um número válido',
      })
      .transform((value) => parseFloat(value))
      .refine((value) => value > 0, {
        message: 'O valor deve ser maior que zero',
      }),
    lengthCarcassToBeProduced: z
      .string({ required_error: 'Informação necessária' })
      .min(1, 'Informação necessária')
      .transform((value) => value.replace(',', '.'))
      .refine((value) => !isNaN(Number(value)), {
        message: 'O valor deve ser um número válido',
      })
      .transform((value) => parseFloat(value))
      .refine((value) => value > 0, {
        message: 'O valor deve ser maior que zero',
      }),
    referencePointToCounterDistance: z
      .string({ required_error: 'Informação necessária' })
      .min(1, 'Informação necessária')
      .transform((value) => value.replace(',', '.'))
      .refine((value) => !isNaN(Number(value)), {
        message: 'O valor deve ser um número válido',
      })
      .transform((value) => parseFloat(value))
      .refine((value) => value > 0, {
        message: 'O valor deve ser maior que zero',
      }),
    producedLengthAtCounter: z
      .string({ required_error: 'Informação necessária' })
      .min(1, 'Informação necessária')
      .transform((value) => value.replace(',', '.'))
      .refine((value) => !isNaN(Number(value)), {
        message: 'O valor deve ser um número válido',
      })
      .transform((value) => parseFloat(value))
      .refine((value) => value > 0, {
        message: 'O valor deve ser maior que zero',
      }),
    carcassDirection: z.enum(['ascending', 'descending'], {
      required_error: 'Informação necessária',
      message: 'O valor deve ser um número válido',
    }),
  })
  .refine(
    (data) => data.initialNEDLengthExtrusion >= data.finalNEDLengthCarcass,
    {
      message:
        'Comprimento do duto inválido da extrusão deve ser igual ou maior que o inválido da carcaça',
      path: ['initialNEDLengthExtrusion'],
    },
  );
