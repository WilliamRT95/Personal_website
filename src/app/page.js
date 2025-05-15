"use client";
import "./globals.css";
import Image from "next/image";
import Navbar from "./ui/Navbar";
import { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "./ui/footer";

export default function Page() {
  const [isClicked, setIsClicked] = useState(false);
  const [spawnedImages, setSpawnedImages] = useState([]);
  const [scrollY, setScrollY] = useState(0);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY || window.pageYOffset);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate profile pic size and position based on scroll
  const getProfilePicStyle = () => {
    // The scroll position where the image should start shrinking
    const shrinkStart = 20;
    // The scroll position where the image should stop shrinking and stick
    const shrinkEnd = 250;

    // If not started shrinking
    if (scrollY < shrinkStart) {
      return {
        width: 250,
        height: 214,
        position: "relative",
        marginTop: 0,
      };
    }

    // If in the shrinking phase
    if (scrollY < shrinkEnd) {
      const progress = (scrollY - shrinkStart) / (shrinkEnd - shrinkStart);
      const scale = 1 - progress * 0.7; // Reduce to 30% of original size
      return {
        width: 250 * scale,
        height: 214 * scale,
        position: "relative",
        marginTop: 0,
      };
    }

    // If scrolled past the shrinking phase - stick to top
    return {
      width: 250 * 0.3,
      height: 214 * 0.3,
      position: "fixed",
      top: "20px", // Below navbar
      left: "20px",
      zIndex: 100,
      marginTop: 0,
    };
  };

  const handleClick = () => {
    // Trigger shake animation
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 500);

    // Limit to 4 images max
    if (spawnedImages.length >= 3) return;

    const coconutLinks = ["/login", "/notes", "/chatbot"];
    const coconutImages = [
      "/images/cocologin.png",
      "/images/coconotes.png",
      "/images/cocochat.png",
    ];

    // New Image
    const newImage = {
      id: Date.now(), // Unique identifier
      index: spawnedImages.length,
      x: Math.random() * window.innerWidth * 0.7, // Random X (70% of screen)
      y: Math.random() * window.innerHeight * 0.7, // Random Y
      rotation: Math.random() * 60 - 30, // Random rotation (-30 to 30 degrees)
      link:
        coconutLinks[spawnedImages.length % coconutLinks.length] || "/default",
      imageSrc: coconutImages[spawnedImages.length % coconutImages.length],
    };

    setSpawnedImages([...spawnedImages, newImage]);
  };

  const profilePicStyle = getProfilePicStyle();

  return (
    <>
      <div className='fixed top-0 left-0 w-full h-20 bg-gradient-to-b from-white/70 to-transparent z-20 pointer-events-none'></div>
      <Navbar />
      <div className='flex flex-col p-4 mt-2 '>
        <div className='relative inline-block font-caveat md:hidden'>
          <Image //imagelogo mobile
            src='/images/profilepic.png'
            alt='profile picture'
            width={75}
            height={64.2}
            className='block transition-all duration-300 ease-out'
            style={{
              position: "fixed",
              top: "20px", // Below navbar
              left: "20px",
              zIndex: 100,
              marginTop: 0,
            }}
          />
        </div>
        <div className='flex flex-col md:flex-row items-center justify-between md:mx-15 mt-15 md:mt-25 md:pr-10'>
          <div className='font-josefin font-bold text-3xl relative hidden md:block'>
            {/* Image container with text overlays */}
            <div className='relative font-caveat'>
              <Image //imagelogo desktop
                src='/images/profilepic.png'
                alt='profile picture'
                width={profilePicStyle.width}
                height={profilePicStyle.height}
                className='block transition-all duration-300 ease-out'
                style={{
                  position: profilePicStyle.position,
                  top: profilePicStyle.top,
                  left: profilePicStyle.left,
                  zIndex: profilePicStyle.zIndex,
                  marginTop: profilePicStyle.marginTop,
                }}
              />
            </div>

            <p className='left-0 -mt-5 px-4 rounded-2xl pt-1 md:w-fit text-gray-100 bg-buttons text-center transform skew-y-2'>
              I Am Guillem.
            </p>
            <p className='px-3 py-1 mt-2 text-center '>
              A former tech sales manager turned web developer.
            </p>
          </div>
          <div>
            <Image //cartoon image div
              src='/images/Cartoon.png'
              alt='palm background'
              width={350}
              height={525}
            />
          </div>
          <div className='block md:hidden font-josefin font-bold text-3xl'>
            <p className='-mt-5 mx-15 rounded-2xl pt-1 text-gray-100 bg-[#4593BB] text-center transform skew-y-2'>
              I Am Guillem.
            </p>
            <p className='py-1 mt-2 text-center '>
              A former tech sales manager turned web developer.
            </p>
          </div>
        </div>
        <div className='flex flex-col lg:flex-row lg:items-center relative lg:mr-15 gap-5 mt-25'>
          {/* center main div */}
          <div className='order-2' id='left-center-container'>
            <div className='absolute bottom-35 md:bottom-150 h-[30] lg:top-0 lg:-mt-5 left-[250px] md:left-[500px] rotate-30'>
              <Image //arrow div
                src='/images/arrow.png'
                alt='click me arrow'
                width={150}
                height={71}
              />
            </div>
            <div className='-ml-4'>
              <Image //palm image div
                className={`cursor-pointer ${
                  isClicked ? " animate-shake" : ""
                }`}
                src='/images/palm.webp'
                alt='palm background'
                width={500}
                height={690}
                onClick={handleClick}
              />
            </div>
          </div>

          <div
            id='right-center-container'
            className='lg:absolute lg:left-1/2 flex flex-col flex-grow space-y-8 ml-1 items-center'
          >
            <div id='text-center'>
              <p className='text-center text-2xl font-bold'>
                After a couple of years leading sales teams in the tech world, I
                decided to dive into coding and haven’t looked back. I’ve been
                learning and building with HTML, CSS, JavaScript, React,
                Next.js, and Tailwind — This site is where I share the projects
                I’ve created along the way. I’m on the hunt for my first dev
                role, so if you like what you see, let’s connect! (click the
                palm tree and then click the coconuts below to see the projects
                added)
              </p>
            </div>
            <div id='coconut-container' className='flex flex-row'>
              {/* Coconut images */}
              {spawnedImages.map((img) => (
                <div
                  key={img.id}
                  className='animate-float z-10'
                  style={{
                    transform: `rotate(${img.rotation}deg)`,
                    animationDelay: `${img.index * 0.1}s`,
                  }}
                >
                  <Link href={img.link || "/default-link"}>
                    <Image
                      className='hover:scale-105 cursor-pointer transition-transform duration-300 ease-out'
                      src={img.imageSrc}
                      alt='coconut'
                      width={150}
                      height={150}
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
