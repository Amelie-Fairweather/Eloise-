"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const artwork = [
  { id: 1, image: "/draw.jpg", title: "Seaweed Salad", price: 20 },
  { id: 2, image: "/flower.jpg", title: "Red flowers", price: 20 },
  { id: 3, image: "/pear.jpg", title: "Friends", price: 20 },
  { id: 4, image: "/scribble.jpg", title: "Lady", price: 20 },
  { id: 5, image: "/squash.jpg", title: "Squash", price: 20 },
  { id: 6, image: "/unknown.jpg", title: "Pots n Pans", price: 20 },
];

export default function Work() {
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const openFullscreen = (imageSrc: string) => {
    setFullscreenImage(imageSrc);
    document.body.style.overflow = 'hidden';
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      {/* Navigation - responsive for mobile */}
      <div className="flex flex-col md:flex-row items-center justify-center my-4 md:my-8 gap-2 md:gap-0 px-4">
        <Link href="/" className="font-bold text-pink-200 text-3xl md:text-6xl md:mr-20 font-bodoni hover:opacity-80 transition-opacity text-center md:text-left">Eloise Glasscoe</Link>
        <div className="flex flex-wrap justify-center gap-3 md:gap-0 md:ml-10">
          <Link href="/" className="text-lg md:text-3xl font-bodoni hover:text-pink-200 transition-colors md:ml-10">Home</Link>
          <div className="text-lg md:text-3xl font-bodoni text-pink-200 md:ml-10">My work</div>
          <Link href="/upcoming-events" className="text-lg md:text-3xl font-bodoni hover:text-pink-200 transition-colors md:ml-10">Upcoming events</Link>
          <Link href="/contact" className="text-lg md:text-3xl font-bodoni hover:text-pink-200 transition-colors md:ml-10">Contact</Link>
        </div>
      </div>
      
      <div className="h-6 md:h-12"></div>
      <div className="text-center p-4 text-3xl md:text-5xl font-cormorant pb-6 md:pb-8">Some of my work!</div>
     
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4 md:px-8 pb-12 md:pb-20">
        {artwork.map((piece) => (
          <div key={piece.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div 
              className="relative h-48 md:h-64 w-full cursor-pointer"
              onClick={() => openFullscreen(piece.image)}
            >
              <Image
                src={piece.image}
                alt={piece.title}
                fill
                className="object-cover hover:opacity-90 transition-opacity"
              />
            </div>
            <div className="p-3 md:p-4">
              <h3 className="font-cormorant text-xl md:text-2xl font-bold mb-2">{piece.title}</h3>
              <p className="font-cormorant text-lg md:text-xl mb-3 md:mb-4">${piece.price}</p>
              <Link
                href={`/pay?artwork=${piece.id}`}
                className="block w-full bg-[var(--mauveDeep)] text-white font-playfair font-bold py-2 px-4 rounded-lg hover:bg-[var(--burgundyDark)] transition-colors text-center text-sm md:text-base"
              >
                Pay Now
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Modal */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center p-4"
          onClick={closeFullscreen}
        >
          <button
            onClick={closeFullscreen}
            className="absolute top-2 right-2 md:top-4 md:right-4 text-white text-3xl md:text-4xl hover:text-pink-200 transition-colors z-10 p-2"
            aria-label="Close"
          >
            ×
          </button>
          <div className="relative max-w-full max-h-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={fullscreenImage}
              alt="Fullscreen artwork"
              width={1200}
              height={1200}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              unoptimized
            />
          </div>
        </div>
      )}
       <div className="text-sm md:text-lg font-cormorant text-center pb-6 md:pb-10 pt-6 md:pt-10 px-4">Website by Amelie Fairweather (afairweather.org) </div>
    </div>
  );
}
