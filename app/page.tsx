"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";

function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 md:px-6 py-6 md:py-10">
      <div className="bg-[var(--offWhite2)] rounded-lg shadow-lg p-4 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-[var(--mauveDeep)] font-playfair font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-4 py-2 rounded-lg border border-[var(--roseSoft)] focus:outline-none focus:ring-2 focus:ring-[var(--mauveDeep)] bg-white text-[var(--burgundyDark)]"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-[var(--mauveDeep)] font-playfair font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full px-4 py-2 rounded-lg border border-[var(--roseSoft)] focus:outline-none focus:ring-2 focus:ring-[var(--mauveDeep)] bg-white text-[var(--burgundyDark)]"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-[var(--mauveDeep)] font-playfair font-bold mb-2">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              className="w-full px-4 py-2 rounded-lg border border-[var(--roseSoft)] focus:outline-none focus:ring-2 focus:ring-[var(--mauveDeep)] bg-white text-[var(--burgundyDark)]"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-[var(--mauveDeep)] font-playfair font-bold mb-2">
              Brief description
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows={6}
              className="w-full px-4 py-2 rounded-lg border border-[var(--roseSoft)] focus:outline-none focus:ring-2 focus:ring-[var(--mauveDeep)] bg-white text-[var(--burgundyDark)] resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[var(--mauveDeep)] text-white font-playfair font-bold py-3 px-6 rounded-lg hover:bg-[var(--burgundyDark)] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Send Message'}
          </button>

          {submitStatus === 'success' && (
            <p className="text-green-600 text-center font-playfair">
              Thank you! Your message has been sent. Please look out for a message in the next 1-2 days!
            </p>
          )}

          {submitStatus === 'error' && (
            <p className="text-red-600 text-center font-playfair">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}



export default function Home() {

  
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <div className="flex items-center justify-center gap-4 p-4">
        
      </div>
      <div className="flex justify-center my-8 ">
        <Link href="/" className="font-bold text-pink-200 text-6xl mr-20 font-bodoni hover:opacity-80 transition-opacity">Eloise Glasscoe</Link>
        <Link href="/work" className="text-3xl ml-10 font-bodoni hover:text-pink-200 transition-colors">My work</Link>
        <Link href="/upcoming-events" className="text-3xl ml-10 font-bodoni hover:text-pink-200 transition-colors">Upcoming events</Link>
        <Link href="/contact" className="text-3xl ml-10 font-bodoni hover:text-pink-200 transition-colors">Contact</Link>
                {/* Background image */}
                </div>
                  <div className="h-5"></div> 
        <div className="relative flex justify-center my-5 -ml-150">
  {/* Image */}
  <Image 
    src="/girl.jpeg"
    alt="girl"
    width={550}
    height={450}
    className="rounded-lg shadow-md object-cover"
    style={{ objectPosition: 'center top' }}
  />

  {/* RIGHT SIDE — TEXT */}
           <div className="absolute right-1 top-1/2 -translate-y-1/2 w-[45%]">
    {/* Blocky pastel text */}
    <div className="space-y-3">
      <p className="bg-[#C8D7D1] font-cormorant text-3xl md:text-4xl font-semibold px-4 py-2 inline-block leading-tight">
       Welcome to my personal portfolio and website!
      </p>
      <p className="bg-[#C8D7D1] font-cormorant text-3xl md:text-4xl font-semibold px-4 py-2 inline-block leading-tight">
       Here I share my work, upcoming events and more!
      </p>
      <p className="bg-[#C8D7D1] font-cormorant text-3xl md:text-4xl font-semibold px-4 py-2 inline-block leading-tight">
        So excited to meet you!
      </p>
    </div>
    <div className="h-30"></div>
    </div>
    </div>
    <div className="h-20"></div>  
<div className="h-20"></div>
      <div className="text-center p-4 text-5xl font-cormorant pb-15">Some of my work!</div>
     
        <div className="flex items-center justify-center gap-4 p-4">


<div className="overflow-hidden whitespace-nowrap py-6 w-full relative">
  <div className="flex animate-scroll gap-6">
    <img src="/draw.jpg" alt="drawing" className="h-[400px] w-auto rounded-lg flex-shrink-0" />
    <img src="/paint.jpg" alt="painting" className="h-[400px] w-auto rounded-lg flex-shrink-0" />
    <img src="/shad.jpg" alt="shade" className="h-[400px] w-auto rounded-lg flex-shrink-0" />
    <img src="/pear.jpg" alt="drawing" className="h-[400px] w-auto rounded-lg flex-shrink-0" />
    <img src="/pen.jpg" alt="painting" className="h-[400px] w-auto rounded-lg flex-shrink-0" />
    <img src="/ada.jpg" alt="shade" className="h-[400px] w-auto rounded-lg flex-shrink-0" />
    <img src="/unknown.jpg" alt="drawing" className="h-[400px] w-auto rounded-lg flex-shrink-0" />
    <img src="/flower.jpg" alt="painting" className="h-[400px] w-auto rounded-lg flex-shrink-0" />
    <img src="/squash.jpg" alt="shade" className="h-[400px] w-auto rounded-lg flex-shrink-0" />
  </div>
 
</div>

  </div>
   
    <div className="h-30"></div>
    <div className="text-center bg-pink-100 opacity-70%" pb-10>
    
    <div className="font-bodoni text-black-100 pb-10 text-4xl font-bold pt-20 text-pink-300">A little about me...</div>
      <div className="relative flex justify-center items-center my-8 gap-8 px-8 mr-20 ">
        <div className="border-7 border-pink-200 rounded-2xl">
     <Image 
    src="/sib.jpeg"
    alt="sib"
    width={550}
    height={450}
    className="rounded-lg shadow-md object-cover flex-shrink-0 "
    style={{ objectPosition: 'center top' }}
  />
  </div>
    <div className="flex-1 max-w-2xl">
    <div className="font-cormorant text-lg md:text-4xl leading-tight space-y-3">

Hi! I'm someone who's always curious, creative, and eager to learn new things. I enjoy exploring different ideas, working on projects that challenge me, and finding ways to express myself through both technology and design. I'm motivated by growth, I love solving problems, and I'm always looking for opportunities to improve and try something new.

Outside of work and school, I like connecting with people, discovering new interests, and staying inspired by the world around me. I value authenticity, attention to detail, and putting genuine effort into everything I do.

I'm still growing and evolving, but I'm excited about where I'm headed and everything I'll learn along the way.

</div>
</div>
</div>
    <div className="h-30"></div>
     <div className="font-cormorant font-bold text-5xl pb-10 text-pink-300">Request a piece!</div>
    <div className="font-cormorant font-bold text-3xl text-pink-300">ORDER FORM</div>
    <ContactForm />
    </div>
    </div>
  );
}
