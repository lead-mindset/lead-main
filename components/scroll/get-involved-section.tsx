"use client";

import Image from "next/image";
import AnimatedText from "./animated-text";
import { Button } from "../ui/button";
import Link from "next/link";
import SocialLinks from "../ui/social-links";

const EmpowerSection = () => {
  return (
    <div className="relative h-screen p-10 flex flex-col items-center justify-center text-white space-y-8 max-w-5xl mx-auto">

      <div className="max-w-52 mx-auto">
        <Image
          src="/leadgrouplogo.svg"
          alt="Logo"
          width={356}
          height={356}
          style={{ objectFit: "contain" }}
          priority
        />
      </div>

      <AnimatedText className="text-4xl text-center font-bold">
        EMPOWERING DREAMS
      </AnimatedText>

      <Link href="/get-involved">
        <Button className="w-fit">Get Involved</Button>
      </Link>
      <SocialLinks iconSize={50} />

    </div>
  );
};

export default EmpowerSection;
