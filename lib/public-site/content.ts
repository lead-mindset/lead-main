import {
  Building2,
  GraduationCap,
  Handshake,
  HeartHandshake,
  Info,
  MapPinPlus,
  Rocket,
  Users,
} from "lucide-react";

import { JOIN_LEAD_HREF } from "@/components/global/navigation/nav-links";

export const publicCtas = {
  join: JOIN_LEAD_HREF,
  about: "/about-us",
  involved: "/get-involved",
  partner: "/get-involved#partners",
  community: "/get-involved#partners",
  chapter: "/get-involved#chapters",
  programs: "/#programs",
  pathway: "/#pathway",
};

export const proofStats = [
  { value: "1,135+", label: "students since 2024" },
  { value: "14", label: "universities across 3 countries" },
  { value: "100+", label: "events hosted" },
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
      "Share interest in bringing a LEAD chapter to your university for team review.",
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
    description: "University-based communities that develop leadership through structure, responsibility, and local impact.",
  },
  {
    title: "Programs",
    description: "Focused experiences students can join, including LEAD HER, LEAD Academia, bootcamps, visits, and leadership development.",
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
    video: "/media/lead/about/students-in-motion.mp4",
  },
  {
    title: "Chapter energy",
    description: "Chapters turn leadership into repeated practice, local ownership, and community trust.",
    image: "/media/lead/about/chapter-energy-lead-games.webp",
    video: "/media/lead/about/chapter-energy.mp4",
  },
  {
    title: "Shared standards",
    description: "Mentors, partners, and student leaders help students understand what opportunity requires.",
    image: "/media/lead/highlights/microsoft-leadership-summit.webp",
    video: "/media/lead/about/shared-standards.mp4",
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
    title: "LEAD Discover Day",
    what: "A high-tech discovery day for students from schools across the region.",
    served: "High school students exploring STEM, innovation, and future pathways.",
    why: "Hands-on discovery sparked curiosity and early confidence in technology careers.",
    pillar: "LEAD Academia",
    image: "/media/lead/highlights/discover-day.webp",
  },
  {
    title: "Agent Innovation Day",
    what: "An applied Agentic AI day where students worked on real industry cases.",
    served: "University students building and presenting ideas with professionals.",
    why: "Students moved from learning about AI to practicing how agentic systems can solve real problems.",
    pillar: "Professional Development",
    image: "/media/lead/highlights/agent-innovation-day.webp",
  },
  {
    title: "Women Building the Future",
    what: "A space celebrating women in technology, leadership, and community.",
    served: "Women in STEM sharing stories, ambition, and technical confidence.",
    why: "Visibility and community show the next generation what women-led leadership looks like.",
    pillar: "Women Excellence",
    image: "/media/lead/highlights/women-building-the-future.webp",
  },
  {
    title: "LEAD Chocolatada",
    what: "A community gathering that turned a simple tradition into belonging.",
    served: "Chapter members and students sharing a warm moment together.",
    why: "Belonging is part of access: shared moments keep the community close.",
    pillar: "Community Impact",
    image: "/media/lead/highlights/lead-chocolatada.webp",
  },
  {
    title: "Peruvian Flavors with LEAD",
    what: "A cultural gathering celebrating Peruvian food and community.",
    served: "Students and chapter members sharing culture and connection.",
    why: "Culture is community: shared traditions strengthen identity and belonging.",
    pillar: "Community Impact",
    image: "/media/lead/highlights/peruvian-flavors.webp",
  },
  {
    title: "Mentes en Vivo - LEAD UNI",
    what: "A live session at UNI connecting students with ideas, mentors, and pathways.",
    served: "University students exploring technology, leadership, and opportunity.",
    why: "Live formats turn learning into conversation, connection, and clear next steps.",
    pillar: "Academic Excellence",
    image: "/media/lead/highlights/mentes-en-vivo-lead-uni.webp",
  },
  {
    title: "LEAD NYC Student Day",
    what: "A student day in New York connecting students to real-world opportunity.",
    served: "Students exploring careers, networks, and industries beyond campus.",
    why: "Exposure to new environments widens what students believe is possible.",
    pillar: "Professional Development",
    image: "/media/lead/highlights/nyc-student-day.webp",
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
  { name: "Abigail Briones", role: "Dir. of Transformation", image: "/abigailbriones.jpeg" },
  { name: "Cristhy T.", role: "Dir. of Legal & Compliance", image: "/cristhy.jpeg" },
  { name: "Keily Luna", role: "Marketing", image: "/keily.jpg" },
  { name: "Antonny Porlles", role: "Co-Founder & COO", image: "/antonnyphoto.jpg" },
  { name: "Jhoei Cisneros", role: "Dir. of Events", image: "/jhoel.png" },
  { name: "Ariana Cassina", role: "Dir. of Marketing", image: "/ariana.jpg" },
  { name: "Nikole A.", role: "Program Manager", image: "/nikole.jpg" },
  { name: "Nicole Jimenez", role: "VP of Operations", image: "/nicole.png" },
  { name: "Christopher Lozada", role: "Country Director, Peru", image: "/christopher.jpg" },
  { name: "Arianna Yauri", role: "Dir. of Programs", image: "/arianna.jpg" },
  { name: "Xiomara Landa", role: "Dir. of People", image: "/xiomara.jpg" },
  { name: "Angela Cortes", role: "Dir. of International Exp.", image: "/angela.png" },
  { name: "Kiara Aguirre", role: "Dir. of Communications", image: "/kiara.jpg" },
];

export const chapterProcess = [
  {
    title: "Interest submitted",
    description: "You share your university context, who is building with you, motivation, and intended impact.",
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
      "For teams that can host, sponsor, or open industry exposure.",
  },
  {
    title: "Professional or Mentor",
    value: "professional_or_mentor",
    icon: HeartHandshake,
    description:
      "For people who can mentor, speak, review work, or coach leaders.",
  },
  {
    title: "Community Organization",
    value: "community_organization",
    icon: Users,
    description:
      "For organizations building STEM access or student opportunity.",
  },
];

export const finalPaths = [
  { label: "About us", href: publicCtas.about, icon: Info },
  { label: "Submit chapter interest", href: publicCtas.chapter, icon: MapPinPlus },
  { label: "Partner with LEAD", href: publicCtas.partner, icon: Handshake },
  { label: "Community Collaboration", href: publicCtas.community, icon: Users },
];
