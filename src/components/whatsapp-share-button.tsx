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
    <a href={whatsappShareUrl}>
      <Button variant={'secondary'} type="button" className="w-full">
        Compartilhar no WhatsApp
      </Button>
    </a>
  );
}
