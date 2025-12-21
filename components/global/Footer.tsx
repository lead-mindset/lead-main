'use client'
import Link from "next/link";
import { Instagram, Linkedin } from "lucide-react";
import { GradientIcon } from "../ui/gradient-icon";
import Image from "next/image";
interface FooterProps {
  className?: string;
  position: "fixed" | "static";
  opacity: number;
}

function Footer({ className = "", position, opacity }: FooterProps) {
  return (
    <div
      className={`${className} relative bg-white
      }`}
      style={{ opacity }}
    >
      <div className="relative"></div>

      <div
        className="rounded-t-xl w-full max-md:flex max-md:flex-col 
                   md:grid md:grid-cols-3 md:gap-3 p-6 z-50 md:items-center 
                   max-md:space-y-4 justify-center"
      >
        <div className="flex items-center space-x-4 justify-center">
          <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <GradientIcon icon={<Instagram />} color="from-pink-700 to-purple-500" />
          </Link>
          <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <GradientIcon icon={<Linkedin />} color="from-blue-700 to-purple-500" />
          </Link>
        </div>

        <div className="flex flex-col text-center items-center max-sm:w-full justify-around">
          <Link
        href={"/"}
        className="cursor-pointer gap-2 flex"
      >
        <Image
          src="/leadl2.svg"
          alt="Next.js Logo"
          width={60}
          height={60}
        />
        <h3 className="text-3xl font-bold">LEAD</h3>

      </Link>

        
        </div>

        <div className="max-md:mx-auto flex items-center justify-end space-x-4">
           

        </div>
      </div>
    </div>
  );
}

export default Footer;
