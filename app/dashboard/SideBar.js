import { forwardRef } from "react";
import Link from "next/link";
import { HomeIcon, CreditCardIcon, UserIcon } from "@heroicons/react/24/solid";
import { MdLockPerson, MdCreateNewFolder } from "react-icons/md";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';

const SideBar = forwardRef(({ showNav }, ref) => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('userEmail');
    router.push("/auth");
  };

  return (
    <div ref={ref} className="fixed w-56 h-full bg-white shadow-sm">
      <div className="flex justify-center mt-6 mb-14">
        <picture>
          <img
            className="w-32 h-auto"
            src="/logo.png"
            alt="company logo"
          />
        </picture>
      </div>

      <div className="flex flex-col">
        <Link href="/">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/"
                ? "bg-red-100 text-red-500"
                : "text-gray-400 hover:bg-red-100 hover:text-red-500"
            }`}
          >
            <div className="mr-2">
              <HomeIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Home</p>
            </div>
          </div>
        </Link>
        <Link href="/dashboard">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/dashboard"
                ? "bg-red-100 text-red-500"
                : "text-gray-400 hover:bg-red-100 hover:text-red-500"
            }`}
          >
            <div className="mr-2">
              <MdCreateNewFolder className="h-5 w-5" />
            </div>
            <div>
              <p>Create Issue</p>
            </div>
          </div>
        </Link>
        <Link href="/dashboard/issues">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/dashboard/issues"
                ? "bg-red-100 text-red-500"
                : "text-gray-400 hover:bg-red-100 hover:text-red-500"
            }`}
          >
            <div className="mr-2">
              <CreditCardIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Issues</p>
            </div>
          </div>
        </Link>
        <Link href="/dashboard/profile">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/dashboard/profile"
                ? "bg-red-100 text-red-500"
                : "text-gray-400 hover:bg-red-100 hover:text-red-500"
            }`}
          >
            <div className="mr-2">
              <UserIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Profile</p>
            </div>
          </div>
        </Link>
        <div className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
            router.pathname == "/logout"
              ? "bg-red-100 text-red-500"
              : "text-gray-400 hover:bg-red-100 hover:text-red-500"
          }`}
          onClick={handleLogout}
        >
          <div className="mr-2">
            <MdLockPerson className="h-5 w-5" />
          </div>
          <div>
            <p>Logout</p>
          </div>
        </div>

      </div>
    </div>
  );
});

SideBar.displayName = "SideBar";

export default SideBar;
