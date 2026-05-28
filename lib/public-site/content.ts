import {
  ArrowRight,
  Building2,
  GraduationCap,
  Handshake,
  HeartHandshake,
  Rocket,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

import { JOIN_LEAD_HREF } from "@/components/global/navigation/nav-links";

export const publicCtas = {
  join: JOIN_LEAD_HREF,
  partner: "/get-involved#partners",
  community: "/get-involved#partners",
  chapter: "/get-involved#chapters",
  programs: "/#programs",
  pathway: "/#pathway",
};

export const proofStats = [
  { value: "1,135+", label: "members" },
  { value: "14", label: "university chapters" },
  { value: "100+", label: "events organized" },
];

export const partnerLogos = [
  { name: "Microsoft", src: "/allies/microsoft.svg" },
  { name: "IBM", src: "/allies/ibm.png" },
  { name: "Accenture", src: "/allies/accenture.png" },
  { name: "SHPE", src: "/allies/shpe.webp" },
  { name: "ALPFA", src: "/allies/alpfa.png" },
  { name: "Peruvians in STEM", src: "/allies/peruviansinstem.jpg" },
];

export const audienceRoutes = [
  {
    title: "Join as a student",
    description:
      "Create your profile, find your chapter, discover programs, and start building proof of growth.",
    href: publicCtas.join,
    icon: GraduationCap,
    cta: "Join LEAD",
  },
  {
    title: "Submit chapter interest",
    description:
      "Submit interest to bring LEAD to your university through a selective review process.",
    href: publicCtas.chapter,
    icon: Rocket,
    cta: "Submit interest",
  },
  {
    title: "Partner with LEAD",
    description:
      "For companies, professionals, mentors, and sponsors ready to expand access with LEAD.",
    href: publicCtas.partner,
    icon: Handshake,
    cta: "Explore partnership",
  },
  {
    title: "Collaborate as a community organization",
    description:
      "Bring LEAD programs, workshops, or student opportunities into aligned communities.",
    href: publicCtas.partner,
    icon: Users,
    cta: "Start collaboration",
  },
];

export const pathwayStages = [
  {
    title: "Learn",
    promise: "Start where you are with workshops, mentors, and chapter activities that make STEM feel approachable.",
    outcome: "A place to start, and the confidence to keep going.",
  },
  {
    title: "Explore",
    promise: "See careers, companies, universities, and technologies before choosing one perfect path.",
    outcome: "A clearer sense of the rooms, roles, and futures they can choose from.",
  },
  {
    title: "Aspire",
    promise: "Build confidence through role models, mentorship, LEAD HER, and chapter leadership practice.",
    outcome: "The belief and practice to belong, contribute, and lead.",
  },
  {
    title: "Discover",
    promise: "Find the next concrete move through programs, mentors, projects, chapters, and partner opportunities.",
    outcome: "A next step they can act on with support.",
  },
];

export const ecosystemItems = [
  {
    title: "Chapters",
    description: "Student-led communities that develop leadership through structure, responsibility, and local impact.",
  },
  {
    title: "Programs",
    description: "Focused initiatives such as LEAD HER, LEAD Academia, bootcamps, visits, and leadership development.",
  },
  {
    title: "Events",
    description: "Experiences designed around one question: what value are we adding for students?",
  },
  {
    title: "Mentorship",
    description: "Professionals and alumni help students understand standards, careers, and the real professional world.",
  },
  {
    title: "Practical Projects",
    description: "Hands-on work that turns learning into proof, confidence, and portfolio-ready outcomes.",
  },
  {
    title: "Partners",
    description: "Companies, mentors, and community organizations expand access to opportunity and industry context.",
  },
  {
    title: "Pulse Feedback",
    description: "LEAD listens to belonging, motivation, trust, and chapter experience so the ecosystem can improve.",
  },
  {
    title: "Talent Platform",
    description: "The operational layer that connects profiles, chapters, events, pathways, and opt-in visibility.",
  },
];

export const communityMoments = [
  {
    title: "Students in motion",
    description: "Real LEAD moments make the pathway feel human before a student joins.",
    image: "/media/lead/hero/lead-community-hero.webp",
  },
  {
    title: "Chapter energy",
    description: "Chapters turn leadership into repeated practice, local ownership, and community trust.",
    image: "/media/lead/about/chapter-energy-lead-games.webp",
  },
  {
    title: "Shared standards",
    description: "Mentors, partners, and student leaders help students understand what opportunity requires.",
    image: "/media/lead/highlights/ibm-explore-day-speakers.webp",
  },
];

export const pillars = [
  {
    title: "Chapter Development",
    description: "Build sustainable chapters with participation, belonging, and shared responsibility.",
  },
  {
    title: "Academic Excellence",
    description: "Promote curiosity, discipline, learning, and preparation for future success.",
  },
  {
    title: "Leadership",
    description: "Develop confident, ethical leaders who can inspire others and create impact.",
  },
  {
    title: "Professional Development",
    description: "Connect skills, mentorship, and exposure to help students thrive in changing industries.",
  },
  {
    title: "Community Impact",
    description: "Encourage initiatives that leave a responsible and lasting contribution locally.",
  },
  {
    title: "Women Excellence",
    description: "Support women in STEM and leadership through intentional development and visibility.",
  },
  {
    title: "LEAD Academia",
    description: "Expose high school students to technology, leadership, and future opportunity.",
  },
];

export const programs = [
  {
    title: "LEAD HER",
    description: "A programmatic system that supports women in LEAD through STEM, leadership, mentorship, and growth.",
    nextStep: "Support women in leadership",
    outcome: "Mentorship, visibility, and leadership practice for women in STEM.",
    href: "/get-involved#partners",
    video: "/media/lead/programs/lead-her.mp4",
    poster: "/media/lead/programs/lead-her.webp",
  },
  {
    title: "LEAD Academia",
    description: "Early STEM exposure through Discover Day, university access, workshops, and student-led guidance.",
    nextStep: "Expand early access",
    outcome: "Students discover STEM before college feels out of reach.",
    href: "/get-involved#partners",
    video: "/media/lead/programs/lead-academia-discover-day.mp4",
    poster: "/media/lead/programs/lead-academia-discover-day.webp",
  },
  {
    title: "Corporate Visits",
    description: "Industry exposure that helps students understand culture, standards, career paths, and opportunity.",
    nextStep: "Host a visit",
    outcome: "Students see professional rooms, standards, and possible careers up close.",
    href: "/get-involved#partners",
    video: "/media/lead/programs/corporate-visit-microsoft.mp4",
    poster: "/media/lead/programs/corporate-visit-microsoft.webp",
  },
  {
    title: "Regional Events",
    description: "Large experiences like LEAD Games that connect chapters, teams, and student communities.",
    nextStep: "Build regional proof",
    outcome: "Chapters and partners gather around shared momentum and opportunity.",
    href: "/#impact",
    video: "/media/lead/programs/regional-events-lead-games.mp4",
    poster: "/media/lead/programs/regional-events-lead-games.webp",
  },
  {
    title: "Bootcamps and Projects",
    description: "Practical learning experiences, including AI agents and project days, that turn curiosity into applied skill.",
    nextStep: "Create proof of growth",
    outcome: "Students turn learning into projects, confidence, and portfolio proof.",
    href: "/get-involved#students",
    video: "/media/lead/programs/ai-agents-projects.mp4",
    poster: "/media/lead/programs/ai-agents-projects.webp",
  },
  {
    title: "Leadership Development",
    description: "Workshops, coaching, and chapter practice that develop responsibility, confidence, and judgment.",
    nextStep: "Practice leadership",
    outcome: "Student leaders build judgment through repeated responsibility.",
    href: "/get-involved#chapters",
    video: "/media/lead/programs/leadership-development-microsoft.mp4",
    poster: "/media/lead/programs/leadership-development-microsoft.webp",
  },
];

export const impactHighlights = [
  {
    title: "IBM Explore Day",
    what: "A regional event on IBM Peru's campus with AI and Quantum sessions and executive participation.",
    served: "More than 400 applicants and students seeking real innovation exposure.",
    why: "Students saw industry standards up close and connected learning with problem solving.",
    pillar: "Professional Development",
    image: "/media/lead/highlights/ibm-explore-day.webp",
  },
  {
    title: "Microsoft Peru Visit",
    what: "A LEAD PUCP visit to Microsoft Peru with an office tour, learning session, and networking.",
    served: "Students connecting university life with industry culture, mindset, and leadership.",
    why: "It made professional standards visible and helped students connect ambition with real rooms.",
    pillar: "Leadership",
    image: "/media/lead/highlights/microsoft-pucp-room.webp",
  },
  {
    title: "LEAD Discover Day",
    what: "Six high-tech workshops for students from more than 20 schools in the region.",
    served: "More than 100 high school students discovering STEM pathways.",
    why: "It created early access, curiosity, and confidence before college.",
    pillar: "LEAD Academia",
    image: "/media/lead/highlights/discover-day-students-writing.webp",
  },
  {
    title: "LEAD HER",
    what: "A LEAD HER experience where 40 women reflected, connected, and began writing their next chapter.",
    served: "Women in STEM building confidence, community, and visible leadership practice.",
    why: "It made support feel personal instead of abstract.",
    pillar: "Women Excellence",
    image: "/media/lead/highlights/lead-her-community.webp",
  },
  {
    title: "Rutgers University Moment",
    what: "A LEAD moment at Rutgers University that connected students across countries and cultures.",
    served: "Students and LEAD community members building a bridge between Latin America and the United States.",
    why: "It showed that LEAD's leadership community can travel across borders without losing its purpose.",
    pillar: "Academic Excellence",
    image: "/media/lead/highlights/rutgers-community.webp",
  },
  {
    title: "LEAD UNI Little Einsteins",
    what: "A school visit where LEAD UNI shared science, inspiration, and future STEM possibilities.",
    served: "Students at IE Nuestra Senora de Lourdes exploring technology through a closer, human conversation.",
    why: "It showed how chapters can turn community impact into something students can actually feel.",
    pillar: "Community Impact",
    image: "/media/lead/highlights/little-einsteins.webp",
  },
];

export const operatingValues = [
  {
    title: "Mentalidad",
    translation: "Mindset",
    description:
      "Students and chapter teams begin by understanding what LEAD expects of its leaders and culture.",
  },
  {
    title: "Proposito",
    translation: "Purpose",
    description:
      "Every chapter and program needs a clear reason for existing and a thoughtful vision for impact.",
  },
  {
    title: "Excelencia",
    translation: "Excellence",
    description:
      "LEAD protects standards through preparation, feedback, responsibility, and disciplined execution.",
  },
  {
    title: "Impacto",
    translation: "Impact",
    description:
      "Approval and growth depend on the ability to create sustainable value, not just activity.",
  },
];

export const leadership = [
  { name: "Luis Coronel", role: "Founder & CEO", image: "/luisphoto.jpg" },
  { name: "Antonny Porlles", role: "Co-Founder & COO", image: "/antonnyphoto.jpg" },
  { name: "Nicole Jimenez", role: "VP of Operations", image: "/nicolephoto.jpg" },
  { name: "Abigail Briones", role: "Director of Transformation", image: "/abigailbriones.jpeg" },
  { name: "Kiara Aguirre", role: "Director of Communications", image: "/kiara.jpg" },
  { name: "Arianna Yuri", role: "Director of Programs", image: "/arianna.jpg" },
];

export const chapterProcess = [
  {
    title: "Interest submitted",
    description: "You share your university context, motivation, team status, and intended impact.",
  },
  {
    title: "Initial review",
    description: "LEAD reviews fit, readiness, context, and whether the interest aligns with regional priorities.",
  },
  {
    title: "Orientation invitation if selected",
    description: "Selected applicants may be invited to orientation. Selection is not guaranteed.",
  },
  {
    title: "Activation sessions",
    description: "Founding teams work through Mentalidad, Proposito, Excelencia, and Impacto validations.",
  },
  {
    title: "Final approval decision",
    description: "Orientation or activation work does not guarantee approval. LEAD approves chapters when standards are met.",
  },
];

export const partnerTypes = [
  {
    title: "Company",
    value: "company",
    icon: Building2,
    description:
      "Support students through sponsorships, corporate visits, speaker sessions, mentorship, events, and consent-first talent visibility.",
  },
  {
    title: "Professional or Mentor",
    value: "professional_or_mentor",
    icon: HeartHandshake,
    description:
      "Contribute through mentoring, speaking, workshops, career coaching, leadership development, and professional standards.",
  },
  {
    title: "Community Organization",
    value: "community_organization",
    icon: Users,
    description:
      "Collaborate around STEM access, leadership, community impact, regional initiatives, and aligned student opportunity.",
  },
];

export const finalPaths = [
  { label: "Join LEAD", href: publicCtas.join, icon: ArrowRight },
  { label: "Submit Chapter Interest", href: publicCtas.chapter, icon: Star },
  { label: "Partner with LEAD", href: publicCtas.partner, icon: Sparkles },
  { label: "Community Collaboration", href: publicCtas.community, icon: Users },
];
