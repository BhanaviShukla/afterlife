import { Logo } from "@/components";
import style from './layout.module.css'

export default function JourneyLayout({ children }) {
  return (
    <div className="container min-h-screen flex flex-col justify-between gap-6 py-10">
      <a className={style.logoSpace} href="/">
        <Logo width={80} height={20} className={'mx-2'} />
      </a>
      <section className="flex flex-col justify-around grow" id="journey-view">
        {children}
      </section>
    </div>
  );
}
