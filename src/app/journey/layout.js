import { Logo } from "@/components";

export default function JourneyLayout({ children }) {
  return (
    <div className="container min-h-screen flex flex-col justify-between gap-6 py-20">
      <a className="flex" href="/">
        <Logo width={125} height={31} />
      </a>
      <section className="flex flex-col justify-around grow" id="journey-view">
        {children}
      </section>
    </div>
  );
}
