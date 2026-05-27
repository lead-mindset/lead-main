import Image from "next/image";

import { MainContainer } from "@/components/global/main-container";
import { InterestForm } from "@/components/public/interest-form";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export function ChapterLaunchSection() {
  return (
    <section id="chapters" className="relative -mt-16 scroll-mt-24 pb-16 pt-32 sm:-mt-20 sm:pb-20 sm:pt-36">
      <MainContainer>
        <div className="grid gap-7 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase text-primary">
              Chapters
            </p>
            <h2 className="section-title mt-4 max-w-2xl">
              Want to bring LEAD to your campus?
            </h2>
            <p className="body-copy mt-4 max-w-xl text-muted-foreground">
              Share your university, your team, and why LEAD would matter there.
              A request starts the conversation; it does not create a chapter automatically.
            </p>

            <div className="mt-7">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="lg">Request a chapter</Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="max-h-[88dvh] !max-w-[min(42rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl">
                  <AlertDialogHeader className="items-start text-left">
                    <AlertDialogTitle>Request chapter interest</AlertDialogTitle>
                    <AlertDialogDescription>
                      Tell us where you are, who is building with you, and what
                      kind of student community you want to create.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <InterestForm
                    kind="chapter_interest"
                    defaultOpen
                    showToggle={false}
                    showHeader={false}
                    className="border-0 bg-transparent p-0 shadow-none"
                  />
                  <AlertDialogCancel className="w-full sm:w-fit">
                    Close
                  </AlertDialogCancel>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="relative aspect-[16/10]">
              <Image
                src="/chapters/chapter-1.jpg"
                alt="LEAD chapter students at a campus gathering"
                fill
                sizes="(min-width: 1024px) 48vw, 100vw"
                loading="eager"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/78 via-background/8 to-transparent" />
              <p className="absolute bottom-5 left-5 right-5 max-w-xl text-xl font-bold leading-tight text-white sm:text-2xl">
                Chapters make LEAD local, visible, and student-led.
              </p>
            </div>
          </div>
        </div>
      </MainContainer>
    </section>
  );
}
