import { Logo } from "@/components";

export default function JourneyLayout({ children }) {
  return (
    <div className="container min-h-screen flex flex-col justify-between gap-6 py-10">
      <a className={`pt-[5px] pb-[5px] pl-[7px] pr-[7px]`} href="/">
        <Logo width={80} height={20} className={'mx-2'} />
      </a>
      <section className="flex flex-col justify-around grow" id="journey-view">
        {children}
      </section>
    </div>
  );
}
