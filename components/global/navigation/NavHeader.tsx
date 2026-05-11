import type { ElementType } from "react";

import NavBar from "./NavBar";

export type MenuItem = {
  name: string;
  href?: string;
  icon?: ElementType;
  subMenu?: SubMenuItem[];
  target?: "_blank" | "_self";
};

export interface SubMenuItem {
  name: string;
  href?: string;
  target?: "_blank" | "_self";
}

export default function NavHeader() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <nav aria-label="Primary navigation">
        <NavBar />
      </nav>
    </header>
  );
}
