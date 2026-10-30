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
      src: "/images/mfi-teaching.jpg",
      width: 2048,
      height: 1365,
      alt: "Marc Rodriguez teaching a class at Manifest Fitness Institute, beneath the words “Why Manifest is different”",
      needed: "Institute classroom or coaching photo (with permission)",
      status: "approved",
      source: "Supplied by Austin, 2026-10-30 (Institute marketing graphic, cropped to remove the URL, MFI logo, and tagline)",
      note: "Same person as the approved portrait. Confirm reuse permission with the Institute.",
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
      src: "/images/manifest-dallas-floor.jpg",
      width: 800,
      height: 533,
      alt: "The Manifest Dallas training floor: red turf, rows of red strength equipment, and a mural reading “Where Champions are Self Made”",
      needed: "Manifest Dallas facility photo (with permission)",
      status: "approved",
      source: "Supplied by Austin, 2026-10-30",
      note: "800px wide — fine for the panel, but request a larger original for high-density screens. Confirm reuse permission.",
    },
  },
];
