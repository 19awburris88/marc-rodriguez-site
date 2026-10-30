/** Inquiry validation shared by the contact form (client) and /api/contact (server). */

export const inquiryTypes = [
  { value: "speaking", label: "Speaking" },
  { value: "media", label: "Media or Podcast" },
  { value: "partnership", label: "Partnership" },
  { value: "general", label: "General" },
] as const;

export type InquiryType = (typeof inquiryTypes)[number]["value"];

export function isInquiryType(value: unknown): value is InquiryType {
  return inquiryTypes.some((t) => t.value === value);
}

export function inquiryLabel(type: InquiryType): string {
  return inquiryTypes.find((t) => t.value === type)?.label ?? type;
}

export type InquiryInput = {
  name: string;
  email: string;
  type: InquiryType;
  message: string;
  organization?: string;
  eventDate?: string;
  location?: string;
  website?: string;
};

export type InquiryField = keyof InquiryInput;
export type FieldErrors = Partial<Record<InquiryField, string>>;

export const limits = {
  name: 100,
  email: 254,
  messageMin: 20,
  message: 5000,
  organization: 150,
  eventDate: 60,
  location: 150,
  website: 300,
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function optional(value: string): string | undefined {
  return value.length ? value : undefined;
}

export function validateInquiry(
  raw: Record<string, unknown>,
): { ok: true; data: InquiryInput } | { ok: false; errors: FieldErrors } {
  const errors: FieldErrors = {};

  const name = str(raw.name);
  const email = str(raw.email);
  const type = str(raw.type);
  const message = str(raw.message);
  const organization = str(raw.organization);
  const eventDate = str(raw.eventDate);
  const location = str(raw.location);
  let website = str(raw.website);

  if (!name) errors.name = "Please enter your name.";
  else if (name.length > limits.name) errors.name = `Please keep your name under ${limits.name} characters.`;

  if (!email) errors.email = "Please enter your email address.";
  else if (email.length > limits.email || !EMAIL_RE.test(email))
    errors.email = "Please enter a valid email address, like name@example.com.";

  if (!isInquiryType(type)) errors.type = "Please choose what your inquiry is about.";

  if (!message) errors.message = "Please include a message.";
  else if (message.length < limits.messageMin)
    errors.message = `Please add a little more detail (at least ${limits.messageMin} characters).`;
  else if (message.length > limits.message)
    errors.message = `Please keep your message under ${limits.message} characters.`;

  if (organization.length > limits.organization)
    errors.organization = `Please keep this under ${limits.organization} characters.`;
  if (eventDate.length > limits.eventDate) errors.eventDate = `Please keep this under ${limits.eventDate} characters.`;
  if (location.length > limits.location) errors.location = `Please keep this under ${limits.location} characters.`;

  if (website) {
    if (!/^https?:\/\//i.test(website)) website = `https://${website}`;
    try {
      const url = new URL(website);
      if (!url.hostname.includes(".") || website.length > limits.website) throw new Error();
    } catch {
      errors.website = "Please enter a valid web address, like example.com.";
    }
  }

  if (Object.keys(errors).length) return { ok: false, errors };

  const isSpeaking = type === "speaking";
  return {
    ok: true,
    data: {
      name,
      email,
      type: type as InquiryType,
      message,
      organization: optional(organization),
      // Event details only apply to speaking inquiries.
      eventDate: isSpeaking ? optional(eventDate) : undefined,
      location: isSpeaking ? optional(location) : undefined,
      website: optional(website),
    },
  };
}

/** Name of the hidden honeypot field. Humans never see or fill it. */
export const HONEYPOT_FIELD = "fax_number";
