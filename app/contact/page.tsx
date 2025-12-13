"use client";
import Link from "next/link";

export default function Contact() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <div className="flex justify-center my-8">
        <Link href="/" className="font-bold text-pink-200 text-6xl mr-20 font-bodoni hover:opacity-80 transition-opacity">Eloise Glasscoe</Link>
        <Link href="/" className="text-3xl ml-10 font-bodoni hover:text-pink-200 transition-colors">Home</Link>
        <Link href="/work" className="text-3xl ml-10 font-bodoni hover:text-pink-200 transition-colors">My work</Link>
        <Link href="/upcoming-events" className="text-3xl ml-10 font-bodoni hover:text-pink-200 transition-colors">Upcoming events</Link>
        <div className="text-3xl ml-10 font-bodoni text-pink-200">Contact</div>
      </div>
      
      <div className="h-20"></div>
      
      {/* Stars and Hearts Decoration */}
      <div className="relative min-h-[600px] flex items-center justify-center">
        {/* Decorative stars - solid colored shapes */}
        <div className="absolute top-10 left-10 w-8 h-8 bg-pink-300 rounded-sm rotate-45 animate-pulse"></div>
        <div className="absolute top-20 right-20 w-6 h-6 bg-pink-200 rounded-sm rotate-45 animate-pulse delay-75"></div>
        <div className="absolute top-40 left-20 w-7 h-7 bg-pink-400 rounded-sm rotate-45 animate-pulse delay-150"></div>
        <div className="absolute top-60 right-10 w-8 h-8 bg-pink-300 rounded-sm rotate-45 animate-pulse delay-200"></div>
        <div className="absolute bottom-20 left-10 w-6 h-6 bg-pink-200 rounded-sm rotate-45 animate-pulse delay-300"></div>
        <div className="absolute bottom-40 right-20 w-8 h-8 bg-pink-400 rounded-sm rotate-45 animate-pulse delay-75"></div>
        
        {/* Decorative hearts - solid colored shapes */}
        <div className="absolute top-32 right-32 w-6 h-6 bg-rose-400 rounded-full animate-pulse delay-100"></div>
        <div className="absolute top-52 left-32 w-7 h-7 bg-rose-300 rounded-full animate-pulse delay-250"></div>
        <div className="absolute bottom-32 right-32 w-6 h-6 bg-rose-500 rounded-full animate-pulse delay-150"></div>
        <div className="absolute bottom-52 left-32 w-7 h-7 bg-rose-400 rounded-full animate-pulse delay-300"></div>
        
        {/* Email in center */}
        <div className="text-center z-10">
          <div className="font-cormorant text-5xl md:text-6xl font-bold text-[var(--mauveDeep)] mb-4">
            Contact Me
          </div>
          <a 
            href="mailto:eloiseglasscoe@cvsdvt.org" 
            className="font-cormorant text-3xl md:text-4xl text-[var(--burgundyDark)] hover:text-[var(--mauveDeep)] transition-colors underline decoration-2 underline-offset-4"
          >
            eloiseglasscoe@cvsdvt.org
          </a>
        </div>
      </div>
       <div className="text-lg font-cormorant text-center pb-10 pt-10">Website by Amelie Fairweather (afairweather.org) </div>
    </div>
  );
}

