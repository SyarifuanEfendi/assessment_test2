"use client";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useRef, ReactNode } from "react";
export default function Modal({ children }: { children: ReactNode }) {
  const overlay = useRef(null);
  const router = useRouter();

  const close: MouseEventHandler = (e) => {
    if (e.target === overlay.current) {
      router.back();
    }
  };
  return (
    <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
      <div
        ref={overlay}
        onClick={close}
        aria-hidden="true"
        className="flex flex-grow justify-center items-center w-full"
      >
        {children}
      </div>
    </dialog>
    // <div
    //   ref={overlay}
    //   className="fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/60"
    //   onClick={close}
    // >
    //   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 bg-white rounded-lg">
    //     {children}
    //   </div>
    // </div>
  );
}
