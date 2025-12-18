"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";

const artwork = [
  { id: 1, image: "/draw.jpg", title: "Seaweed Salad", price: 20 },
  { id: 2, image: "/flower.jpg", title: "Red flowers", price: 20 },
  { id: 3, image: "/pear.jpg", title: "Friends", price: 20 },
  { id: 4, image: "/scribble.jpg", title: "Lady", price: 20 },
  { id: 5, image: "/squash.jpg", title: "Squash", price: 20 },
  { id: 6, image: "/unknown.jpg", title: "Pots n Pans", price: 20 },
];

function PayPageContent() {
  const searchParams = useSearchParams();
  const artworkId = searchParams.get("artwork");
  const [selectedArtwork, setSelectedArtwork] = useState<typeof artwork[0] | null>(null);

  // Venmo username from environment variable
  const VENMO_USERNAME = process.env.NEXT_PUBLIC_VENMO_USERNAME;
  
  if (!VENMO_USERNAME) {
    console.error('Venmo username not configured');
  }

  useEffect(() => {
    if (artworkId) {
      const piece = artwork.find((a) => a.id === parseInt(artworkId));
      setSelectedArtwork(piece || null);
    }
  }, [artworkId]);

  const FRAMING_FEE = 20;
  const totalPrice = selectedArtwork ? selectedArtwork.price + FRAMING_FEE : 0;

  const handleVenmoPayment = () => {
    if (!selectedArtwork || !VENMO_USERNAME) {
      alert('Payment configuration error. Please contact the artist directly.');
      return;
    }

    const note = encodeURIComponent(`${selectedArtwork.title} - Artwork Purchase`);
    const amount = totalPrice;

    // Venmo deep link (opens Venmo app if installed)
    const venmoDeepLink = `venmo://paycharge?txn=pay&recipients=${VENMO_USERNAME}&amount=${amount}&note=${note}`;
    
    // Venmo.me web link (fallback)
    const venmoWebLink = `https://venmo.com/${VENMO_USERNAME}?txn=pay&amount=${amount}&note=${note}`;

    // Try deep link first, fallback to web
    window.location.href = venmoDeepLink;
    
    // Fallback after a short delay if deep link doesn't work
    setTimeout(() => {
      window.open(venmoWebLink, "_blank");
    }, 500);
  };

  if (!selectedArtwork) {
    return (
      <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-cormorant text-4xl mb-4">Artwork not found</h1>
          <Link href="/work" className="font-cormorant text-2xl text-pink-200 hover:underline">
            Return to Gallery
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <div className="flex justify-center my-8">
        <Link href="/" className="font-bold text-pink-200 text-6xl mr-20 font-bodoni hover:opacity-80 transition-opacity">
          Eloise Glasscoe
        </Link>
        <Link href="/" className="text-3xl ml-10 font-bodoni hover:text-pink-200 transition-colors">Home</Link>
        <Link href="/work" className="text-3xl ml-10 font-bodoni hover:text-pink-200 transition-colors">My work</Link>
        <Link href="/upcoming-events" className="text-3xl ml-10 font-bodoni hover:text-pink-200 transition-colors">Upcoming events</Link>
        <Link href="/contact" className="text-3xl ml-10 font-bodoni hover:text-pink-200 transition-colors">Contact</Link>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-12">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="font-cormorant text-5xl font-bold mb-8 text-center">Complete Your Purchase</h1>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="relative h-96 w-full">
              <Image
                src={selectedArtwork.image}
                alt={selectedArtwork.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            
            <div className="flex flex-col justify-center">
              <h2 className="font-cormorant text-4xl font-bold mb-4">{selectedArtwork.title}</h2>
              
              <div className="mb-6 space-y-2">
                <div className="flex justify-between font-cormorant text-2xl">
                  <span>Artwork:</span>
                  <span>${selectedArtwork.price}</span>
                </div>
                <div className="flex justify-between font-cormorant text-2xl">
                  <span>Framing Fee:</span>
                  <span>${FRAMING_FEE}</span>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between font-cormorant text-3xl font-bold">
                  <span>Total:</span>
                  <span>${totalPrice}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <button
                  onClick={handleVenmoPayment}
                  className="w-full bg-[#3D95CE] text-white font-playfair font-bold py-4 px-6 rounded-lg hover:bg-[#2d7aad] transition-colors text-xl"
                >
                  Pay with Venmo
                </button>
                
                <p className="font-cormorant text-lg text-center text-gray-600 italic">
                  Please specify piece name and phone number in Venmo note. If you don't want the framing fee, just change the amount in Venmo.
                </p>
                
                <Link
                  href="/work"
                  className="block w-full bg-gray-200 text-gray-800 font-playfair font-bold py-4 px-6 rounded-lg hover:bg-gray-300 transition-colors text-center text-xl"
                >
                  Cancel
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t pt-6 mt-6">
            <p className="font-cormorant text-lg text-center text-gray-600">
              After payment, you'll receive a confirmation email with shipping details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PayPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black flex items-center justify-center">
        <div className="font-cormorant text-4xl">Loading...</div>
      </div>
    }>
      <PayPageContent />
    </Suspense>
  );
}

