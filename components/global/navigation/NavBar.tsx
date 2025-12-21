"use client";
import { useState } from "react";
import DesktopMenu from "./DesktopMenu";
import type { MenuItem } from "./NavHeader";
import Image from "next/image";
import Link from "next/link";
function NavBar({ menuItems }: { menuItems: MenuItem[] }) {
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);

  const handleMenuClick = (menuName: string) => {
    setSelectedMenu((prev) => (prev === menuName ? null : menuName));
  };

  const handleSubMenuClick = () => {
    setSelectedMenu(null);
  };

  const handleMenuItemClick = () => {
    setSelectedMenu(null);
  };

  return (

    <div className="flex w-full items-center">
      <div className="">
        <Link
          href={"/"}
          className="cursor-pointer gap-2 flex px-4"
        >
          <Image
            src="/leadl2.svg"
            alt="Next.js Logo"
            width={35}
            height={35}
          />
          <h3 className="font-bold text-lg">LEAD</h3>

        </Link>
      </div>
      <div className="flex-1 h-2 rounded-full  bg-primary"></div>

      <ul className="flex">
        {menuItems.map((menuItem) => (
          <DesktopMenu
            menuItem={menuItem}
            key={menuItem.name}
            isActive={selectedMenu === menuItem.name}
            onClick={() => handleMenuClick(menuItem.name)}
            onMenuItemClick={handleMenuItemClick}
            onSubMenuClick={handleSubMenuClick}
          />
        ))}
       

          <Link
            href={'/join_us'}
            target={"_blank"}
            className="cursor-pointer transition-all 
          flex items-center"
          >
            <button
              className="cyber-btn bg-primary p-2 px-6 font-bold"
              data-augmented-ui="tl-clip br-clip"
            >
              Join Us
            </button>
          </Link>
      



      </ul>


    </div>
  );
}

export default NavBar;
