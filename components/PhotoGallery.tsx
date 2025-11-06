/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight, VolumeX, Volume2, Play, Pause } from 'lucide-react';
import Image from 'next/image';

type GsapLike = {
  fromTo: (targets: unknown, fromVars: unknown, toVars: unknown) => unknown;
  to: (targets: unknown, vars: unknown) => unknown;
  from?: (targets: unknown, vars: unknown) => unknown;
  set?: (targets: unknown, vars: unknown) => unknown | undefined;
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
    verse: string;
  }

  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCinemaMode, setIsCinemaMode] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showCinemaOverlay, setShowCinemaOverlay] = useState<boolean>(false);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const cinemaIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const cinemaImageRef = useRef<HTMLDivElement | null>(null);

  const images: ImageItem[] = [
    {
      id: 1, url: '/DSC_5606.jpg',
      title: 'His Mighty Mountains', category: 'Creation', span: 'row-span-2',
      verse: 'I thank my God every time I remember you. - Philippians 1:3'
    },
    {
      id: 2, url: '/DSC_5660.jpg',
      title: 'City of Refuge', category: 'Urban Life', span: 'col-span-2',
      verse: 'We always thank God for all of you. - 1 Thessalonians 1:2'
    },
    {
      id: 3, url: '/DSC_5584.jpg',
      title: 'Paths of Righteousness', category: 'Creation', span: '',
      verse: 'May the grace of the Lord Jesus Christ be with you all. - 2 Corinthians 13:14'
    },
    {
      id: 4, url: '/DSC_5588.jpg',
      title: 'Day Breaking Forth', category: 'Creation', span: '',
      verse: 'The Lord bless you and keep you. - Numbers 6:24'
    },
    {
      id: 5, url: '/DSC_5559.jpg',
      title: 'Wilderness Journey', category: 'Landscape', span: 'col-span-2 row-span-2',
      verse: 'How good and pleasant it is when God\'s people live together in unity! - Psalm 133:1'
    },
    {
      id: 6, url: '/DSC_5592.jpg',
      title: 'Still Waters', category: 'Creation', span: '',
      verse: 'I thank God for your partnership in the gospel. - Philippians 1:5'
    },
    {
      id: 7, url: '/DSC_5597.jpg',
      title: 'Valley of Vision', category: 'Landscape', span: 'row-span-2',
      verse: 'Give thanks to the Lord, for he is good. - Psalm 107:1'
    },
    {
      id: 8, url: '/DSC_5555.jpg',
      title: 'Waves of Mercy', category: 'Creation', span: '',
      verse: 'May the Lord make his face shine on you. - Numbers 6:25'
    },
    {
      id: 9, url: '/DSC_5633.jpg',
      title: 'Heavens Declare', category: 'Heavens', span: 'col-span-2',
      verse: 'I always thank my God for you because of his grace. - 1 Corinthians 1:4'
    },
    {
      id: 10, url: '/DSC_5642.jpg',
      title: 'Gates of the City', category: 'Urban Life', span: '',
      verse: 'Thanks be to God for his indescribable gift! - 2 Corinthians 9:15'
    },
    {
      id: 11, url: '/DSC_5645.jpg',
      title: 'Mountain of the Lord', category: 'Creation', span: '',
      verse: 'We ought always to thank God for you. - 2 Thessalonians 1:3'
    },
    {
      id: 12, url: '/DSC_5650.jpg',
      title: 'Land of Promise', category: 'Creation', span: 'col-span-2 row-span-2',
      verse: 'May the fellowship of the Holy Spirit be with you all. - 2 Corinthians 13:14'
    },
    {
      id: 13, url: '/DSC_5655.jpg',
      title: 'Seasons of Change', category: 'Creation', span: '',
      verse: 'Be devoted to one another in love. - Romans 12:10'
    },
    {
      id: 14, url: '/DSC_5579.jpg',
      title: 'Firmament Above', category: 'Heavens', span: '',
      verse: 'Grace and peace to you from God our Father. - Romans 1:7'
    },
    {
      id: 15, url: '/DSC_6231.jpg',
      title: 'Streets of Jerusalem', category: 'Urban Life', span: 'row-span-2',
      verse: 'I thank God whom I serve with a clear conscience. - 2 Timothy 1:3'
    },
    {
      id: 16, url: '/DSC_6278.jpg',
      title: 'Hills of Heritage', category: 'Landscape', span: '',
      verse: 'May the Lord turn his face toward you and give you peace. - Numbers 6:26'
    },
    {
      id: 17, url: '/DSC_6233.jpg',
      title: 'Garden of Eden', category: 'Creation', span: 'col-span-2 row-span-2',
      verse: 'Let us not give up meeting together, but encourage one another. - Hebrews 10:25'
    },
    {
      id: 18, url: '/DSC_6237.jpg',
      title: 'Field of Blessings', category: 'Creation', span: '',
      verse: 'Your love has given me great joy and encouragement. - Philemon 1:7'
    },
    {
      id: 19, url: '/DSC_6239.jpg',
      title: 'Rock of Ages', category: 'Creation', span: '',
      verse: 'I thank God for you because your faith is growing. - 2 Thessalonians 1:3'
    },
    {
      id: 20, url: '/DSC_6266.jpg',
      title: 'Place of Rest', category: 'Urban Life', span: '',
      verse: 'May God give you peace at all times and in every way. - 2 Thessalonians 3:16'
    },
    {
      id: 21, url: '/DSC_6197.jpg',
      title: 'Cloud of Glory', category: 'Creation', span: 'col-span-2 row-span-2',
      verse: 'I always pray with joy because of your partnership. - Philippians 1:4-5'
    },
    {
      id: 22, url: '/DSC_6201.jpg',
      title: 'Sunrise Serenity', category: 'Creation', span: '',
      verse: 'May you be filled with the fruit of righteousness. - Philippians 1:11'
    },
    {
      id: 23, url: '/DSC_6203.jpg',
      title: 'Twilight Tranquility', category: 'Creation', span: '',
      verse: 'May the God of hope fill you with all joy and peace. - Romans 15:13'
    },
    {
      id: 24, url: '/DSC_6187.jpg',
      title: 'Dawn of Hope', category: 'Creation', span: 'col-span-2',
      verse: 'I have not stopped giving thanks for you. - Ephesians 1:16'
    },
    {
      id: 25, url: '/DSC_6203.jpg',
      title: 'Evening Embrace', category: 'Creation', span: '',
      verse: 'May the peace of God guard your hearts and minds. - Philippians 4:7'
    },
    {
      id: 26, url: '/DSC_6158.jpg',
      title: 'Majestic Peaks', category: 'Landscape', span: 'row-span-2',
      verse: 'Your presence has refreshed my spirit. - 1 Corinthians 16:18'
    },
    {
      id: 27, url: '/DSC_6207.jpg',
      title: 'River of Life', category: 'Creation', span: '',
      verse: 'May you abound in hope by the power of the Holy Spirit. - Romans 15:13'
    },
    {
      id: 28, url: '/DSC_6176.jpg',
      title: 'Valley of Dreams', category: 'Landscape', span: '',
      verse: 'You are in my heart and I am grateful for you. - Philippians 1:7'
    },
    {
      id: 29, url: '/DSC_6178.jpg',
      title: 'Canyon of Wonders', category: 'Landscape', span: '',
      verse: 'May grace and peace be yours in abundance. - 1 Peter 1:2'
    },
    {
      id: 30, url: '/DSC_6174.jpg',
      title: 'Ocean of Tranquility', category: 'Creation', span: '',
      verse: 'I thank God for your obedience and faithfulness. - Romans 16:19'
    },
    {
      id: 31, url: '/DSC_6163.jpg',
      title: 'Forest of Whispers', category: 'Creation', span: 'col-span-2 row-span-2',
      verse: 'May you be strengthened with all power according to his might. - Colossians 1:11'
    },
    {
      id: 32, url: '/DSC_6167.jpg',
      title: 'Meadow of Light', category: 'Creation', span: '',
      verse: 'May the Lord direct your hearts into God\'s love. - 2 Thessalonians 3:5'
    },
    {
      id: 33, url: '/DSC_6181.jpg',
      title: 'Desert of Solitude', category: 'Landscape', span: '',
      verse: 'I rejoice greatly in the Lord because of you. - Philippians 4:10'
    },
    {
      id: 34, url: '/DSC_6183.jpg',
      title: 'Island of Peace', category: 'Creation', span: '',
      verse: 'May the Lord of peace himself give you peace. - 2 Thessalonians 3:16'
    },
    {
      id: 35, url: '/DSC_6191.jpg',
      title: 'Glacier of Time', category: 'Landscape', span: 'col-span-2',
      verse: 'I thank God that I can have complete confidence in you. - 2 Corinthians 7:16'
    },
    {
      id: 36, url: '/DSC_6108.jpg',
      title: 'Harbor of Hope', category: 'Urban Life', span: 'row-span-2',
      verse: 'You have been a blessing and encouragement to me. - Colossians 4:11'
    },
    {
      id: 37, url: '/DSC_6124.jpg',
      title: 'Bridge to Eternity', category: 'Urban Life', span: '',
      verse: 'May God\'s love be with all of you. - 1 Corinthians 16:24'
    },
    {
      id: 38, url: '/DSC_6139.jpg',
      title: 'Cave of Wonders', category: 'Landscape', span: '',
      verse: 'I give thanks to God always for you. - 1 Corinthians 1:4'
    },
    {
      id: 39, url: '/DSC_6142.jpg',
      title: 'Cliff of Faith', category: 'Landscape', span: '',
      verse: 'May you experience the love of Christ. - Ephesians 3:19'
    },
    {
      id: 40, url: '/DSC_6146.jpg',
      title: 'Prairie of Dreams', category: 'Creation', span: 'row-span-2',
      verse: 'Thank you for sharing in my troubles. - Philippians 4:14'
    },
    {
      id: 41, url: '/DSC_6099.jpg',
      title: 'Bay of Tranquility', category: 'Creation', span: 'col-span-2 row-span-2',
      verse: 'I always remember you in my prayers with thanksgiving. - Colossians 1:3'
    },
    {
      id: 42, url: '/DSC_5645.jpg',
      title: 'Harbor Lights', category: 'Urban Life', span: '',
      verse: 'May God bless you and make you a blessing. - Genesis 12:2'
    },
    {
      id: 43, url: '/DSC_6104.jpg',
      title: 'Sunset Boulevard', category: 'Urban Life', span: '',
      verse: 'Your presence brings me joy and comfort. - Philemon 1:7'
    },
    {
      id: 44, url: '/DSC_5693.jpg',
      title: 'Mountain Majesty', category: 'Landscape', span: 'col-span-2 row-span-2',
      verse: 'I thank God for your generous giving and sharing. - Philippians 4:15-16'
    },
    {
      id: 45, url: '/DSC_5680.jpg',
      title: 'River Reflections', category: 'Creation', span: '',
      verse: 'May you overflow with hope and power. - Romans 15:13'
    },
    {
      id: 46, url: '/DSC_5666.jpg',
      title: 'City Lights', category: 'Urban Life', span: '',
      verse: 'I thank God for your faithful service. - 1 Thessalonians 1:3'
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

    audioRef.current = new Audio('/background_music.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    return () => {
      document.body.removeChild(script);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (cinemaIntervalRef.current) {
        clearInterval(cinemaIntervalRef.current);
      }
    };
  }, []);

  // Cinema mode with advanced animations
  useEffect(() => {
    if (!isCinemaMode || !isPlaying || !window.gsap) {
      if (cinemaIntervalRef.current) {
        clearInterval(cinemaIntervalRef.current);
        cinemaIntervalRef.current = null;
      }
      // schedule the state update asynchronously to avoid cascading renders
      Promise.resolve().then(() => setShowCinemaOverlay(false));
      return;
    }

    const gsap = window.gsap;

    const animateCinemaImage = () => {
      setShowCinemaOverlay(true);

      const cinemaContainer = cinemaImageRef.current;
      if (!cinemaContainer) return;

      const img = cinemaContainer.querySelector('.cinema-img');
      const titleEl = cinemaContainer.querySelector('.cinema-title');
      const categoryEl = cinemaContainer.querySelector('.cinema-category');
      const overlay = cinemaContainer.querySelector('.cinema-overlay');

      // Reset for new animation (guard set in case the method is optional)
      if (typeof gsap.set === 'function') {
        gsap.set([img, titleEl, categoryEl], { clearProps: 'all' });
      }

      // Entrance Animation - Image zooms from center with rotation
      gsap.fromTo(img,
        {
          scale: 0.3,
          rotation: -15,
          opacity: 0,
          filter: 'blur(20px) brightness(0.5)'
        },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          filter: 'blur(0px) brightness(1)',
          duration: 1.2,
          ease: 'power3.out'
        }
      );

      // Category badge slides in from top
      gsap.fromTo(categoryEl,
        {
          y: -100,
          opacity: 0,
          scale: 0.5
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: 0.5,
          ease: 'back.out(1.7)'
        }
      );

      // Title slides in from bottom with elegant fade
      gsap.fromTo(titleEl,
        {
          y: 100,
          opacity: 0,
          scale: 0.9
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          delay: 0.7,
          ease: 'power3.out'
        }
      );

      // Overlay fade in
      gsap.fromTo(overlay,
        {
          opacity: 0
        },
        {
          opacity: 1,
          duration: 0.6,
          delay: 0.3
        }
      );

      // Continuous subtle animations while displaying
      gsap.to(img, {
        scale: 1.05,
        duration: 3,
        delay: 1.2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: 1
      });

      // Exit animation before next image
      setTimeout(() => {
        gsap.to([img, titleEl, categoryEl, overlay], {
          opacity: 0,
          scale: 0.95,
          filter: 'blur(10px)',
          duration: 0.6,
          ease: 'power2.in',
          onComplete: () => {
            setShowCinemaOverlay(false);
          }
        });
      }, 5400);
    };

    // Start animation immediately when currentImageIndex changes
    animateCinemaImage();

    // Auto-advance every 6 seconds
    cinemaIntervalRef.current = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);

    return () => {
      if (cinemaIntervalRef.current) {
        clearInterval(cinemaIntervalRef.current);
      }
    };
  }, [isCinemaMode, isPlaying, currentImageIndex, images.length]);
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
        if (isCinemaMode) return;

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
        if (isCinemaMode) return;

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
  }, [isLoaded, isCinemaMode]);

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
    if (isCinemaMode) return;
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

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      setIsCinemaMode(false);
    } else {
      audioRef.current.play().catch(err => console.log('Audio play failed:', err));
      setIsPlaying(true);
    }
  };

  const toggleCinemaMode = () => {
    if (!isPlaying && !isCinemaMode) {
      if (audioRef.current) {
        audioRef.current.play().catch(err => console.log('Audio play failed:', err));
        setIsPlaying(true);
      }
      setIsCinemaMode(true);
      setCurrentImageIndex(0);
    } else {
      setIsCinemaMode(!isCinemaMode);
      if (!isCinemaMode) {
        setCurrentImageIndex(0);
      }
    }
  };

  const currentImage = images[currentImageIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 py-16 px-4 sm:px-6 lg:px-8">
      {/* Control Buttons */}
      <div className="fixed top-6 right-6 z-50 flex gap-3">
        <button
          onClick={toggleMusic}
          className="bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-full p-4 text-white transition-all duration-300 shadow-lg hover:scale-110"
          aria-label="Toggle music"
        >
          {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </button>
        <button
          onClick={toggleCinemaMode}
          className={`backdrop-blur-md border rounded-full p-4 text-white transition-all duration-300 shadow-lg hover:scale-110 ${isCinemaMode
            ? 'bg-blue-500/20 border-blue-500/30 hover:bg-blue-500/30'
            : 'bg-white/5 hover:bg-white/10 border-white/10'
            }`}
          aria-label="Toggle cinema mode"
        >
          {isCinemaMode ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>
      </div>

      {/* Cinema Mode Overlay - Full Screen Movie Presentation */}
      {isCinemaMode && showCinemaOverlay && (
        <div className="fixed inset-0 z-40 bg-black/98 backdrop-blur-xl">
          <div ref={cinemaImageRef} className="relative w-full h-full flex items-center justify-center p-4">
            {/* Animated Background Gradient */}
            <div className="absolute inset-0 bg-gradient-radial from-blue-900/20 via-transparent to-black opacity-50"></div>

            {/* Decorative Light Rays */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-blue-500/30 via-transparent to-transparent transform -skew-x-12 blur-sm"></div>
              <div className="absolute top-0 right-1/4 w-1 h-full bg-gradient-to-b from-purple-500/30 via-transparent to-transparent transform skew-x-12 blur-sm"></div>
            </div>

            {/* Main Image Container */}
            <div className="relative max-w-6xl w-full h-full flex flex-col items-center justify-center">
              {/* Image with Cinematic Frame */}
              <div className="cinema-img relative w-full h-full aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
                <Image
                  src={currentImage.url}
                  alt={currentImage.title}
                  fill
                  className="object-contain"
                  priority
                />

                {/* Vignette Effect */}
                <div className="cinema-overlay absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-black/60 pointer-events-none"></div>

                {/* Film Grain Texture */}
                <div className="absolute inset-0 opacity-5 pointer-events-none"
                  style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' /%3E%3C/svg%3E")' }}>
                </div>
              </div>

              {/* Title - Bottom Center with Elegant Typography */}
              <div className="cinema-title absolute bottom-20 left-1/2 transform -translate-x-1/2 w-full max-w-lg px-2">
                <div className="bg-gradient-to-t from-black/90 via-black/70 to-transparent backdrop-blur-lg rounded-xl p-6 border-t-2 border-white/20 shadow-2xl">
                  <h2 className="text-white text-lg md:text-xl font-bold text-center tracking-tight leading-tight drop-shadow-xl">
                    {currentImage.title}
                  </h2>

                  {/* Progress Bar */}
                  <div className="mt-8 w-full h-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-progress"
                      style={{ animation: 'progress 6s linear' }}>
                    </div>
                  </div>

                  {/* Image Counter */}
                  <p className="text-white/60 text-center mt-4 text-lg font-medium tracking-wider">
                    {currentImage.verse}
                  </p>
                </div>
              </div>

              {/* Corner Ornaments */}
              <div className="absolute top-12 left-12 w-16 h-16 border-l-4 border-t-4 border-blue-500/50 rounded-tl-lg"></div>
              <div className="absolute top-12 right-12 w-16 h-16 border-r-4 border-t-4 border-purple-500/50 rounded-tr-lg"></div>
              <div className="absolute bottom-12 left-12 w-16 h-16 border-l-4 border-b-4 border-blue-500/50 rounded-bl-lg"></div>
              <div className="absolute bottom-12 right-12 w-16 h-16 border-r-4 border-b-4 border-purple-500/50 rounded-br-lg"></div>
            </div>
          </div>
        </div>
      )}

      <div className={`max-w-[1600px] mx-auto transition-opacity duration-500 ${isCinemaMode ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}>
        {/* Header */}
        <div className="mb-16 max-w-3xl">
          <div className="inline-block px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
            <span className="text-blue-400 text-sm font-medium tracking-wide">THROUGH THE LENS OF FAITH</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
            His Marvelous Works
          </h1>
          <p className="text-neutral-400 text-lg leading-relaxed">
            &ldquo;The heavens declare the glory of God; the skies proclaim the work of his hands.&rdquo;
            <span className="block mt-3 text-neutral-500 text-base italic">— Psalm 19:1</span>
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
              className={`relative group cursor-pointer rounded-xl overflow-hidden shadow-xl ${image.span} bg-neutral-900 transition-all duration-500`}
              onClick={() => handleImageClick(image)}
            >
              <Image
                src={image.url}
                alt={image.title}
                fill
                className="object-cover transition-transform duration-700"
              />

              <div className="overlay absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 transition-opacity duration-400">
                <div className="content absolute bottom-0 left-0 right-0 p-6 opacity-0 translate-y-5">
                  <span className="inline-block px-2.5 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium rounded-md mb-3 tracking-wide">
                    {image.category}
                  </span>
                  <h3 className="text-white text-xl md:text-2xl font-semibold mb-2 tracking-tight">
                    {image.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/97 p-4 backdrop-blur-sm">
            <div ref={modalRef} className="relative max-w-7xl w-full">
              <button
                onClick={handleCloseModal}
                className="absolute -top-16 right-0 text-white/80 hover:text-white transition-colors duration-200 z-10 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-full p-3"
              >
                <X className="w-6 h-6" />
              </button>

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