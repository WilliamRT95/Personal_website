import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className='border-t-2 border-gray-300 mx-10 mb-20 md:mb-0 py-6 mt-auto'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col md:flex-row items-center justify-between'>
          {/* Empty div for spacing on the left */}
          <div className='invisible mb-4 md:mb-0 md:w-24'></div>

          {/* Center text */}
          <div className='mb-4 md:mb-0 text-center'>
            <p className='text-gray-700'>Made with ❤️ by Guillem</p>
          </div>

          {/* Social links container */}
          <div className='flex items-center space-x-4'>
            {/* LinkedIn link */}
            <a
              href='https://www.linkedin.com/in/guillem-rtomas/'
              target='_blank'
              rel='noopener noreferrer'
              className='text-gray-700 hover:text-blue-600 transition-colors duration-300'
              aria-label='LinkedIn'
            >
              <Image
                src='/linkedin.svg'
                alt='LinkedIn'
                width={24}
                height={24}
                className='hover:scale-110 transition-transform'
              />
            </a>

            {/* GitHub link */}
            <a
              href='https://github.com/WilliamRT95'
              target='_blank'
              rel='noopener noreferrer'
              className='text-gray-700 hover:text-gray-900 transition-colors duration-300'
              aria-label='GitHub'
            >
              <Image
                src='/github.svg'
                alt='GitHub'
                width={24}
                height={24}
                className='hover:scale-110 transition-transform'
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
