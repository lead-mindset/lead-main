"use client";
import { useState } from "react";
import DesktopMenu from "./DesktopMenu";
import type { MenuItem } from "./NavHeader";
import Image from "next/image";
import Link from "next/link";
import {
  InstagramIcon,
  LinkedinIcon,
  SlackIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com/yourpage",
    icon: InstagramIcon,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/yourcompany",
    icon: LinkedinIcon,
  },
  {
    name: "Slack",
    href: "https://slack.com/yourworkspace",
    icon: SlackIcon,
  },
];


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

    <div className="flex w-full ">
      <div className="">
        <Link
          href={"/"}
          className="cursor-pointer bg-white rounded-br-2xl gap-2 p-2 flex px-4"
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
      <div className="flex-1 h-2 "></div>

   
        <div className="hidden lg:flex px-3 items-center gap-3">
          {socialLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              target="_blank"
              aria-label={item.name}
              className="p-2 rounded-full bg-purple-500 text-white transition"
            >
              <HugeiconsIcon
                icon={item.icon}
                size={20}
                color=""
                strokeWidth={2}
              />
            </Link>
          ))}
        </div>
    

      <ul className="flex bg-white rounded-bl-2xl items-center">
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
          href={'/get-involved'}
          className="cursor-pointer  rounded-bl-2xl h-full bg-primary transition-all 
          flex items-center"
        >
          <button
            className="r px-4 text-base text-white font-bold"
          >
            Get Involved
          </button>
        </Link>




      </ul>


    </div>
  );
}

export default NavBar;
