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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Calculo do término de produção</DialogTitle>
        </DialogHeader>
        <p>{message}</p>
        <DialogFooter>
          <WhatsAppShareButton message={message ?? ''} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
