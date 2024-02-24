"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSteps } from "@/appState/StepsState";
import { STEPS } from "@/appState/stepData";

const Nav = () => {
  const pathname = usePathname();
  const { selectedSteps } = useSteps();
  console.log({ selectedSteps, pathname });

  if (!selectedSteps.length) return <></>;

  const isActive = (stepSlug) => pathname.includes(stepSlug);
  const isDisabled = (id) => !selectedSteps.includes(id);

  return (
    <nav>
      <ul className="flex gap-5">
        {STEPS.map((step) => (
          <li key={step.id}>
            <Link
              className={`link ${
                isDisabled(step.id)
                  ? "disabled"
                  : isActive(step.slug)
                  ? "active"
                  : ""
              }`}
              href="/"
            >
              {step.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default Nav;
