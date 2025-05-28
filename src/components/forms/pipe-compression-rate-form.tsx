import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { zodResolver } from "@hookform/resolvers/zod";

import { compressionRateFormSchema } from "@/services/validation/compression-rate-form-schema";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import MessageBox from "../message-box";
import { ArrowBigDown } from "lucide-react";
import { useState } from "react";
import {
  ICalculateCompressionRateUseCase,
  CalculateCompressionRateRequest,
} from "@/application/use-cases/calculate-compression-rate-use-case.interface";
type PipeCompressionRateFormProps = z.infer<typeof compressionRateFormSchema>;

export default function PipeCompressionRateForm({
  calculateCompressionRateUseCase,
}: Readonly<{
  calculateCompressionRateUseCase: ICalculateCompressionRateUseCase;
}>) {
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [isCalculated, setIsCalculated] = useState(false);
  const form = useForm<PipeCompressionRateFormProps>({
    resolver: zodResolver(compressionRateFormSchema),
    defaultValues: {
      carcassDirection: undefined,
      referencePointToCounterDistance: undefined,
      finalNEDLengthCarcass: undefined,
      initialNEDLengthExtrusion: undefined,
      lengthCarcassToBeProduced: undefined,
      producedLengthAtCounter: undefined,
      totalLengthCarcass: undefined,
    },
  });

  function handleCalculatesRateCompression(
    values: CalculateCompressionRateRequest // Directly use the request type
  ) {
    // The form values should be compatible with CalculateCompressionRateRequest
    // as PipeCompressionRateFormProps is z.infer<typeof compressionRateFormSchema>
    // and compressionRateFormSchema should align with CalculateCompressionRateRequest.
    const response = calculateCompressionRateUseCase.execute(values);

    setMessage(response.formattedMessage);
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
            <h3 className="flex items-center gap-1 text-zinc-900 dark:text-zinc-100 font-bold text-lg mb-3">
              PIPE CHART <ArrowBigDown />
            </h3>
            <div className="bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-300 dark:border-zinc-700 rounded-lg p-4 shadow-sm flex flex-col gap-2">
              <FormField
                control={form.control}
                name="totalLengthCarcass"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-1.5">
                      Comprimento total da carcaça
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Informe a metragem"
                        {...field}
                        value={field.value || ""}
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
                    <FormLabel className="mb-1.5">
                      Inválido do final da carcaça
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Informe a metragem"
                        {...field}
                        value={field.value || ""}
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
                    <FormLabel className="mb-1.5">
                      Inválido do início da extrusão
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Informe a metragem"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <h3 className="flex items-center gap-1 text-zinc-900 dark:text-zinc-100 font-bold text-lg mb-3 mt-6">
              PONTO DE REFERÊNCIA
              <ArrowBigDown />
            </h3>
            <div className="bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-300 dark:border-zinc-700 rounded-lg p-4 shadow-sm flex flex-col gap-2">
              <FormField
                control={form.control}
                name="lengthCarcassToBeProduced"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-1.5">
                      Comprimento da carcaça no ponto de referência
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Informe a metragem"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="referencePointToCounterDistance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-1.5">
                      Distancia entre o ponto de referencia e o contador
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Informe a metragem"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="carcassDirection"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-1.5">
                      Sentido da metragem da carcaça
                    </FormLabel>
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
                        <SelectItem value="ascending">Crescente</SelectItem>
                        <SelectItem value="descending">Decrescente</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="producedLengthAtCounter"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormLabel className="mb-1.5">
                    Comprimento atual no contador
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Informe a metragem"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full text-2xl py-6"
              variant={"default"}
            >
              Calcular
            </Button>
            <MessageBox
              isCalculated={isCalculated}
              message={message ?? ""}
              setIsCalculated={setIsCalculated}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
