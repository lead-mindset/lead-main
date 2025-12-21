'use client'
import MobMenu from "./MobMenu";
import NavBar from "./NavBar";
import Link from "next/link";

export type MenuItem = {
  name: string;
  href?: string;
  icon?: React.ElementType;
  subMenu?: SubMenuItem[];
  target?: "_blank" | "_self";
};

export type MobMenuProps = {
  menuItems: MenuItem[];
};

export interface SubMenuItem {
  name: string;
  href?: string;
  target?: "_blank" | "_self";
}

export const menuItems: MenuItem[] = [
  {
    name: "About",
    href: "/about-us",
    target: "_self",
  },
];

export default function NavHeader() {
  return (
    <header className="h-fit fixed w-full top-0 left-0 z-50 ">
      <nav className="flex w-full relative p-3">
        <NavBar menuItems={menuItems} />
        <div className="ml-auto flex items-center space-x-2 absolute">
          <div className="lg:hidden"> 
            <div>
            </div>
            <MobMenu menuItems={menuItems} />
          </div>
        </div>
      </nav>
    </header>
  );
}