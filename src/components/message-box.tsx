import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import WhatsAppShareButton from './whatsapp-share-button';

interface IMessageBox {
  message: string;
  isCalculated: boolean;
  setIsCalculated: (parameter: boolean) => void;
}

export default function MessageBox({
  isCalculated,
  message,
  setIsCalculated,
}: Readonly<IMessageBox>) {
  return (
    <Dialog open={isCalculated} onOpenChange={() => setIsCalculated(false)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Resultado do Cálculo</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-base leading-relaxed">{message}</p>
        </div>
        <DialogFooter className="sm:justify-start">
          <WhatsAppShareButton message={message ?? ''} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
