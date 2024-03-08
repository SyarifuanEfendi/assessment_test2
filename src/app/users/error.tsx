"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // console.log(error);
  }, [error]);
  return (
    <div>
      <h2></h2>
      {/* <button onClick={() => reset()}>test</button> */}
    </div>
  );
}
