import { ModeToggle } from './components/mode-toggle';
import PipeCompressionRateForm from './components/pipe-compression-rate-form';
import ProductionEndForm from './components/production-end-form';
import { ThemeProvider } from './components/theme-provider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';

function App() {
  
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
              <ProductionEndForm />
            </TabsContent>
            <TabsContent value="pipeCompressionRate">
              <PipeCompressionRateForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
