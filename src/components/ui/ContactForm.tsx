"use client";
import { useState, type FormEvent } from "react";
import { useApp } from "@/contexts/AppContext";
import { Tr } from "@/components/ui/Tr";
const placeholders = {
  pt: { name: "Seu nome", email: "seuemail@empresa.com", organization: "Nome da organização", country: "Seu país", message: "Conte brevemente como podemos conversar." },
  en: { name: "Your name", email: "you@company.com", organization: "Organization name", country: "Your country", message: "Tell us briefly how we can connect." },
};
export function ContactForm() {
  const { locale } = useApp();
  const [draft, setDraft] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const en = locale === "en";
    const interest = form.querySelector<HTMLSelectElement>("#interest")?.selectedOptions[0]?.textContent ?? "";
    const lines = [
      `${en ? "Name" : "Nome"}: ${data.get("name") ?? ""}`,
      `${en ? "Email" : "E-mail"}: ${data.get("email") ?? ""}`,
      `${en ? "Company or organization" : "Empresa ou organização"}: ${data.get("organization") || "-"}`,
      `${en ? "Country" : "País"}: ${data.get("country") || "-"}`,
      `${en ? "Interested in" : "Tenho interesse em"}: ${interest}`,
      "", `${en ? "Message" : "Mensagem"}:`, String(data.get("message") || "-")
    ];
    const subject = en ? "Inquiry via the CLER website" : "Contato pelo site CLER";
    const mailto = `mailto:contatocler.app@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\r\n"))}`;
    setDraft(true);
    window.location.href = mailto;
  }
  return <form id="contact-form" onSubmit={submit} onChange={() => setDraft(false)}>
    <div>
      <label htmlFor="name"><Tr id="m138" /></label>
      <input id="name" name="name" autoComplete="name" required placeholder={placeholders[locale].name} />
    </div>
    <div>
      <label htmlFor="email"><Tr id="m139" /></label>
      <input id="email" name="email" type="email" autoComplete="email" required placeholder={placeholders[locale].email} />
    </div>
    <div>
      <label htmlFor="org"><Tr id="m140" /></label>
      <input id="org" name="organization" autoComplete="organization" placeholder={placeholders[locale].organization} />
    </div>
    <div>
      <label htmlFor="country"><Tr id="m141" /></label>
      <input id="country" name="country" autoComplete="country-name" placeholder={placeholders[locale].country} />
    </div>
    <div className="full">
      <label htmlFor="interest"><Tr id="m142" /></label>
      <select id="interest" name="interest">
        {(["m143", "m144", "m145", "m146", "m147", "m148"] as const).map(id => <option key={id} value={id}><Tr id={id} /></option>)}
      </select>
    </div>
    <div className="full">
      <label htmlFor="message"><Tr id="m149" /></label>
      <textarea id="message" name="message" placeholder={placeholders[locale].message} />
    </div>
    <div className="form-actions">
      <button type="submit" className="btn ghost">
        <Tr id="m150" />
      </button>
      <span id="form-status" className="form-status" role="status" aria-live="polite" aria-atomic="true">
        {draft ? locale === "pt"
          ? "O rascunho foi preparado no seu aplicativo de e-mail (se configurado). Confira e envie a mensagem; o envio não é automático."
          : "An email draft was prepared in your email app (if configured). Review and send it; it is not sent automatically." : ""}
      </span>
    </div>
  </form>;
}
