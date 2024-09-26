import { Button } from './ui/button';

interface WhatsAppShareButtonProps {
  message: string;
}

export default function WhatsAppShareButton({
  message,
}: Readonly<WhatsAppShareButtonProps>) {
  function removeNewLines(str: string): string {
    return str.replace(/\r?\n|\r/g, '').trim();
  }
  const formatedMessage = removeNewLines(message);

  const encodedMessage = encodeURIComponent(formatedMessage);

  // URL do WhatsApp para compartilhar
  const whatsappShareUrl = `https://wa.me/?text=${encodedMessage}`;

  return (
    <Button>
      <a href={whatsappShareUrl}>Compartilhar no WhatsApp</a>
    </Button>
  );
}
