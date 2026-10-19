// Local images in /public/images. Turbopack cannot statically import AVIF, so their dimensions and blur
// placeholders are recorded here (regenerate the blur strings if an image is replaced).

import type { StaticImageData } from "next/image";

export const heroLibrary: StaticImageData = {
  src: "/images/hero-library.avif",
  width: 2400,
  height: 1600,
  blurDataURL: "data:image/webp;base64,UklGRl4AAABXRUJQVlA4IFIAAADwAQCdASoQAAsAAsBMJZwAAtuyKCPSnlAA/vkX4b5elUcBK4OHxwbnCP3UprnirVXzmGvLuAmF8ESFToq/fwFQccNHYCtGbzFdYuy1ABkgBKAA",
};

export const courthouseColumns: StaticImageData = {
  src: "/images/courthouse-columns.avif",
  width: 2400,
  height: 1600,
  blurDataURL: "data:image/webp;base64,UklGRnoAAABXRUJQVlA4IG4AAAAwAgCdASoQAAsAAsBMJQBOgMWW7Ru8tjTVQAD+7R8Gq6f9pfGULbC4+DynWq+4R42L9V/4DqNOkzx65r+mLrS1PQkxBMDPDRm2aT8+pFIDxJbbbsz32Us5PtP+mDq30rwyzfUkXR0ZdBDRbEwEAA==",
};

export const gavelDark: StaticImageData = {
  src: "/images/gavel-dark.avif",
  width: 2000,
  height: 1105,
  blurDataURL: "data:image/webp;base64,UklGRl4AAABXRUJQVlA4IFIAAADwAQCdASoQAAkAAsBMJZQCdAECwbh4aAAA/uldRbusrv3/o2PvEtRN759X9mdK1Db4/0FvRW3+EW9bOP/W+AR/zLrgBAxvoAPWasmtALksAAAA",
};

export const ladyJustice: StaticImageData = {
  src: "/images/lady-justice.avif",
  width: 1600,
  height: 1067,
  blurDataURL: "data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAADwAQCdASoQAAsAAsBMJZwAApLFO2kxiAAA/lROn40ycvPqItQBtzZMM2v716RYG/R5cPFH/QPL3sJGoQglTtGoQIAAAA==",
};

export const libraryShelves: StaticImageData = {
  src: "/images/library-shelves.avif",
  width: 2000,
  height: 1333,
  blurDataURL: "data:image/webp;base64,UklGRmIAAABXRUJQVlA4IFYAAADwAQCdASoQAAsAAsBMJZACdAEK+wzSxugA/vn7fapa0lPEQX0uijcpzPA+EoMolTjZhvDrJGiHY5qF3ZQqKJAZSRef2uUAQeCrBk3RMA3QMzttsAAAAA==",
};

export const emblemGold: StaticImageData = {
  src: "/images/emblem-gold.avif",
  width: 860,
  height: 570,
};

export const logoLight: StaticImageData = {
  src: "/images/logo-light.avif",
  width: 1104,
  height: 901,
};
