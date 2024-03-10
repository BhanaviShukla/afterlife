import { Logo, Nav } from "@/components";

export default function Template({ children }) {
  return (
    <div className="container flex flex-col justify-between gap-6">
      <div className="flex justify-between">
        <Logo />
        <Nav />
      </div>

      <section
        className="flex flex-col justify-around grow"
        id="main-content-journey"
      >
        <div className="flex flex-col justify-between grow gap-6">
          {children}
        </div>
      </section>
    </div>
  );
}
