"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Home", href: "/" },
  {
    name: "Login",
    href: "/login",
  },
  { name: "Notes", href: "/notes" },
  { name: "ChatBot", href: "/chatbot" },
];

export default function NavLinks() {
  const pathName = usePathname();
  return (
    <>
      {links.map((link, index) => {
        const isLastLink = index === links.length - 1;

        return (
          <div key={link.name} className='flex items-center'>
            <Link
              href={link.href}
              className={`px-5 md:px-7 py-3 z-20 font-josefin text-grey-700 rounded-full hover:bg-gray-200 transition duration-300
                ${
                  pathName === link.href
                    ? "underline underline-offset-6 decoration-gray-300"
                    : ""
                }`}
            >
              <p>{link.name}</p>
            </Link>
            {!isLastLink && (
              <div className='border-r border-solid border-gray-300 h-6'></div>
            )}
          </div>
        );
      })}
    </>
  );
}
