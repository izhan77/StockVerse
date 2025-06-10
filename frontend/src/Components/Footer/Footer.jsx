import { MoveRight } from "lucide-react";

const Footer = () => {
  return (
    <div className="text-white bg-black flex flex-col w-full min-h-screen p-4 md:px-8">
      {/* Top Section */}
      <div className="flex flex-col mt-auto md:flex-row justify-between items-start md:items-center gap-12 py-12">
        {/* H3 Headings */}
        <div className="text-3xl font-bold space-y-1">
          <h3>Track</h3>
          <h3>Analyze</h3>
          <h3>Optimize</h3>
        </div>

        {/* Email */}
        <div className="max-w-md w-full">
          <p className="mb-4 text-sm md:text-base text-right">
            Get industry insights and creative inspiration straight to your
            inbox.
          </p>
          <div className="flex items-center border-b border-white">
            <input
              type="email"
              placeholder="Email address"
              className="w-full bg-transparent py-2 pr-3 text-sm placeholder-white focus:outline-none"
            />
            <MoveRight className="ml-2" />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-20 mb-10 md:mb-0">
        <h1 className="font-bold text-[3rem] sm:text-[6rem] md:text-[9rem] lg:text-[12rem] tracking-tighter leading-[0.8] break-words text-center">
          StockVerse
        </h1>
        <div className="border-t border-white my-6" />

        <div className="flex justify-center items-center text-xs sm:text-sm font-bold gap-y-2">
          <div className="text-center">Copyright © StockVerse</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
