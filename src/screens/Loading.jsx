import React from "react";

import LoadingSvg from "../components/LoadingSvg";

function Loading() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <LoadingSvg className="-ml-1 mr-3 h-8 w-8 mb-2 text-primary" />
      Please wait while we are loading...
    </div>
  );
}

export default Loading;
