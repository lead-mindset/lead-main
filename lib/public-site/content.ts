import {
  ArrowRight,
  Building2,
  GraduationCap,
  Handshake,
  HeartHandshake,
  Network,
  Rocket,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

import { JOIN_LEAD_HREF } from "@/components/global/navigation/nav-links";

export const publicCtas = {
  join: JOIN_LEAD_HREF,
  partner: "/get-involved#partners",
  chapter: "/get-involved#chapters",
  programs: "/#programs",
};

export const proofStats = [
  { value: "1,135+", label: "members" },
  { value: "14", label: "university chapters" },
  { value: "100+", label: "events organized" },
  { value: "LATAM + U.S.", label: "regional presence" },
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
    title: "Join LEAD",
    description:
      "Create your profile, find your chapter, discover programs, and start building proof of growth.",
    href: publicCtas.join,
    icon: GraduationCap,
    cta: "Start onboarding",
  },
  {
    title: "Build a Chapter",
    description:
      "Submit interest to bring LEAD to your university through a selective review process.",
    href: publicCtas.chapter,
    icon: Rocket,
    cta: "Submit interest",
  },
  {
    title: "Partner with LEAD",
    description:
      "Work with Latino student communities through events, mentorship, corporate exposure, and opt-in talent visibility.",
    href: publicCtas.partner,
    icon: Handshake,
    cta: "Explore partnership",
  },
  {
    title: "Explore Programs",
    description:
      "See the programs, events, and practical experiences that help students turn ambition into direction.",
    href: publicCtas.programs,
    icon: Network,
    cta: "View programs",
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
    description: "A programmatic system that supports women in LEAD toward STEM, leadership, mentorship, and growth.",
    nextStep: "Support women in leadership",
  },
  {
    title: "LEAD Academia",
    description: "Early exposure for high school students through STEM learning, university access, and leadership.",
    nextStep: "Expand early access",
  },
  {
    title: "Corporate Visits",
    description: "Industry exposure that helps students understand culture, standards, career paths, and opportunity.",
    nextStep: "Host a visit",
  },
  {
    title: "Regional Events",
    description: "Large experiences that connect chapters, partners, and student communities across the Americas.",
    nextStep: "Build regional proof",
  },
  {
    title: "Bootcamps and Projects",
    description: "Practical learning experiences that turn curiosity into applied skill and visible outcomes.",
    nextStep: "Create proof of growth",
  },
  {
    title: "Leadership Development",
    description: "Workshops, coaching, and chapter practice that develop responsibility, confidence, and judgment.",
    nextStep: "Practice leadership",
  },
];

export const impactHighlights = [
  {
    title: "IBM Explore Day",
    what: "A regional event on IBM Peru's campus with AI and Quantum sessions and executive participation.",
    served: "More than 400 applicants and students seeking real innovation exposure.",
    why: "Students saw industry standards up close and connected learning with problem solving.",
    pillar: "Professional Development",
  },
  {
    title: "Microsoft Leadership Summit",
    what: "A high-impact leadership summit that activated 10 LEAD chapters across Peru.",
    served: "University chapter leaders building local networks and collaboration.",
    why: "It strengthened the leadership structure needed for regional growth.",
    pillar: "Leadership",
  },
  {
    title: "LEAD Discover Day",
    what: "Six high-tech workshops for students from more than 20 schools in the region.",
    served: "More than 100 high school students discovering STEM pathways.",
    why: "It created early access, curiosity, and confidence before college.",
    pillar: "LEAD Academia",
  },
  {
    title: "LATAM Women's Hackathon",
    what: "LEAD earned second place in one of the region's largest women-focused hackathons.",
    served: "Women in technology building recognized solutions for sector leaders.",
    why: "It demonstrated the innovation and leadership already present in the community.",
    pillar: "Women Excellence",
  },
  {
    title: "Rutgers Shadow Program",
    what: "A university exposure program where students developed more than 12 AI projects.",
    served: "More than 80 high school students exploring STEM and college pathways.",
    why: "It connected access, creativity, and applied learning through partnership.",
    pillar: "Academic Excellence",
  },
  {
    title: "LEAD UTP Little Einsteins",
    what: "Technology workshops in a local shelter with hands-on STEM learning.",
    served: "More than 50 children introduced to creativity, problem solving, and technology.",
    why: "It showed how LEAD chapters can create responsible community impact.",
    pillar: "Community Impact",
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
];
