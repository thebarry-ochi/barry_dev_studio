import { createHash } from "node:crypto";
import { validateContact } from "@/lib/contact-validation";
export const runtime = "nodejs";
const attempts = new Map<string, {count:number; until:number}>();
const reply = (message:string, status:number) => Response.json({message},{status,headers:{"Cache-Control":"no-store"}});
export async function POST(request: Request) {
 const origin=request.headers.get("origin");
 const requestUrl=new URL(request.url);
 const forwardedHost=request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
 const expectedHost=request.headers.get("host")||forwardedHost||requestUrl.host;
 const forwardedProtocol=request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
 const expectedProtocol=forwardedProtocol?`${forwardedProtocol}:`:requestUrl.protocol;
 try { const parsed=origin?new URL(origin):undefined; if(!parsed||parsed.host!==expectedHost||parsed.protocol!==expectedProtocol||!(["http:","https:"].includes(parsed.protocol))) throw new Error(); }
 catch { return reply("This request could not be verified. Please reload the page.",403); }
 if (!request.headers.get("content-type")?.startsWith("application/json")) return reply("Unsupported request format.",415);
 if (Number(request.headers.get("content-length")) > 16384) return reply("Your message is too long.",413);
 const reader=request.body?.getReader();
 if (!reader) return reply("Please complete the form.",400);
 let size=0; const chunks:Uint8Array[]=[];
 try { while(true) { const {done,value}=await reader.read(); if(done) break; size+=value.byteLength; if(size>16384){await reader.cancel();return reply("Your message is too long.",413);} chunks.push(value); } } catch { return reply("Could not read the message. Please try again.",400); }
 let input:unknown;
 try { input=JSON.parse(Buffer.concat(chunks).toString("utf8")); } catch { return reply("Please check your form details.",400); }
 const {values,error}=validateContact(input);
 if (!values) return reply(error ?? "Please check your form details.",400);
 if (values.nickname) return reply("This request could not be accepted.",400);
 const endpoint=process.env.CONTACT_DELIVERY_URL;
 const token=process.env.CONTACT_DELIVERY_TOKEN;
 if (!endpoint || !token) return reply("Sending is not connected yet. Your message has not been sent. Please check back when the site launches.",503);
 let delivery:URL;
 try { delivery=new URL(endpoint); if(delivery.protocol!=="https:" || delivery.username || delivery.password) throw new Error(); } catch { return reply("Sending is currently unavailable. Your message has not been sent.",503); }
 // Bounded, best-effort per-instance throttle. Add a durable edge limiter when deploying.
 const now=Date.now(); for(const [key,entry] of attempts) if(entry.until<now) attempts.delete(key);
 const key=createHash("sha256").update(values.email.toLowerCase()).digest("hex");
 const previous=attempts.get(key);
 if(previous && previous.count>=3) return reply("Please wait a few minutes before sending another message.",429);
 if(attempts.size>=1000 && !previous) return reply("Please try again shortly.",429);
 attempts.set(key,{count:(previous?.count??0)+1,until:previous?.until??now+600000});
 try {
  const result=await fetch(delivery,{method:"POST",redirect:"error",signal:AbortSignal.timeout(10000),headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`},body:JSON.stringify({name:values.name,company:values.company,website:values.website,email:values.email,message:values.message})});
  if(!result.ok) throw new Error("Delivery failed");
  return reply("Thank you. Your message has been received. I’ll be in touch soon.",200);
 } catch { return reply("Your message could not be sent. Please try again later.",502); }
}
