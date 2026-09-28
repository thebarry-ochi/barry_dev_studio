"use client";
import { useState, useRef, type FormEvent } from "react";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { validateContact } from "@/lib/contact-validation";
export function ContactForm() {
 const [message,setMessage]=useState("");
 const [busy,setBusy]=useState(false);
 const pending=useRef(false);
 async function handleSubmit(event:FormEvent<HTMLFormElement>) {
  event.preventDefault(); if(pending.current) return;
  const form=event.currentTarget;
  const input=Object.fromEntries(new FormData(form));
  const {values,error}=validateContact(input);
  if(!values){setMessage(error??"Please check your details.");return;}
  pending.current=true;setBusy(true);setMessage("");
  try { const response=await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(values)}); const result=await response.json(); setMessage(result.message); if(response.ok) form.reset(); }
  catch {setMessage("Your message could not be sent. Please check your connection and try again.");}
  finally {pending.current=false;setBusy(false);}
 }
 return <form className="contact-form" onSubmit={handleSubmit} aria-describedby="form-preview-note" aria-busy={busy}>
 <div className="form-field"><label htmlFor="contact-name">Name</label><input id="contact-name" name="name" autoComplete="name" required minLength={2} maxLength={120} placeholder="Your name"/></div>
 <div className="form-field"><label htmlFor="contact-company">Company name</label><input id="contact-company" name="company" autoComplete="organization" maxLength={160} placeholder="Your company name"/></div>
 <div className="form-field"><label htmlFor="contact-website">Website URL</label><input id="contact-website" name="website" autoComplete="url" type="url" maxLength={500} placeholder="https://example.com"/></div>
 <div className="form-field"><label htmlFor="contact-email">Email</label><input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@company.com"/></div>
 <div className="form-field"><label htmlFor="contact-message">Tell me about your website</label><textarea id="contact-message" name="message" required minLength={10} maxLength={3000} rows={2} placeholder="What are your goals? Any specific challenges?"/></div>
 <div className="form-trap" aria-hidden="true"><label htmlFor="contact-nickname">Leave this blank</label><input id="contact-nickname" name="nickname" autoComplete="off" tabIndex={-1} maxLength={120}/></div>
 <div className="form-bottom"><button type="submit" className="button" disabled={busy}>{busy?"Sending…":"Send message"}<ArrowRightIcon size={21} aria-hidden="true"/></button><p id="form-preview-note">Delivery will be enabled before launch. Required: name, email and message.</p></div>
 <p className="form-status" role="status" aria-live="polite">{message}</p></form>;
}
