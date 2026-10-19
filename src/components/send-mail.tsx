"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  CheckCircle2,
  LoaderCircle,
  Mail,
  MessageSquare,
  Phone,
  Send,
  UserRound,
  AlertCircle,
} from "lucide-react";

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type SubmissionStatus = {
  type: "idle" | "sending" | "success" | "error";
  message: string;
};

const initialForm: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const inputClassName =
  "block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-teal-600 focus:ring-4 focus:ring-teal-500/10 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500 dark:hover:border-slate-600 dark:focus:border-teal-400 dark:focus:ring-teal-400/10";

const labelClassName =
  "mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200";

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormData>(initialForm);

  const [status, setStatus] = useState<SubmissionStatus>({
    type: "idle",
    message: "",
  });

  const isSending = status.type === "sending";

  const updateField = (
    field: keyof ContactFormData,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    if (status.type !== "sending") {
      setStatus({ type: "idle", message: "" });
    }
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (isSending) return;

    const phoneDigits = form.phone.replace(/\D/g, "");

    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      setStatus({
        type: "error",
        message:
          "Please enter a valid phone number containing 10 to 15 digits.",
      });
      return;
    }

    setStatus({
      type: "sending",
      message: "Sending your enquiry. Please wait...",
    });

    const templateParams = {
      from_name: form.name.trim(),
      from_email: form.email.trim(),
      phone: form.phone.trim(),
      message: form.message.trim(),
    };

    try {
      await emailjs.send(
        "service_3gpcn9h",
        "template_l9am7f3",
        templateParams,
        "vQQP408855YPbeFMB"
      );
    } catch {
      setStatus({
        type: "error",
        message:
          "We couldn't send your enquiry. Please try again or contact us on WhatsApp.",
      });
      return;
    }

    // The main enquiry has been sent successfully.
    setForm(initialForm);
    setStatus({
      type: "success",
      message:
        "Thank you! Your enquiry has been sent successfully.",
    });

    // Send the automatic reply separately.
    try {
      await emailjs.send(
        "service_3gpcn9h",
        "template_7j40dvf",
        templateParams,
        "vQQP408855YPbeFMB"
      );
    } catch (error) {
      // The primary enquiry was already sent, so keep the success status.
      console.error("Automatic reply could not be sent:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
      aria-label="WealthNestPro contact enquiry form"
    >
      {/* Name */}
      <div>
        <label htmlFor="contact-name" className={labelClassName}>
          Full name <span className="text-rose-600">*</span>
        </label>

        <div className="relative">
          <UserRound
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 dark:text-slate-500"
            aria-hidden="true"
          />

          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Enter your full name"
            value={form.name}
            onChange={(event) =>
              updateField("name", event.target.value)
            }
            className={`${inputClassName} pl-12`}
            minLength={2}
            maxLength={100}
            required
            disabled={isSending}
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="contact-email" className={labelClassName}>
          Email address <span className="text-rose-600">*</span>
        </label>

        <div className="relative">
          <Mail
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 dark:text-slate-500"
            aria-hidden="true"
          />

          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(event) =>
              updateField("email", event.target.value)
            }
            className={`${inputClassName} pl-12`}
            maxLength={254}
            required
            disabled={isSending}
          />
        </div>
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="contact-phone" className={labelClassName}>
          Phone number <span className="text-rose-600">*</span>
        </label>

        <div className="relative">
          <Phone
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 dark:text-slate-500"
            aria-hidden="true"
          />

          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="Enter your phone number"
            value={form.phone}
            onChange={(event) =>
              updateField("phone", event.target.value)
            }
            className={`${inputClassName} pl-12`}
            minLength={10}
            maxLength={20}
            required
            disabled={isSending}
            aria-describedby="contact-phone-help"
          />
        </div>

        <p
          id="contact-phone-help"
          className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400"
        >
          Include your country code if you are outside India.
        </p>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className={labelClassName}>
          How can we help? <span className="text-rose-600">*</span>
        </label>

        <div className="relative">
          <MessageSquare
            className="pointer-events-none absolute left-4 top-4 h-5 w-5 text-slate-400 dark:text-slate-500"
            aria-hidden="true"
          />

          <textarea
            id="contact-message"
            name="message"
            placeholder="Tell us whether you need a home loan, balance transfer, or loan against property..."
            value={form.message}
            onChange={(event) =>
              updateField("message", event.target.value)
            }
            className={`${inputClassName} min-h-32 resize-y pl-12`}
            rows={5}
            minLength={10}
            maxLength={3000}
            required
            disabled={isSending}
          />
        </div>

        <p className="mt-2 text-right text-xs text-slate-500 dark:text-slate-400">
          {form.message.length}/3000 characters
        </p>
      </div>

      {/* Submission status */}
      {status.type !== "idle" && (
        <div
          role={status.type === "error" ? "alert" : "status"}
          aria-live={status.type === "error" ? "assertive" : "polite"}
          className={`flex items-start gap-3 rounded-xl border p-4 text-sm leading-6 ${
            status.type === "sending"
              ? "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-200"
              : status.type === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-200"
                : "border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-400/20 dark:bg-rose-400/10 dark:text-rose-200"
          }`}
        >
          {status.type === "sending" ? (
            <LoaderCircle
              className="mt-0.5 h-5 w-5 shrink-0 animate-spin"
              aria-hidden="true"
            />
          ) : status.type === "success" ? (
            <CheckCircle2
              className="mt-0.5 h-5 w-5 shrink-0"
              aria-hidden="true"
            />
          ) : (
            <AlertCircle
              className="mt-0.5 h-5 w-5 shrink-0"
              aria-hidden="true"
            />
          )}

          <p>{status.message}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSending}
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white shadow-lg shadow-teal-900/10 transition hover:bg-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-teal-500 dark:text-slate-950 dark:hover:bg-teal-400 dark:focus-visible:ring-teal-400 dark:focus-visible:ring-offset-slate-900 sm:w-auto"
      >
        {isSending ? (
          <>
            <LoaderCircle
              className="h-5 w-5 animate-spin"
              aria-hidden="true"
            />
            Sending enquiry...
          </>
        ) : (
          <>
            Send enquiry
            <Send className="h-4 w-4" aria-hidden="true" />
          </>
        )}
      </button>

      <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
        Fields marked with * are required. Please do not submit passwords,
        OTPs, or banking credentials.
      </p>
    </form>
  );
}
