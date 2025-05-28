import { ModeToggle } from './components/mode-toggle';
import PipeCompressionRateForm from './components/forms/pipe-compression-rate-form';
import ProductionEndForm from './components/forms/production-end-form';
import { ThemeProvider } from './components/theme-provider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { CalculateCompressionRateUseCase } from './application/use-cases/calculate-compression-rate.use-case';
import { EstimateProductionEndUseCase } from './application/use-cases/estimate-production-end.use-case';
// LineStrategy import might not be strictly necessary if EstimateProductionEndUseCase default is used.
// import { LineStrategy } from './application/strategies/line-strategy';

function App() {
  const calculateCompressionRateUseCase = new CalculateCompressionRateUseCase();
  const estimateProductionEndUseCase = new EstimateProductionEndUseCase();
  // Or, to be explicit:
  // const lineStrategy = new LineStrategy();
  // const estimateProductionEndUseCase = new EstimateProductionEndUseCase(lineStrategy);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="max-h-full bg-zinc-900 dark:bg-zinc-900">
        <div className="max-w-[700px] mx-auto p-3 flex items-center flex-col gap-2 ">
          <span className=" w-full">
            <ModeToggle />
          </span>
          <Tabs defaultValue="productionEndForm" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-12 bg-zinc-200 dark:bg-zinc-800">
              <TabsTrigger value="productionEndForm" className="text-base">
                Término de Produção
              </TabsTrigger>
              <TabsTrigger value="pipeCompressionRate" className="text-base">
                Taxa de compressão
              </TabsTrigger>
            </TabsList>
            <TabsContent value="productionEndForm">
              <ProductionEndForm estimateProductionEndUseCase={estimateProductionEndUseCase} />
            </TabsContent>
            <TabsContent value="pipeCompressionRate">
              <PipeCompressionRateForm calculateCompressionRateUseCase={calculateCompressionRateUseCase} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
