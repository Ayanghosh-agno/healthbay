import React from "react";

function TreatmentCard(props) {
  return (
    <div className="mt-4 flex flex-col mb-8" {...props}>
      <div className="font-medium text-xl">Ongoing Treatments</div>
      <div className="mt-2 relative">
        <div
          className={`bg-primary p-2 rounded-xl text-white ${props.className}`}
        >
          {props.children}
        </div>
        <div className="absolute bottom-0 h-4 w-full px-2 -mb-2">
          <div className="relative bg-primary bg-opacity-50 h-full w-full rounded-md">
            <div className="absolute bottom-0 h-4 w-full px-2 -mb-2">
              <div className="bg-primary bg-opacity-25 h-full w-full rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TreatmentCard;
