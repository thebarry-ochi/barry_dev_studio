"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRightIcon } from "@phosphor-icons/react";

export function ContactForm() {
  const [message, setMessage] = useState("");
  function showPreview(form: HTMLFormElement) {
    if (!form.reportValidity()) return;
    setMessage("This form is a preview. Your message has not been sent. Enquiries will be available when the site launches.");
  }
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    showPreview(event.currentTarget);
  }
  return (
    <form className="contact-form" onSubmit={handleSubmit} aria-describedby="form-preview-note">
      <div className="form-row">
        <div className="form-field"><label htmlFor="contact-name">Name <span aria-hidden="true">*</span></label><input id="contact-name" name="name" autoComplete="name" required placeholder="Your name" maxLength={120} /></div>
        <div className="form-field"><label htmlFor="contact-company">Company name</label><input id="contact-company" name="company" autoComplete="organization" placeholder="Your business" maxLength={160} /></div>
      </div>
      <div className="form-row">
        <div className="form-field"><label htmlFor="contact-website">Website URL</label><input id="contact-website" name="website" type="url" autoComplete="url" placeholder="https://yourwebsite.com" maxLength={500} /></div>
        <div className="form-field"><label htmlFor="contact-email">Email <span aria-hidden="true">*</span></label><input id="contact-email" name="email" type="email" autoComplete="email" required placeholder="you@company.com" maxLength={254} /></div>
      </div>
      <div className="form-field"><label htmlFor="contact-message">What would you like to improve?</label><textarea id="contact-message" name="message" rows={3} placeholder="Tell me a little about your website and goals." maxLength={3000} /></div>
      <div className="form-bottom"><button type="button" className="button button-light" onClick={(event) => { if (event.currentTarget.form) showPreview(event.currentTarget.form); }}>Send Message <ArrowUpRightIcon size={18} aria-hidden="true" /></button><p id="form-preview-note">Preview only. Messages are not sent.</p></div>
      <p className="form-status" role="status">{message}</p>
    </form>
  );
}
