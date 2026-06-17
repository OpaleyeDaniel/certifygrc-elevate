import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import PrivacyPolicyContent from "@/components/legal/PrivacyPolicyContent";

type PrivacyPolicyDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function PrivacyPolicyDialog({ open, onOpenChange }: PrivacyPolicyDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[min(90vh,880px)] w-[min(100vw-1.5rem,42rem)] max-w-none gap-0 overflow-hidden border-border/60 bg-background/95 p-0 shadow-2xl backdrop-blur-md sm:rounded-2xl">
        <DialogHeader className="border-b border-border/50 bg-muted/20 px-6 py-5 text-left sm:px-8 sm:py-6">
          <DialogTitle className="font-display text-xl font-bold tracking-tight md:text-2xl">
            Privacy Policy
          </DialogTitle>
          <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
            How CertifyGRC collects, uses, and protects personal information.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[min(70vh,720px)] px-6 py-6 sm:px-8 sm:py-8">
          <PrivacyPolicyContent className="pr-4" />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
