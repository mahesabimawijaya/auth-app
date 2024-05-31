export const Navbar = () => {
  return (
    <nav className="w-full bg-white h-[70px] shadow-md flex items-center z-10 justify-end px-[30px]">
      <button className="bg-red-600 text-white px-[15px] py-[7px] rounded-md">Log Out</button>
      <button className="bg-blue-600 text-white px-[15px] py-[7px] rounded-md">Sign In</button>
    </nav>
  );
};
