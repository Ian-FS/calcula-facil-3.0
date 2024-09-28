import { ModeToggle } from './components/mode-toggle';
import PipeCompressionRateForm from './components/pipe-compression-rate-form';
import ProductionEndForm from './components/production-end-form';
import { ThemeProvider } from './components/theme-provider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="bg-zinc-950">
        <div className="max-w-[600px] bg-zinc-950 mx-auto p-4 flex items-center flex-col gap-2 ">
          <span className=" w-full">
            <ModeToggle />
          </span>
          <Tabs defaultValue="productionEndForm" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="productionEndForm">
                Término de Produção
              </TabsTrigger>
              <TabsTrigger value="pipeCompressionRate">
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
