import { useForm } from 'react-hook-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { zodResolver } from '@hookform/resolvers/zod';

import { compressionRateFormSchema } from '@/services/validation/compression-rate-form-schema';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Button } from './ui/button';
import MessageBox from './message-box';
import { ArrowBigDown } from 'lucide-react';
import { useState } from 'react';
import { RateCompressionService } from '@/services/api/rate-compression-service';
import { RateCompressionFormatMessage } from '@/utils/rate-compression-formate-message';

type PipeCompressionRateFormProps = z.infer<typeof compressionRateFormSchema>;

export default function PipeCompressionRateForm() {
  const [message, setMessage] = useState<string>();
  const [isCalculated, setIsCalculated] = useState(false);
  const form = useForm<PipeCompressionRateFormProps>({
    resolver: zodResolver(compressionRateFormSchema),
    defaultValues: {
      carcassSense: undefined,
      distanceBetweenReferencePointAndCounter: undefined,
      finalNEDLengthCarcass: undefined,
      initialNEDLengthExtrusion: undefined,
      lengthCarcassToBeProduced: undefined,
      lengthProducedCounter: undefined,
      totalLengthCarcass: undefined,
    },
  });
  const rateCompressionService = new RateCompressionService();

  function handleCalculatesRateCompression(
    values: PipeCompressionRateFormProps,
  ) {
    const {
      carcassSense,
      distanceBetweenReferencePointAndCounter,
      finalNEDLengthCarcass,
      initialNEDLengthExtrusion,
      lengthCarcassToBeProduced,
      lengthProducedCounter,
      totalLengthCarcass,
    } = values;

    const rateCompression = rateCompressionService.calculatesRateCompression(
      carcassSense,
      distanceBetweenReferencePointAndCounter,
      finalNEDLengthCarcass,
      initialNEDLengthExtrusion,
      lengthCarcassToBeProduced,
      lengthProducedCounter,
      totalLengthCarcass,
    );
    setMessage(
      RateCompressionFormatMessage({
        finalNEDLengthCarcass,
        initialNEDLengthExtrusion,
        rateCompression,
        totalLengthCarcass,
      }),
    );
    setIsCalculated(true);

    form.reset();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Taxa de Compressão</CardTitle>
        <CardDescription>
          Calcula a taxa de compressão da carcaça durante a produção
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCalculatesRateCompression)}
            className="space-y-4"
          >
            {' '}
            <FormDescription>
              <div className="flex items-center gap-1 text-zinc-900 dark:text-zinc-100 font-bold">
                PIPE CHART <ArrowBigDown />
              </div>
            </FormDescription>
            <div className="border-2 rounded-sm p-3 flex flex-col gap-2 focus-within:border-zinc-950 dark:focus-within:border-zinc-100">
              <FormField
                control={form.control}
                name="totalLengthCarcass"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comprimento total da carcaça</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Informe a metragem"
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="finalNEDLengthCarcass"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Inválido do final da carcaça</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Informe a metragem"
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="initialNEDLengthExtrusion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Inválido do início da extrusão</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Informe a metragem"
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormDescription>
              <div className="flex items-center gap-1 text-zinc-900 dark:text-zinc-100 font-bold">
                PONTO DE REFERÊNCIA
                <ArrowBigDown />
              </div>
            </FormDescription>
            <div className="border-2 rounded-sm p-3 flex flex-col gap-2 focus-within:border-zinc-950 dark:focus-within:border-zinc-100">
              <FormField
                control={form.control}
                name="lengthCarcassToBeProduced"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Comprimento da carcaça no ponto de referência
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Informe a metragem"
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="distanceBetweenReferencePointAndCounter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Distancia entre o ponto de referencia e o contador
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Informe a metragem"
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="carcassSense"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sentido da metragem da carcaça</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={String(field.value)}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o sentido" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent {...field}>
                        <SelectItem value="crescente">Crescente</SelectItem>
                        <SelectItem value="decrescente">Decrescente</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="lengthProducedCounter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comprimento atual no contador</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Informe a metragem"
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full text-2xl py-6"
              variant={'default'}
            >
              Calcular
            </Button>
            <MessageBox
              isCalculated={isCalculated}
              message={message ?? ''}
              setIsCalculated={setIsCalculated}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
