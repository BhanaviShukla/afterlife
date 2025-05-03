import { Button, Modal } from "@/components";
import { DisclaimerContent } from "@/components/DisclaimerContent";
import Link from "next/link";

export default function DisclaimerModal() {
  return (
    <Modal
      showCloseBtn
      id="disclaimer-modal"
      secondaryCta={
        <Button>
          <Link href="/journey/about-you">Continue</Link>
        </Button>
      }
    >
      <DisclaimerContent />
    </Modal>
  );
}
