import { productionFormSchema } from '@/services/validation/production-form-schema';
import { Button } from './ui/button';
import {} from './ui/dialog';
import {
  Form,
  FormControl,
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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ProductionServiceWithStrategy } from '@/services/api/production-service';
import { useState } from 'react';
import { DateFormatterService } from '@/utils/date-utils';
import MessageBox from './message-box';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';

type ProductionFormProps = z.infer<typeof productionFormSchema>;

export default function ProductionEndForm() {
  const [productionEndDate, setProductionEndDate] = useState<Date>();
  const [isCalculated, setIsCalculated] = useState(false);
  const endProductionMessage =
    productionEndDate &&
    DateFormatterService.formatEndProductionMessageWithDate(productionEndDate);

  const form = useForm<ProductionFormProps>({
    resolver: zodResolver(productionFormSchema),
    defaultValues: {
      totalLength: undefined,
      lengthProducedCounter: undefined,
      currentLineSpeed: undefined,
      currentLine: undefined,
    },
  });

  function handleCalculatesEndOfTube(values: ProductionFormProps) {
    const {
      currentLine,
      currentLineSpeed,
      lengthProducedCounter,
      totalLength,
    } = values;

    const productionServiceWithStrategy = new ProductionServiceWithStrategy();

    const productionEndDate = productionServiceWithStrategy.calculatesEndPipe(
      totalLength,
      lengthProducedCounter,
      currentLineSpeed,
      currentLine,
    );

    setProductionEndDate(productionEndDate);
    setIsCalculated(true);

    form.reset();
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Término de Produção</CardTitle>
        <CardDescription>
          Calcula o tempo restante de produção do tubo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCalculatesEndOfTube)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="totalLength"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comprimento total do tubo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Informe o comprimento total"
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
              name="lengthProducedCounter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comprimento atual no contador</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Informe o comprimento atual"
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
              name="currentLineSpeed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Velocidade atual da linha</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Informe a velocidade da linha"
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
              name="currentLine"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Informe a linha</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a linha" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent {...field}>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                    </SelectContent>
                  </Select>

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
              message={endProductionMessage ?? ''}
              setIsCalculated={setIsCalculated}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
