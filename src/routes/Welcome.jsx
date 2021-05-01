import React, { useState } from "react";
import Slider from "react-slick";
import FilledButton from "../components/FilledButton";

import Logo from "../components/Logo";
import OutlinedButton from "../components/OutlinedButton";
import WelcomeCard from "../components/WelcomeCard";

function Welcome() {
  const [slideNo, setSlideNo] = useState(0);

  const settings = {
    centerMode: true,
    centerPadding: "35px",
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    afterChange: (index) => {
      setSlideNo(index);
    },
  };

  return (
    <div className="flex flex-col justify-center text-black">
      <Logo />
      <Slider className="mt-6" {...settings}>
        <WelcomeCard
          image="/assets/images/wel-doc.png"
          title="Doctors at your Service"
          description="Both, hospitals and doctors use our portal so that you can get the treatment you need lighteningly fast. Once confirmed, your doctor can easily know your medical history and suggest a treatment."
        />
        <WelcomeCard
          image="/assets/images/wel-sec.png"
          title="Medical History’s Sensitive"
          description="...and we value that. Hence, your data is never shared or leaked. Even we can’t modify your medical history because we are using advanced blockchains to keep your data tamperproof."
        />
        <WelcomeCard
          image="/assets/images/wel-kyc.png"
          title="Keeps You In Check"
          description="We are committed to your health & wellbeing. Your data is securely shared with doctors you choose to. In case your critical parameters fall, we trigger an emergency and alert all your near ones."
        />
      </Slider>
      <div className="mt-4 flex flex-row justify-center space-x-4">
        <div
          className={`w-2 h-2 rounded-full ${
            slideNo === 0 ? "w-12 bg-primary" : "bg-grayish-lighter"
          }`}
        ></div>
        <div
          className={`w-2 h-2 rounded-full ${
            slideNo === 1 ? "w-12 bg-primary" : "bg-grayish-lighter"
          }`}
        ></div>
        <div
          className={`w-2 h-2 rounded-full ${
            slideNo === 2 ? "w-12 bg-primary" : "bg-grayish-lighter"
          }`}
        ></div>
      </div>
      <div className="flex flex-row justify-center space-x-6 mt-6">
        <FilledButton className="px-8 py-1">Sign Up</FilledButton>
        <OutlinedButton className="px-8 py-1">Sign In</OutlinedButton>
      </div>
    </div>
  );
}

export default Welcome;
