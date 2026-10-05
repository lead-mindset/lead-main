import { Building2, HeartHandshake, Users } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { IconTile } from "@/components/ui/icon-tile";

const partnerPaths = [
  {
    icon: Building2,
    title: "Company",
    outcome: "Host a visit, sponsor a program, or create student-facing access.",
    description: "For teams that can host, sponsor, or open industry exposure.",
  },
  {
    icon: HeartHandshake,
    title: "Professional or Mentor",
    outcome: "Mentor, speak, review work, or help students understand professional standards.",
    description: "For people who can mentor, speak, review work, or coach leaders.",
  },
  {
    icon: Users,
    title: "Community Organization",
    outcome: "Collaborate on STEM access, outreach, or a local student initiative.",
    description: "For organizations building STEM access or student opportunity.",
  },
];

export function PartnerPathsList() {
  return (
    <div className="mt-6 grid gap-3">
      {partnerPaths.map((path) => {
        const Icon = path.icon;
        return (
          <Card key={path.title} className="p-5">
            <CardContent className="flex items-start gap-4 p-0">
              <IconTile className="size-11 shrink-0 rounded-full bg-primary/10 text-primary">
                <Icon className="size-5" strokeWidth={1.6} />
              </IconTile>
              <div className="min-w-0">
                <h3 className="text-body-lg font-display font-bold text-foreground">
                  {path.title}
                </h3>
                <p className="mt-1.5 text-small font-semibold text-foreground">
                  {path.outcome}
                </p>
                <p className="mt-2 text-small text-muted-foreground">
                  {path.description}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
