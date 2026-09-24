"use client";

import { useActionState } from "react";
import { sendContact } from "@/lib/action";
import type { ContactType } from "@/lib/schemas";
import type { ActionResponse } from "@/types";
import { cx } from "@/components/ui";

const initialState: ActionResponse<ContactType> = { submitted: false, success: false, message: "" };

const fieldClass =
  "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-[15px] text-white placeholder:text-white/35 outline-none transition focus:border-lime/60 focus:bg-white/[0.07]";
const labelClass = "mb-2 block text-[12.5px] font-semibold uppercase tracking-[0.08em] text-white/50";

function Field({ name, label, error, children }: { name: keyof ContactType; label: string; error?: string[]; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={name} className={labelClass}>{label}</label>
      {children}
      {error?.[0] && <p className="mt-1.5 text-[12.5px] text-yellow">{error[0]}</p>}
    </div>
  );
}

export function ContactForm() {
  const [state, action, pending] = useActionState(sendContact, initialState);

  if (state.submitted && state.success) {
    return (
      <div className="rounded-3xl border border-lime/30 bg-lime/10 p-8">
        <p className="font-display text-[24px] font-extrabold text-white">Díky, poptávka dorazila.</p>
        <p className="mt-2 text-[15px] text-white/70">Ozveme se do 24 hodin — přímo ten, kdo bude automatizaci stavět.</p>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-4" noValidate id="kontakt">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="fullname" label="Jméno" error={state.errors?.fullname}>
          <input id="fullname" name="fullname" autoComplete="name" defaultValue={state.inputs?.fullname} placeholder="Jan Novák" className={fieldClass} />
        </Field>
        <Field name="email" label="E-mail" error={state.errors?.email}>
          <input id="email" name="email" type="email" autoComplete="email" defaultValue={state.inputs?.email} placeholder="jan@firma.cz" className={fieldClass} />
        </Field>
      </div>
      <Field name="phone" label="Telefon" error={state.errors?.phone}>
        <input id="phone" name="phone" type="tel" autoComplete="tel" defaultValue={state.inputs?.phone} placeholder="+420 601 234 567" className={fieldClass} />
      </Field>
      <Field name="msg" label="Zpráva" error={state.errors?.msg}>
        <textarea id="msg" name="msg" rows={4} defaultValue={state.inputs?.msg} placeholder="Popište stručně, co byste chtěli automatizovat…" className={cx(fieldClass, "resize-none")} />
      </Field>

      {state.submitted && !state.success && state.message && (
        <p className="text-[13.5px] text-yellow">{state.message}</p>
      )}

      <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-lime px-7 py-4 text-[15px] font-semibold text-ink transition hover:bg-[#dbff5a] disabled:opacity-60"
        >
          {pending ? "Odesílám…" : "Odeslat poptávku"} <span aria-hidden>→</span>
        </button>
        <p className="text-[13px] text-white/45">
          Nebo nám napište rovnou na{" "}
          <a href="mailto:hello@automa.cz" className="text-white/70 underline-offset-4 hover:underline">hello@automa.cz</a>
        </p>
      </div>
    </form>
  );
}
