import Image from "next/image";
import Logo from "@/public/logo.jpg";
import Link from "next/link";
import MobileNav from "./mobile-nav";
import NavLink from "@/types/navLink";

export default function Navbar() {
  const navLinks: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "Updates", href: "/updates" },
    { name: "Volunteer", href: "/volunteer" },
  ];

  return (
    <div className="sticky top-2 left-0 right-0 z-50 flex w-full justify-center px-fluid-xs backdrop-blur-sm">
      <nav className="w-full max-w-7xl bg-background/50 shadow shadow-popover-foreground mx-auto rounded-lg flex justify-between items-center gap-fluid-md py-2 px-fluid-sm">
        {/* Logo or App Name */}
        <div className="flex items-center gap-fluid-xs">
          <Image
            src={Logo}
            alt="Logo"
            width={55}
            height={55}
            loading="eager"
            className="rounded-full border border-primary shadow-md shadow-primary/50"
          />
          {/* Removed text size overrides to let our CSS base layer scale smoothly */}
          <h4 className="font-bold font-serif text-foreground tracking-wide">
            Heart of the Forest Dramatic Society
          </h4>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-fluid-md">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hidden md:block text-foreground font-semibold hover:text-primary transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
          <MobileNav links={navLinks} />
        </div>
      </nav>
    </div>
  );
}
