import { sources } from "./sources";
import type { Venture } from "./types";

export const ventures: Venture[] = [
  {
    id: "institute",
    name: "Manifest Fitness Institute",
    role: "Founder & CEO",
    description:
      "Fitness education paired with practical coaching and business development, for people building a career in fitness.",
    cta: "Explore the Institute",
    url: sources.institute,
    status: "approved",
    source: `${sources.institute}; ${sources.instituteAbout}`,
    note: "Description summarizes the Institute's public site. Logo and image pending.",
    image: {
      alt: "Students at Manifest Fitness Institute",
      needed: "Institute classroom or coaching photo (with permission)",
      status: "draft",
    },
  },
  {
    id: "dallas",
    name: "Manifest Dallas",
    role: "Owner",
    description:
      "A professional training environment in Dallas for independent trainers and their clients, with a directory that helps visitors find the right trainer.",
    cta: "Explore Manifest Dallas",
    url: sources.manifestDallas,
    status: "approved",
    source: sources.manifestDallas,
    note: "Description summarizes the Manifest Dallas public site. Logo and image pending.",
    image: {
      alt: "Inside the Manifest Dallas training floor",
      needed: "Manifest Dallas facility photo (with permission)",
      status: "draft",
    },
  },
];
