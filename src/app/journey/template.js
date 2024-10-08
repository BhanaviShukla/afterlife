import { Logo, Nav } from "@/components";

export default function Template({ children }) {
  return (
    <div className="container flex flex-col justify-between gap-6">
      <div className="flex justify-between">
        <a href="/">
          <Logo />
        </a>
        <Nav />
      </div>
      <section
        className="flex flex-col justify-center"
        id="main-content-journey"
      >
        {children}
      </section>
    </div>
  );
}
