"use client";

import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  InstagramIcon,
  LinkedinIcon,
  SlackIcon,
} from "@hugeicons/core-free-icons";

const socialLinks = [
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

interface SocialLinksProps {
  className?: string;
  iconSize?: number;
}

export default function SocialLinks({
  className = "",
  iconSize = 20,
}: SocialLinksProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socialLinks.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          target="_blank"
          aria-label={item.name}
          className="p-2 rounded-full bg-chart-3 text-white transition hover:scale-105"
        >
          <HugeiconsIcon
            icon={item.icon}
            size={iconSize}
            strokeWidth={2}
          />
        </Link>
      ))}
    </div>
  );
}
