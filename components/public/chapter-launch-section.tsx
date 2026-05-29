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
    <section id="chapters" className="relative scroll-mt-24 pb-16 pt-20 sm:pb-20 sm:pt-28">
      <MainContainer>
        <div className="grid gap-7 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
          <div>
            <p className="eyebrow-label">
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
                  <Button size="lg" variant="hero">Submit chapter interest</Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="max-h-[88dvh] !max-w-[min(42rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl">
                  <AlertDialogHeader className="items-start text-left">
                    <AlertDialogTitle>Request chapter interest</AlertDialogTitle>
                    <AlertDialogDescription>
                      Tell us where you are, who is building with you, and what
                      kind of student community you want to create. This is a
                      request for review, not chapter approval.
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

          <div data-lead-motion="card" className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="relative aspect-[16/10]">
              <video
                aria-hidden="true"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/media/lead/chapters/villarreal-chapter-team.webp"
                disablePictureInPicture
                tabIndex={-1}
                className="h-full w-full object-cover object-center"
              >
                <source
                  src="/media/lead/chapters/villarreal-chapter-team.mp4"
                  type="video/mp4"
                />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-background/78 via-background/8 to-transparent" />
              <p className="media-caption-title absolute bottom-5 left-5 right-5 max-w-xl text-white">
                Chapters make LEAD local, visible, and student-led.
              </p>
            </div>
          </div>
        </div>
      </MainContainer>
    </section>
  );
}
