import { Button, Modal } from "@/components";
import { DisclaimerContent } from "@/components/DisclaimerContent";
import Link from "next/link";

export default function DisclaimerModal() {
  return (
    <Modal
      id="disclaimer-modal"
      secondaryCta={
        <Button>
          <Link href="/will">Continue</Link>
        </Button>
      }
    >
      <DisclaimerContent />
    </Modal>
  );
}
