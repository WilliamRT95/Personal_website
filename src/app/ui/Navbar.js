import NavLinks from "./nav-links";

export default function Navbar() {
  return (
    <nav className='fixed bottom-5 left-0 right-0 md:bottom-auto md:top-5 flex w-full items-center z-50 p-4 h-16'>
      <div className='flex items-center mx-auto px-5 md:px-20 z-999 rounded-full border-1 border-solid border-gray-200 shadow-[0_3px_12px_0,0_1px_2px_0] shadow-gray-200 bg-white'>
        <NavLinks />
      </div>
    </nav>
  );
}
