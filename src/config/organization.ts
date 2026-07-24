/**
 * Centralized organization contact & configuration data for TAP
 * (Tanzania Association of Porters).
 *
 * This is the single source of truth for postal address, phone numbers,
 * official email, social-media links, Moshi Secretary Office
 * representatives, all office staff/representatives, and donation/bank details.
 *
 * Update values here — do NOT hardcode contact details in individual
 * components/pages. All contact-facing UI (Header, Footer, Contact page,
 * About page, Donate page, SEOHead structured data) reads from this file.
 */

import chairmanPhoto from "@/assets/mohamed-ally-mkoma.jpg";
import viceChairmanPhoto from "@/assets/loishiye-lenoy-mollel.png";
import edsonPhoto from "@/assets/edson-selemani-matauna.png";
import ramadhaniPhoto from "@/assets/ramadhani-lila-matali.jpg";
import samsonPhoto from "@/assets/samson-gabucho-machaba.jpg";
import winniePhoto from "@/assets/winnie-michael-mponde.jpg";
import marryPhoto from "@/assets/marry-robert-lyimo.jpg";
import gloryPhoto from "@/assets/glory-godlove-ndosi.jpg";
import mwanaidiPhoto from "@/assets/mwanaidi-habibu-mkumbo.jpg";
import mwallyPhoto from "@/assets/mwally-dunia-adonis.jpg";

// ---------------------------------------------------------------------------
// 1. Postal Address
// ---------------------------------------------------------------------------
export const address = {
  poBox: "P.O. Box 10109",
  city: "Arusha",
  country: "Tanzania",
  countryCode: "TZ",
  /** Convenience single-line rendering */
  full: "P.O. Box 10109, Arusha, Tanzania",
};

// ---------------------------------------------------------------------------
// 2. Official Telephone Numbers
// ---------------------------------------------------------------------------
// Confirmed official telephone numbers for TAP.
// Each entry has a human-readable display value and a normalized `tel:` href.
export const phoneNumbers: { label: string; display: string; href: string }[] = [
  { label: "Office", display: "+255 620 786 094", href: "tel:+255620786094" },
  { label: "Office", display: "+255 686 613 054", href: "tel:+255686613054" },
  { label: "General Line", display: "+255 763 488 857", href: "tel:+255763488857" },
];

// ---------------------------------------------------------------------------
// 3. Official Email Address
// ---------------------------------------------------------------------------
// DEVELOPER NOTE: Retained official verified email address.
// If missing or changing, update here. Public UI hides email if set to "".
export const officialEmail = "info@tap.or.tz";

// ---------------------------------------------------------------------------
// 4. Social Media Links
// ---------------------------------------------------------------------------
// DEVELOPER NOTE: Only platforms with non-empty URLs are rendered across the site.
// Enter verified URLs here when received from the client.
// Do NOT invent fake URLs or link icons to "#".
export const socialLinks: Record<string, string> = {
  facebook: "https://www.facebook.com/share/17zn9h6DpZ/",
  instagram: "https://www.instagram.com/tanzania_asociation_of_porters",
  youtube: "https://www.youtube.com/@tanzaniaporters",
  tiktok: "https://www.tiktok.com/@tanzaniaporters",
  googleReviews: "https://g.page/r/CT_PQ8cTMeCDEAE/review",
  googleShare: "https://share.google/gx0gJ8XAMkvbmvQR6",
  twitter: "", // DEVELOPER NOTE: Enter verified X/Twitter URL here when available
  linkedin: "", // DEVELOPER NOTE: Enter verified LinkedIn URL here when available
  whatsapp: "", // DEVELOPER NOTE: Enter verified WhatsApp link here when available
};

// ---------------------------------------------------------------------------
// 5. Moshi Secretary Office Representatives
// ---------------------------------------------------------------------------
// Explicitly confirmed representatives for the Moshi Secretary Office.
export interface Representative {
  name: string;
  office: string;
  location: string;
  image: string | null;
  roleTitle?: string;
}

export const moshiOfficeRepresentatives: Representative[] = [
  {
    name: "Mwanaidi Habibu Mkumbo",
    office: "Moshi Secretary Office",
    location: "Moshi",
    image: mwanaidiPhoto,
  },
  {
    name: "Mwally Dunia Adonis",
    office: "Moshi Secretary Office",
    location: "Moshi",
    image: mwallyPhoto,
  },
];

// ---------------------------------------------------------------------------
// 6. Organization Office Representatives & Leadership Staff
// ---------------------------------------------------------------------------
export const organizationStaff: Representative[] = [
  {
    name: "Mohamed Ally Mkoma",
    office: "Leadership",
    roleTitle: "Mwenyekiti TAP (Chairman)",
    location: "Arusha Main Office",
    image: chairmanPhoto,
  },
  {
    name: "Loishiye Lenoy Mollel",
    office: "Leadership",
    roleTitle: "Makamu Mwenyekiti (Vice Chairman)",
    location: "Arusha Main Office",
    image: viceChairmanPhoto,
  },
  {
    name: "Edson Selemani Matauna",
    office: "Leadership",
    roleTitle: "Vice Chairperson",
    location: "Arusha Main Office",
    image: edsonPhoto,
  },
  {
    name: "Ramadhani Lila Matali",
    office: "Administration",
    roleTitle: "Deputy General Secretary",
    location: "Arusha Main Office",
    image: ramadhaniPhoto,
  },
  {
    name: "Samson Gabucho Machaba",
    office: "Administration",
    roleTitle: "Administration",
    location: "Arusha Main Office",
    image: samsonPhoto,
  },
  {
    name: "Winnie Michael Mponde",
    office: "Main Office Secretary",
    roleTitle: "Main Office Secretary",
    location: "Arusha Main Office",
    image: winniePhoto,
  },
  {
    name: "Marry Robert Lyimo",
    office: "Marangu Secretary Office",
    roleTitle: "Marangu Secretary Office",
    location: "Marangu",
    image: marryPhoto,
  },
  {
    name: "Glory Godlove Ndosi",
    office: "Finance",
    roleTitle: "Accountant of TAP",
    location: "Arusha Main Office",
    image: gloryPhoto,
  },
  {
    name: "Mwanaidi Habibu Mkumbo",
    office: "Moshi Secretary Office",
    roleTitle: "Moshi Secretary Office",
    location: "Moshi",
    image: mwanaidiPhoto,
  },
  {
    name: "Mwally Dunia Adonis",
    office: "Moshi Secretary Office",
    roleTitle: "Moshi Secretary Office",
    location: "Moshi",
    image: mwallyPhoto,
  },
];

// ---------------------------------------------------------------------------
// 7. Donation / Bank Details
// ---------------------------------------------------------------------------
// DEVELOPER NOTE: The client has not yet supplied official institutional bank details.
// Populate the real values below once provided by the client:
// - bankName (e.g., "CRDB Bank Tanzania")
// - accountName (e.g., "Tanzania Association of Porters")
// - accountNumber (e.g., "0150123456700")
// - branch (e.g., "Arusha Main Branch")
// - swiftCode (e.g., "CORUTZTZ")
// - currency (e.g., "TZS / USD")
//
// When empty, the site renders a professional call-to-action to contact TAP directly
// for bank transfer instructions. It will NEVER render empty labels or fake numbers.
export const donationBankDetails = {
  bankName: "",
  accountName: "",
  accountNumber: "",
  branch: "",
  swiftCode: "",
  currency: "",
};

/** Evaluates to true only when valid bank details are configured above. */
export const hasBankDetails = Boolean(
  donationBankDetails.bankName && donationBankDetails.accountNumber
);
