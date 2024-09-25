import { useForm } from 'react-hook-form';
import { ModeToggle } from './components/mode-toggle';
import { ThemeProvider } from './components/theme-provider';
import { Button } from './components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
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

const formSchema = z.object({
  totalLengthCarcass: z
    .string({ required_error: 'Informação necessaria' })
    .transform((value) => value.replace(',', '.')) // Substitui vírgula por ponto
    .refine((value) => !isNaN(Number(value)), {
      message: 'O valor deve ser um número válido',
    })
    .transform((value) => parseFloat(value)),
  lengthProducedCounter: z
    .string({ required_error: 'Informação necessária' })
    .transform((value) => value.replace(',', '.')) // Substitui vírgula por ponto
    .refine((value) => !isNaN(Number(value)), {
      message: 'O valor deve ser um número válido',
    })
    .transform((value) => parseFloat(value)),
  currentLineSpeed: z
    .string({ required_error: 'Informação necessária' })
    .transform((value) => value.replace(',', '.')) // Substitui vírgula por ponto
    .refine((value) => !isNaN(Number(value)), {
      message: 'O valor deve ser um número válido',
    })
    .transform((value) => parseFloat(value)),
  currentLine: z.string({ required_error: 'Informação necessária' }),
});

type formProps = z.infer<typeof formSchema>;
function App() {
  const form = useForm<formProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  function handleSubmit(values: formProps) {
    console.log(values);
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="px-5 flex justify-center items-center flex-col h-screen gap-2 bg-zinc-950">
        <div className="w-96 flex flex-col gap-6 items-end px-6">
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
                  onSubmit={form.handleSubmit(handleSubmit)}
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
                        <FormControl>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a linha" />
                            </SelectTrigger>
                            <SelectContent {...field}>
                              <SelectItem value="1">1</SelectItem>
                              <SelectItem value="2">2</SelectItem>
                              <SelectItem value="3">3</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full text-2xl"
                    variant={'default'}
                  >
                    Calcular
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild></DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        Calculo do término de produção
                      </DialogHeader>
                      <DialogDescription></DialogDescription>
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
