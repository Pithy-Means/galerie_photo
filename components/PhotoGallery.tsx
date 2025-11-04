"use client";

import React, { useEffect, useRef, useState } from 'react';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

type GsapLike = {
  fromTo: (targets: unknown, fromVars: unknown, toVars: unknown) => unknown;
  to: (targets: unknown, vars: unknown) => unknown;
  from?: (targets: unknown, vars: unknown) => unknown;
};

declare global {
  interface Window {
    gsap?: GsapLike;
  }
}

const PhotoGallery = () => {
  interface ImageItem {
    id: number;
    url: string;
    title: string;
    category: string;
    span: string;
  }

  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const images: ImageItem[] = [
    {
      id: 1, url: '/DSC_5606.jpg',
      title: 'His Mighty Mountains', category: 'Creation', span: 'row-span-2'
    },
    {
      id: 2, url: '/DSC_5660.jpg',
      title: 'City of Refuge', category: 'Urban Life', span: 'col-span-2'
    },
    {
      id: 3, url: '/DSC_5584.jpg',
      title: 'Paths of Righteousness', category: 'Creation', span: ''
    },
    {
      id: 4, url: '/DSC_5588.jpg',
      title: 'Day Breaking Forth', category: 'Creation', span: ''
    },
    {
      id: 5, url: '/DSC_5559.jpg',
      title: 'Wilderness Journey', category: 'Landscape', span: 'col-span-2 row-span-2'
    },
    {
      id: 6, url: '/DSC_5592.jpg',
      title: 'Still Waters', category: 'Creation', span: ''
    },
    {
      id: 7, url: '/DSC_5597.jpg',
      title: 'Valley of Vision', category: 'Landscape', span: 'row-span-2'
    },
    {
      id: 8, url: '/DSC_5555.jpg',
      title: 'Waves of Mercy', category: 'Creation', span: ''
    },
    {
      id: 9, url: '/DSC_5633.jpg',
      title: 'Heavens Declare', category: 'Heavens', span: 'col-span-2'
    },
    {
      id: 10, url: '/DSC_5642.jpg',
      title: 'Gates of the City', category: 'Urban Life', span: ''
    },
    {
      id: 11, url: '/DSC_5645.jpg',
      title: 'Mountain of the Lord', category: 'Creation', span: ''
    },
    {
      id: 12, url: '/DSC_5650.jpg',
      title: 'Land of Promise', category: 'Creation', span: 'col-span-2 row-span-2'
    },
    {
      id: 13, url: '/DSC_5655.jpg',
      title: 'Seasons of Change', category: 'Creation', span: ''
    },
    {
      id: 14, url: '/DSC_5579.jpg',
      title: 'Firmament Above', category: 'Heavens', span: ''
    },
    {
      id: 15, url: '/DSC_6231.jpg',
      title: 'Streets of Jerusalem', category: 'Urban Life', span: 'row-span-2'
    },
    {
      id: 16, url: '/DSC_6278.jpg',
      title: 'Hills of Heritage', category: 'Landscape', span: ''
    },
    {
      id: 17, url: '/DSC_6233.jpg',
      title: 'Garden of Eden', category: 'Creation', span: 'col-span-2 row-span-2'
    },
    {
      id: 18, url: '/DSC_6237.jpg',
      title: 'Field of Blessings', category: 'Creation', span: ''
    },
    {
      id: 19, url: '/DSC_6239.jpg',
      title: 'Rock of Ages', category: 'Creation', span: ''
    },
    {
      id: 20, url: '/DSC_6266.jpg',
      title: 'Place of Rest', category: 'Urban Life', span: ''
    },
    {
      id: 21, url: '/DSC_6197.jpg',
      title: 'Cloud of Glory', category: 'Creation', span: 'col-span-2 row-span-2'
    },
    {
      id: 22, url: '/DSC_6201.jpg',
      title: 'Sunrise Serenity', category: 'Creation', span: ''
    },
    {
      id: 23, url: '/DSC_6203.jpg',
      title: 'Twilight Tranquility', category: 'Creation', span: ''
    },
    {
      id: 24, url: '/DSC_6187.jpg',
      title: 'Dawn of Hope', category: 'Creation', span: 'col-span-2'
    },
    {
      id: 25, url: '/DSC_6203.jpg',
      title: 'Evening Embrace', category: 'Creation', span: ''
    },
    {
      id: 26, url: '/DSC_6158.jpg',
      title: 'Majestic Peaks', category: 'Landscape', span: 'row-span-2'
    },
    {
      id: 27, url: '/DSC_6207.jpg',
      title: 'River of Life', category: 'Creation', span: ''
    },
    {
      id: 28, url: '/DSC_6176.jpg',
      title: 'Valley of Dreams', category: 'Landscape', span: ''
    },
    {
      id: 29, url: '/DSC_6178.jpg',
      title: 'Canyon of Wonders', category: 'Landscape', span: ''
    },
    {
      id: 30, url: '/DSC_6174.jpg',
      title: 'Ocean of Tranquility', category: 'Creation', span: ''
    },
    {
      id: 31, url: '/DSC_6163.jpg',
      title: 'Forest of Whispers', category: 'Creation', span: 'col-span-2 row-span-2'
    },
    {
      id: 32, url: '/DSC_6167.jpg',
      title: 'Meadow of Light', category: 'Creation', span: ''
    },
    {
      id: 33, url: '/DSC_6181.jpg',
      title: 'Desert of Solitude', category: 'Landscape', span: ''
    },
    {
      id: 34, url: '/DSC_6183.jpg',
      title: 'Island of Peace', category: 'Creation', span: ''
    },
    {
      id: 35, url: '/DSC_6191.jpg',
      title: 'Glacier of Time', category: 'Landscape', span: 'col-span-2'
    },
    {
      id: 36, url: '/DSC_6108.jpg',
      title: 'Harbor of Hope', category: 'Urban Life', span: 'row-span-2'
    },
    {
      id: 37, url: '/DSC_6124.jpg',
      title: 'Bridge to Eternity', category: 'Urban Life', span: ''
    },
    {
      id: 38, url: '/DSC_6139.jpg',
      title: 'Cave of Wonders', category: 'Landscape', span: ''
    },
    {
      id: 39, url: '/DSC_6142.jpg',
      title: 'Cliff of Faith', category: 'Landscape', span: ''
    },
    {
      id: 40, url: '/DSC_6146.jpg',
      title: 'Prairie of Dreams', category: 'Creation', span: 'row-span-2'
    },
    {
      id: 41, url: '/DSC_6099.jpg',
      title: 'Bay of Tranquility', category: 'Creation', span: 'col-span-2 row-span-2'
    },
    {
      id: 42, url: '/DSC_5645.jpg',
      title: 'Harbor Lights', category: 'Urban Life', span: ''
    },
    {
      id: 43, url: '/DSC_6104.jpg',
      title: 'Sunset Boulevard', category: 'Urban Life', span: ''
    },
    {
      id: 44, url: '/DSC_5693.jpg',
      title: 'Mountain Majesty', category: 'Landscape', span: 'col-span-2 row-span-2'
    },
    {
      id: 45, url: '/DSC_5680.jpg',
      title: 'River Reflections', category: 'Creation', span: ''
    },
    {
      id: 46, url: '/DSC_5666.jpg',
      title: 'City Lights', category: 'Urban Life', span: ''
    }
  ];

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
    script.async = true;
    script.onload = () => {
      setIsLoaded(true);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!isLoaded || !window.gsap) return;

    const gsap = window.gsap;

    gsap.fromTo(
      itemRefs.current,
      {
        opacity: 0,
        y: 60,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        clearProps: 'all'
      }
    );

    itemRefs.current.forEach((item) => {
      if (!item) return;

      const overlay = item.querySelector('.overlay');
      const img = item.querySelector('img');
      const content = item.querySelector('.content');

      item.addEventListener('mouseenter', () => {
        gsap.to(img, {
          scale: 1.05,
          duration: 0.7,
          ease: 'power2.out'
        });
        gsap.to(overlay, {
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out'
        });
        gsap.to(content, {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out'
        });
      });

      item.addEventListener('mouseleave', () => {
        gsap.to(img, {
          scale: 1,
          duration: 0.7,
          ease: 'power2.out'
        });
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.4,
          ease: 'power2.out'
        });
        gsap.to(content, {
          y: 20,
          opacity: 0,
          duration: 0.4,
          ease: 'power2.out'
        });
      });
    });
  }, [isLoaded]);

  useEffect(() => {
    if (!isLoaded || !window.gsap || !selectedImage) return;

    const gsap = window.gsap;
    const modal = modalRef.current;

    if (!modal) return;

    gsap.fromTo(
      modal,
      {
        opacity: 0,
        scale: 0.8
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.35,
        ease: 'power3.out'
      }
    );

    const img = modal.querySelector('img');
    if (!img) return;
    gsap.fromTo(
      img,
      {
        scale: 0.9,
        opacity: 0
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        delay: 0.1,
        ease: 'power2.out'
      }
    );
  }, [selectedImage, isLoaded]);

  const handleImageClick = (image: ImageItem) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    if (!window.gsap) {
      setSelectedImage(null);
      return;
    }

    const gsap = window.gsap;
    const modal = modalRef.current;

    gsap.to(modal, {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => setSelectedImage(null)
    });
  };

  const navigateImage = (direction: 'next' | 'prev') => {
    if (!selectedImage) return;

    const currentIndex = images.findIndex(img => img.id === selectedImage.id);
    const newIndex = direction === 'next'
      ? (currentIndex + 1) % images.length
      : (currentIndex - 1 + images.length) % images.length;

    if (!window.gsap) {
      setSelectedImage(images[newIndex]);
      return;
    }

    const gsap = window.gsap;
    const img = modalRef.current?.querySelector('img');

    if (!img) {
      setSelectedImage(images[newIndex]);
      return;
    }

    gsap.to(img, {
      x: direction === 'next' ? -100 : 100,
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        setSelectedImage(images[newIndex]);
        gsap.fromTo(
          img,
          {
            x: direction === 'next' ? 100 : -100, opacity: 0
          },
          {
            x: 0, opacity: 1, duration: 0.3, ease: 'power2.out'
          }
        );
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-16 max-w-3xl">
          <div className="inline-block px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
            <span className="text-blue-400 text-sm font-medium tracking-wide">PORTFOLIO 2024</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
            Visual Stories
          </h1>
          <p className="text-neutral-400 text-lg leading-relaxed">
            A curated collection of moments captured through the lens,
            showcasing the beauty of our world from unique perspectives.
          </p>
        </div>

        {/* Masonry Grid */}
        <div
          ref={galleryRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[240px] gap-4"
        >
          {images.map((image, index) => (
            <div
              key={image.id}
              ref={el => {
                itemRefs.current[index] = el;
              }}
              className={`relative group cursor-pointer rounded-xl overflow-hidden shadow-xl ${image.span} bg-neutral-900`}
              onClick={() => handleImageClick(image)}
            >
              <Image
                src={image.url}
                alt={image.title}
                fill
                className="object-cover transition-transform duration-700"
              />

              {/* Overlay */}
              <div className="overlay absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 transition-opacity duration-400">
                <div className="content absolute bottom-0 left-0 right-0 p-6 opacity-0 translate-y-5">
                  <span className="inline-block px-2.5 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium rounded-md mb-3 tracking-wide">
                    {image.category}
                  </span>
                  <h3 className="text-white text-xl md:text-2xl font-semibold mb-2 tracking-tight">
                    {image.title}
                  </h3>
                  <div className="flex items-center text-neutral-300">
                    <ZoomIn className="w-4 h-4 mr-2" />
                    <span className="text-sm">View full size</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/97 p-4 backdrop-blur-sm">
            <div ref={modalRef} className="relative max-w-7xl w-full">
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute -top-16 right-0 text-white/80 hover:text-white transition-colors duration-200 z-10 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-full p-3"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={() => navigateImage('prev')}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors duration-200 bg-white/5 hover:bg-white/10 rounded-full p-4 backdrop-blur-md z-10 border border-white/10"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => navigateImage('next')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors duration-200 bg-white/5 hover:bg-white/10 rounded-full p-4 backdrop-blur-md z-10 border border-white/10"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image */}
              <div className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <div className="relative w-full h-[70vh]">
                  <Image
                    src={selectedImage.url}
                    alt={selectedImage.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="p-8 bg-gradient-to-t from-neutral-900 to-neutral-900/80 backdrop-blur-sm">
                  <span className="inline-block px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium rounded-lg mb-4 tracking-wide">
                    {selectedImage.category}
                  </span>
                  <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight">
                    {selectedImage.title}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoGallery;