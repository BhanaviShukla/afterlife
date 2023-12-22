import { Button, Card, Typography } from "@/components";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <a
          className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          By{" "}
          <Image
            src="/afterlife.svg"
            alt="afterlife"
            width={100}
            height={24}
            priority
          />
        </a>
      </div>
      <div className="flex flex-col flex-1 justify-evenly gap-4">
        <Typography variant="title">Title</Typography>
        <Typography variant="title-small">Title Small</Typography>
        <Typography variant="subtitle">Subtitle</Typography>
        <Typography variant="heading">Heading</Typography>
        <Typography variant="paragraph">Paragraph / body</Typography>
        <Typography variant="caption">caption</Typography>
      </div>
      <div className="flex flex-col flex-1 justify-around gap-2 m-8">
        <Button>Filled</Button>
        <Button disabled>Filled Disabled</Button>
        <Button variant="outlined">Outline</Button>
        <Button variant="outlined" disabled>
          Outline Disabled
        </Button>
        <Button variant="text">Text</Button>
        <Button variant="text" disabled>
          Text Disabled
        </Button>
      </div>
      <div className="flex flex-col flex-1 justify-around gap-2">
        <Card.Base backgroundColor={"--colour-g100"}>Hello</Card.Base>
      </div>
    </main>
  );
}
