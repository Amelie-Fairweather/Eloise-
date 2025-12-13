import Link from "next/link";

export default function UpcomingEvents() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <div className="flex justify-center my-8">
        <Link href="/" className="font-bold text-pink-200 text-6xl mr-20 font-bodoni hover:opacity-80 transition-opacity">Eloise Glasscoe</Link>
        <Link href="/" className="text-3xl ml-10 font-bodoni hover:text-pink-200 transition-colors">Home</Link>
        <Link href="/work" className="text-3xl ml-10 font-bodoni hover:text-pink-200 transition-colors">My work</Link>
        <div className="text-3xl ml-10 font-bodoni text-pink-200">Upcoming events</div>
        <Link href="/contact" className="text-3xl ml-10 font-bodoni hover:text-pink-200 transition-colors">Contact</Link>
      </div>
      
      <div className="h-20"></div>
      <div className="text-center p-4 text-5xl font-cormorant pb-20">
        Upcoming Events
      </div>
      
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center font-cormorant text-2xl">
          Check back soon for upcoming events and exhibitions!
        </div>
      </div>
    </div>
  );
}

