import { useForm } from 'react-hook-form';
import { add, format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ModeToggle } from './components/mode-toggle';
import { ThemeProvider } from './components/theme-provider';
import { Button } from './components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './components/ui/form';
import { Input } from './components/ui/input';
import { Select } from '@radix-ui/react-select';
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './components/ui/select';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import WhatsAppShareButton from './components/whatsapp-share-button';

const formSchema = z
  .object({
    totalLengthCarcass: z
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
    currentLine: z
      .string({ required_error: 'Informação necessária' })
      .min(1, 'Informação necessária')
      .transform((value) => parseFloat(value)),
  })
  .refine(
    (data) =>
      data.totalLengthCarcass > data.lengthProducedCounter + data.currentLine,
    {
      message:
        'Comprimento total menor do que a soma do comprimento produzido no contador até a ferramenta',
      path: ['totalLengthCarcass'],
    },
  );

type formProps = z.infer<typeof formSchema>;
function App() {
  const distanceBetweenCounterToolLine1 = '58';
  const distanceBetweenCounterToolLine2 = '56';
  const distanceBetweenCounterToolLine3 = '61';
  const [productionEndDate, setProductionEndDate] = useState<Date>();
  const [isCalculated, setIsCalculated] = useState(false);
  const form = useForm<formProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      totalLengthCarcass: undefined,
      lengthProducedCounter: undefined,
      currentLineSpeed: undefined,
      currentLine: undefined,
    },
  });

  function handleCalculatesEndOfTube(values: formProps) {
    const {
      currentLine,
      currentLineSpeed,
      lengthProducedCounter,
      totalLengthCarcass,
    } = values;

    const remainingMinutesOfProduction =
      (totalLengthCarcass - (lengthProducedCounter + currentLine)) /
      currentLineSpeed;

    setProductionEndDate(
      add(new Date(), {
        minutes: remainingMinutesOfProduction,
      }),
    );

    setIsCalculated(true);

    form.reset();
  }

  const message = `A produção terminará ${
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

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen px-5 flex justify-center items-center flex-col gap-2 bg-zinc-950">
        <div className="w-96  flex flex-col gap-6 items-end px-6">
          <ModeToggle />
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={'outline'} className="w-full h-11 text-2xl">
                Término de Produção
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  Término de Produção
                </DialogTitle>
                <DialogDescription>
                  Calcula o tempo restante de produção
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleCalculatesEndOfTube)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="totalLengthCarcass"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Comprimento total da carcaça</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Informe o comprimento da carcaça"
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
                        <FormLabel>Comprimento produzido no contador</FormLabel>
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
                            <SelectItem value={distanceBetweenCounterToolLine1}>
                              1
                            </SelectItem>
                            <SelectItem value={distanceBetweenCounterToolLine2}>
                              2
                            </SelectItem>
                            <SelectItem value={distanceBetweenCounterToolLine3}>
                              3
                            </SelectItem>
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
                  <Dialog
                    open={isCalculated}
                    onOpenChange={() => setIsCalculated(false)}
                  >
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          Calculo do término de produção
                        </DialogTitle>
                      </DialogHeader>
                      <p>{message}</p>
                      <DialogFooter>
                        <WhatsAppShareButton message={message} />
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
