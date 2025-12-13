"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const artwork = [
  { id: 1, image: "/ada.jpg", title: "Untitled", price: 20 },
  { id: 2, image: "/draw.jpg", title: "Untitled", price: 20 },
  { id: 3, image: "/flower.jpg", title: "Untitled", price: 20 },
  { id: 4, image: "/paint.jpg", title: "Untitled", price: 20 },
  { id: 5, image: "/pear.jpg", title: "Untitled", price: 20 },
  { id: 6, image: "/pen.jpg", title: "Untitled", price: 20 },
  { id: 7, image: "/scribble.jpg", title: "Untitled", price: 20 },
  { id: 8, image: "/shad.jpg", title: "Untitled", price: 20 },
  { id: 9, image: "/squash.jpg", title: "Untitled", price: 20 },
  { id: 10, image: "/unknown.jpg", title: "Untitled", price: 20 },
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
      <div className="flex justify-center my-8">
        <Link href="/" className="font-bold text-pink-200 text-6xl mr-20 font-bodoni hover:opacity-80 transition-opacity">Eloise Glasscoe</Link>
        <Link href="/" className="text-3xl ml-10 font-bodoni hover:text-pink-200 transition-colors">Home</Link>
        <div className="text-3xl ml-10 font-bodoni text-pink-200">My work</div>
        <Link href="/upcoming-events" className="text-3xl ml-10 font-bodoni hover:text-pink-200 transition-colors">Upcoming events</Link>
        <Link href="/contact" className="text-3xl ml-10 font-bodoni hover:text-pink-200 transition-colors">Contact</Link>
      </div>
      
      <div className="h-12"></div>
      <div className="text-center p-4 text-5xl font-cormorant pb-8">Some of my work!</div>
     
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 pb-20">
        {artwork.map((piece) => (
          <div key={piece.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div 
              className="relative h-64 w-full cursor-pointer"
              onClick={() => openFullscreen(piece.image)}
            >
              <Image
                src={piece.image}
                alt={piece.title}
                fill
                className="object-cover hover:opacity-90 transition-opacity"
              />
            </div>
            <div className="p-4">
              <h3 className="font-cormorant text-2xl font-bold mb-2">{piece.title}</h3>
              <p className="font-cormorant text-xl mb-4">${piece.price}</p>
              <Link
                href={`/pay?artwork=${piece.id}`}
                className="block w-full bg-[var(--mauveDeep)] text-white font-playfair font-bold py-2 px-4 rounded-lg hover:bg-[var(--burgundyDark)] transition-colors text-center"
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
            className="absolute top-4 right-4 text-white text-4xl hover:text-pink-200 transition-colors z-10"
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
    </div>
  );
}
