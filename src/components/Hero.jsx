import React from "react";
import Clips from "./utils/Clips";
import SocialLink from "./utils/SocialLink";

const Hero = ({
  heroapi: { title, subtitle, btntext, img, sociallinks, videos },
}) => {
  // console.log(heroapi)
  return (
    <>
      <div className="relative h-auto w-auto flex flex-col">
        <div className="bg-theme clip-path h-[85vh] lg:h-[75vh] md:h-[65vh] sm:h-[55vh] w-auto absolute top-0 left-0 right-0 opacity-100"></div>
        <div className="relative opacity-100 grid items-center justify-items-center nike-container">
          <div className="grid items-center justify-items-center mt-28 md:mt-24">
            <h1 className="text-6xl lg:text-5xl md:text-4xl sm:text-3xl xsm:text-2xl font-extrabold filter drop-shadow-sm text-slate-200">
              {title}
            </h1>
            {/* <h1 className='text-2xl lg:text-5xl md:text-4xl sm:text-3xl xsm:text-2xl font-extrabold filter drop-shadow-sm text-slate-200'>A loyalty points system for increasing customer retention and engagement</h1> */}

            <div className="grid items-center gap-5 md:gap-3 absolute top-[33vh] lg:top-[27vh] left-[11%] xl:left-0 w-auto h-auto">
              {/* {videos?.map((val, i) => (
                <Clips
                  key={i}
                  imgsrc={val.imgsrc}
                  clip={val.clip}
                />
              ))} */}
            </div>
            {/* <div className='grid items-center absolute top-[33vh] lg:top-[27vh] right-0 gap-3'>
              {sociallinks?.map((val, i) => (
                <SocialLink
                  key={i}
                  icon={val.icon}
                />
              ))}
            </div> */}
          </div>

          <div className="flex items-center w-auto h-[45vh]">
            <h1 className="text-2xl lg:text-5xl md:text-4xl sm:text-3xl xsm:text-2xl font-serif filter drop-shadow-sm text-slate-200">
              {" "}
              NiftyPerks creates a points-based customer loyalty programs with
              various earning rules. Build customer loyalty, by rewarding
              customers for their purchases, behavior, or specific
              interactions.It engages shoppers year-around, increase customer
              lifetime value and turn visitors into raving fans with our
              enterprise ready loyalty points platform.
            </h1>
            {/* <img
              src={img}
              alt='hero-img/img'
              className='w-auto h-[45vh] lg:h-[35vh] md:h-[31vh] sm:h-[21vh] xsm:h-[19vh] transitions-theme -rotate-[25deg] hover:rotate-0 cursor-pointer object-fill'
            /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
