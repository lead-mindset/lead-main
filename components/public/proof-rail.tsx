import { cn } from "@/lib/utils";

type ProofStat = {
  value: string;
  label: string;
};

export function ProofRail({
  stats,
  className,
  itemClassName,
}: {
  stats: ProofStat[];
  className?: string;
  itemClassName?: string;
}) {
  return (
    <dl
      className={cn(
        "grid overflow-hidden border-y border-border/80 bg-card/30 sm:grid-cols-2 lg:grid-cols-4",
        className
      )}
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={cn(
            "min-h-28 border-b border-border/70 px-5 py-5 last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0",
            itemClassName
          )}
        >
          <dt className="text-3xl font-bold leading-none text-foreground sm:text-4xl">
            {stat.value}
          </dt>
          <dd className="mt-2 text-sm font-medium uppercase tracking-[0.08em] text-muted-foreground">
            {stat.label}
          </dd>
        </div>
      ))}
    </dl>
  );
}
