import { Button } from './ui/button';

interface WhatsAppShareButtonProps {
  message: string;
}

export default function WhatsAppShareButton({
  message,
}: Readonly<WhatsAppShareButtonProps>) {
  const encodedMessage = encodeURIComponent(message);

  // URL do WhatsApp para compartilhar
  const whatsappShareUrl = `https://wa.me/?text=${encodedMessage}`;

  return (
    <Button>
      <a href={whatsappShareUrl}>Compartilhar no WhatsApp</a>
    </Button>
  );
}
