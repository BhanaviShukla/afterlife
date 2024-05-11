import { Logo } from "@/components";

export default function Dashboard() {
  return (
    <div className="container flex flex-col justify-between gap-6">
      <a className="flex justify-between" href="/">
        <Logo />
      </a>
    </div>
  );
}
