import { productionFormSchema } from "@/services/validation/production-form-schema";
import { Button } from "../ui/button";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import MessageBox from "../message-box";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  IEstimateProductionEndUseCase,
  EstimateProductionEndRequest,
} from "@/application/use-cases/estimate-production-end-use-case.interface";

type ProductionFormProps = z.infer<typeof productionFormSchema>;

export default function ProductionEndForm({
  estimateProductionEndUseCase,
}: Readonly<{
  estimateProductionEndUseCase: IEstimateProductionEndUseCase;
}>) {
  const [displayMessage, setDisplayMessage] = useState<string | undefined>(
    undefined
  );
  const [isCalculated, setIsCalculated] = useState(false);

  const form = useForm<ProductionFormProps>({
    resolver: zodResolver(productionFormSchema),
    defaultValues: {
      totalLength: undefined,
      lengthProducedCounter: undefined,
      currentLineSpeed: undefined,
      currentLine: undefined,
    },
  });

  function handleCalculatesEndOfTube(values: EstimateProductionEndRequest) {
    // ProductionFormProps should be compatible with EstimateProductionEndRequest
    const response = estimateProductionEndUseCase.execute(values);

    setDisplayMessage(response.formattedMessage);
    setIsCalculated(true);

    form.reset();
  }
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Término de Produção</CardTitle>
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
                    <FormLabel className="mb-1.5">Comprimento total do tubo</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Informe o comprimento total"
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
                name="lengthProducedCounter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-1.5">Comprimento atual no contador</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Informe o comprimento atual"
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
                name="currentLineSpeed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-1.5">Velocidade atual da linha</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Informe a velocidade da linha"
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
                name="currentLine"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-1.5">Informe a linha</FormLabel>
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
                className="w-full text-xl sm:text-2xl py-4 sm:py-6"
                variant={"default"}
              >
                Calcular
              </Button>
              <MessageBox
                isCalculated={isCalculated}
                message={displayMessage ?? ""}
                setIsCalculated={setIsCalculated}
              />
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
