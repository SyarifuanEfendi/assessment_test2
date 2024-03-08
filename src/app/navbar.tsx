import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarPage() {
  const pathname = usePathname();
  const [popup, setPopup] = useState(false);
  const { data: session, status }: { data: any; status: string } = useSession();

  return (
    <nav className="flex bg-gray-800 py-2 px-5 justify-between">
      <div className="flex items-center h-100">
        <h1 className="text-white">Assessment Test</h1>
        <ul className="flex ml-5">
          <Link href="/">
            <li
              className={`mr-3 ${
                pathname === "/" ? "text-blue-300" : "text-white"
              } cursor-pointer`}
            >
              Home
            </li>
          </Link>
          <Link href="/users">
            <li
              className={`mr-3 ${
                pathname === "/users" ? "text-blue-300" : "text-white"
              } cursor-pointer`}
            >
              Users
            </li>
          </Link>
        </ul>
      </div>
      <div>
        {status === "authenticated" ? (
          <div className="flex justify-center items-center">
            <h4 className="text-white mr-3">{session.user?.firstname}</h4>
            <div className="relative">
              <Image
                onClick={() => setPopup(!popup)}
                src="/img/profile.png"
                alt="profile"
                width={100}
                height={100}
                className="w-10 h-10 rounded-full mr-3"
              />
              {popup && (
                <div className="absolute right-0 z-10 w-56 mt-4 origin-top-right bg-white border border-gray-100 rounded-md shadow-lg">
                  <div className="p-2">
                    <a
                      href="#"
                      onClick={() => signOut()}
                      className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
                    >
                      Logout
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <button
            className="bg-white rounded-md px-3 text-sm h-7 cursor-pointer"
            onClick={() => signIn()}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
