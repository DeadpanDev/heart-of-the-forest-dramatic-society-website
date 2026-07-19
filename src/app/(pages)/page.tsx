import Image from "next/image";
import Logo from "@/public/logo.jpg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const fb = "https://www.facebook.com/heartoftheforestdramaticsociety";
  return (
    <>
      {/* <h1 className="text-2xl font-bold font-serif text-foreground sm:text-3xl">
        Welcome to
      </h1>
      <Image
        src={Logo}
        alt="Logo"
        loading="eager"
        width={300}
        height={300}
        className="h-48 w-48 sm:h-75 sm:w-75"
      />
      <span className="page-copy text-base text-wrap sm:text-xl">
        This website for the Heart of the forest Dramatic Society is coming
        soon! We are a community theatre group based in the heart of the forest,
        and we are dedicated to bringing high-quality theatre productions to our
        local community. Stay tuned for updates on our upcoming shows and
        events!
      </span>
      <Link href={fb} target="_blank" rel="noopener noreferrer">
        <Button className="bg-primary px-3 font-semibold text-primary-foreground shadow-md shadow-primary/50 transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/50">
          Visit Our Facebook Page
        </Button>
      </Link> */}
    </>
  );
}
