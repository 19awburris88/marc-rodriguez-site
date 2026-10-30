"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { track } from "@/lib/analytics";
import {
  HONEYPOT_FIELD,
  inquiryTypes,
  isInquiryType,
  limits,
  validateInquiry,
  type FieldErrors,
  type InquiryField,
} from "@/lib/validation";
import { buttonStyles } from "./ui";

type Values = Record<InquiryField, string>;

const empty: Values = {
  name: "",
  email: "",
  type: "",
  message: "",
  organization: "",
  eventDate: "",
  location: "",
  website: "",
};

type Outcome =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "sent" }
  | { kind: "test" }
  | { kind: "error"; message: string };

const errorMessages: Record<string, string> = {
  unconfigured:
    "The contact form isn’t connected to an inbox yet, so your message was not sent. Your text is still here — please try again later.",
  failed: "We couldn’t send your message just now. Your text is still here — please try again in a moment.",
  rate_limited: "Too many messages from this connection. Please wait a few minutes and try again.",
  network: "We couldn’t reach the server. Check your connection and try again — your text is still here.",
  invalid: "Please review the highlighted fields.",
};

/** Reads ?type=speaking etc. Isolated in Suspense so the rest of the form prerenders. */
function TypeFromQuery({ onType }: { onType: (type: string) => void }) {
  const params = useSearchParams();
  const type = params.get("type");
  useEffect(() => {
    if (isInquiryType(type)) onType(type);
  }, [type, onType]);
  return null;
}

export function ContactForm({ fallback }: { fallback: ReactNode }) {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [outcome, setOutcome] = useState<Outcome>({ kind: "idle" });
  const [honeypot, setHoneypot] = useState("");
  const summaryRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const id = useId();

  // Preselect from the URL, but never override a choice the visitor already made.
  const setType = useCallback((type: string) => setValues((v) => (v.type ? v : { ...v, type })), []);

  const set = (field: InquiryField) => (e: { target: { value: string } }) => {
    const value = e.target.value;
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field])
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
  };

  const isSpeaking = values.type === "speaking";

  useEffect(() => {
    if (outcome.kind === "sent" || outcome.kind === "test") resultRef.current?.focus();
    if (outcome.kind === "error") summaryRef.current?.focus();
  }, [outcome]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (outcome.kind === "submitting") return;

    const check = validateInquiry(values);
    if (!check.ok) {
      setErrors(check.errors);
      // The error summary takes focus (see effect above) and links to each field.
      setOutcome({ kind: "error", message: errorMessages.invalid });
      return;
    }

    setErrors({});
    setOutcome({ kind: "submitting" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, [HONEYPOT_FIELD]: honeypot }),
      });
      const data: { status?: string; errors?: FieldErrors } = await res.json().catch(() => ({}));

      if (res.ok && data.status === "sent") {
        track({ name: "inquiry_submitted", props: { type: values.type } });
        setOutcome({ kind: "sent" });
      } else if (res.ok && data.status === "test") {
        setOutcome({ kind: "test" });
      } else {
        if (data.errors) setErrors(data.errors);
        setOutcome({ kind: "error", message: errorMessages[data.status ?? ""] ?? errorMessages.failed });
      }
    } catch {
      setOutcome({ kind: "error", message: errorMessages.network });
    }
  }

  if (outcome.kind === "sent") {
    return (
      <div ref={resultRef} tabIndex={-1} role="status" className="border border-divider bg-white/50 p-8 outline-none">
        <h2 className="font-display text-3xl">Thank you, {values.name.split(" ")[0]}.</h2>
        <p className="mt-4 text-lg leading-relaxed text-stone">
          Your message was submitted. A reply will come to <strong className="text-ink">{values.email}</strong>.
        </p>
      </div>
    );
  }

  if (outcome.kind === "test") {
    return (
      <div
        ref={resultRef}
        tabIndex={-1}
        role="status"
        className="border border-dashed border-bronze-deep bg-ivory-deep p-8 outline-none"
      >
        <p className="text-xs font-semibold tracking-[0.16em] text-bronze-deep uppercase">Preview mode</p>
        <h2 className="mt-2 font-display text-3xl">Your message was not sent.</h2>
        <p className="mt-4 leading-relaxed text-stone">
          The form passed validation and was logged on the development server, but no email delivery is configured
          (<code>CONTACT_DELIVERY=test</code>). See the README to connect a real inbox.
        </p>
        <button type="button" className={`${buttonStyles.outlineLight} mt-6`} onClick={() => setOutcome({ kind: "idle" })}>
          Back to the form
        </button>
      </div>
    );
  }

  const submitting = outcome.kind === "submitting";
  const fieldProps = (field: InquiryField) => ({
    id: `${id}-${field}`,
    name: field,
    value: values[field],
    onChange: set(field),
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `${id}-${field}-error` : undefined,
    className: `mt-2 block w-full border bg-white px-4 py-3 text-base text-ink placeholder:text-stone/70 focus:outline-2 focus:outline-offset-0 focus:outline-bronze-deep ${
      errors[field] ? "border-[#9b2c1f]" : "border-divider"
    }`,
  });

  const errorCount = Object.keys(errors).length;

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} aria-busy={submitting} className="space-y-6">
      <Suspense fallback={null}>
        <TypeFromQuery onType={setType} />
      </Suspense>

      {outcome.kind === "error" && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="border-l-4 border-[#9b2c1f] bg-[#9b2c1f]/5 p-4 text-sm text-[#7a2318] outline-none"
        >
          <p className="font-semibold">{outcome.message}</p>
          {errorCount > 0 && (
            <ul className="mt-2 list-disc pl-5">
              {Object.entries(errors).map(([field, msg]) => (
                <li key={field}>
                  <a href={`#${id}-${field}`} className="underline">
                    {msg}
                  </a>
                </li>
              ))}
            </ul>
          )}
          {!errorCount && <div className="mt-2">{fallback}</div>}
        </div>
      )}

      <fieldset>
        <legend className="text-sm font-semibold">
          What&rsquo;s this about? <Req />
        </legend>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {inquiryTypes.map((t) => (
            <label
              key={t.value}
              className={`flex min-h-12 cursor-pointer items-center justify-center border px-3 text-center text-sm transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-bronze-deep ${
                values.type === t.value
                  ? "border-ink bg-ink text-ivory"
                  : `bg-white hover:border-ink ${errors.type ? "border-[#9b2c1f]" : "border-divider"}`
              }`}
            >
              <input
                type="radio"
                name="type"
                value={t.value}
                checked={values.type === t.value}
                onChange={set("type")}
                className="sr-only"
                aria-describedby={errors.type ? `${id}-type-error` : undefined}
              />
              {t.label}
            </label>
          ))}
        </div>
        <FieldError id={`${id}-type-error`} message={errors.type} />
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Name" required htmlFor={`${id}-name`} error={errors.name} errorId={`${id}-name-error`}>
          <input {...fieldProps("name")} autoComplete="name" maxLength={limits.name} />
        </Field>
        <Field label="Email" required htmlFor={`${id}-email`} error={errors.email} errorId={`${id}-email-error`}>
          <input {...fieldProps("email")} type="email" autoComplete="email" maxLength={limits.email} />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="Organization"
          htmlFor={`${id}-organization`}
          error={errors.organization}
          errorId={`${id}-organization-error`}
        >
          <input {...fieldProps("organization")} autoComplete="organization" maxLength={limits.organization} />
        </Field>
        <Field label="Website" htmlFor={`${id}-website`} error={errors.website} errorId={`${id}-website-error`}>
          <input {...fieldProps("website")} type="text" inputMode="url" autoComplete="url" placeholder="example.com" />
        </Field>
      </div>

      {isSpeaking && (
        <div className="grid gap-6 border-l-2 border-bronze pl-5 sm:grid-cols-2">
          <Field
            label="Event date"
            hint="Approximate is fine"
            htmlFor={`${id}-eventDate`}
            error={errors.eventDate}
            errorId={`${id}-eventDate-error`}
          >
            <input {...fieldProps("eventDate")} placeholder="e.g. March 2027" maxLength={limits.eventDate} />
          </Field>
          <Field
            label="Location"
            hint="City, or virtual"
            htmlFor={`${id}-location`}
            error={errors.location}
            errorId={`${id}-location-error`}
          >
            <input {...fieldProps("location")} placeholder="Dallas, TX / Virtual" maxLength={limits.location} />
          </Field>
        </div>
      )}

      <Field
        label="Message"
        required
        hint={isSpeaking ? "Audience, format, and what you hope people take away" : undefined}
        htmlFor={`${id}-message`}
        error={errors.message}
        errorId={`${id}-message-error`}
      >
        <textarea {...fieldProps("message")} rows={6} maxLength={limits.message} />
      </Field>

      {/* Honeypot: hidden from people and assistive tech. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Fax number
          <input
            type="text"
            name={HONEYPOT_FIELD}
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </label>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" disabled={submitting} className={`${buttonStyles.solidDark} disabled:opacity-60`}>
          {submitting ? "Sending…" : "Send inquiry"}
        </button>
        <p className="text-xs text-stone">
          <Req /> Required. Submitting does not subscribe you to anything.
        </p>
      </div>
    </form>
  );
}

function Req() {
  return (
    <span aria-hidden className="text-bronze-deep">
      *
    </span>
  );
}

function Field({
  label,
  required,
  hint,
  htmlFor,
  error,
  errorId,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  htmlFor: string;
  error?: string;
  errorId: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-sm font-semibold">
        {label} {required ? <Req /> : <span className="font-normal text-stone">(optional)</span>}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      {hint && <p className="mt-0.5 text-xs text-stone">{hint}</p>}
      {children}
      <FieldError id={errorId} message={error} />
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-sm text-[#9b2c1f]">
      {message}
    </p>
  );
}
