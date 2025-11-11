import NewArrivals from "@/components/NewArrivals";
import HeaderImage from "@/public/images/shoes/header_shoe.png";
import Link from "next/link.js";
import { aboutUsCardInfo } from "@/data/about";
import AboutCard from "@/components/AboutCard";
import reviews from "@/data/reviews";
import Image from "next/image.js";

import LogoImage from "@/public/logo.svg";
import { contacts } from "@/data/contacts";
import FooterList from "@/components/FooterList";
import { SocialIcons } from "@/components/Socials";
import { NewsLetterForm } from "@/components/NewsLetter";

export default async function Home() {
  return (
    <div className="w-full">
      <main className="flex flex-col items-center">
        <section
          role="presentation"
          className="w-full max-w-7xl px-4 sm:px-8 py-5 sm:py-10"
        >
          <div
            className="w-full max-w-7xl min-h-[480px] md:min-h-[600px] flex justify-center items-center bg-cover bg-center bg-no-repeat rounded-xl overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url(${HeaderImage.src})`,
            }}
          >
            <div className="flex flex-col flex-1">
              <div className="max-w-xl mx-auto flex flex-col justify-center gap-6 py-12">
                <h2 className="font-bold text-white text-4xl sm:text-6xl text-center mb-4 sm:leading-4">
                  Step Into Summer
                </h2>
                <h3
                  role="contentinfo"
                  className="text-white font-mono text-xl text-center leading-6 tracking-tight"
                >
                  Discover our latest collection, designed for comfort and style
                  in the warmer months. Lightweight, breathable, and ready for
                  any adventure.
                </h3>
                <Link
                  href={"/shop"}
                  className="bg-accent text-xl text-white font-mono font-extrabold self-center px-4 py-3 rounded-md"
                >
                  Shop New Arrivals
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section
          role="region"
          className="w-full max-w-7xl px-4 sm:px-8 pt-5 pb-10 sm:py-10"
        >
          <h2 className="text-foreground text-2xl font-bold leading-tight tracking-tight px-4 pt-2">
            New Arrivals
          </h2>
          <div className="flex overflow-x-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex items-stretch py-4 gap-4">
              {<NewArrivals />}
            </div>
          </div>
        </section>
        <section className="w-full max-w-7xl px-4 sm:px-8 py-5 sm:py-10">
          <div className="flex flex-col gap-10 p-4">
            <div className="flex flex-col gap-4 max-w-3xl">
              <h3 className="font-extrabold font-sans text-4xl">
                Crafted For You, Price For All
              </h3>
              <p className="text-muted text-lg">
                We believe in exceptional footwear without the excessive markup.
                Discover the difference quality materials and a direct-to-you
                model makes.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {aboutUsCardInfo.map((info) => (
                <AboutCard about={info} key={info.id} />
              ))}
            </div>
          </div>
        </section>
        <section
          role="marquee"
          className="w-full py-10 sm:py-20 relative overflow-hidden"
        >
          <div className="animate-marquee-slow flex  w-[200%]">
            <div className="shrink-0 flex items-center space-x-8 px-4">
              {reviews.map((review) => {
                return (
                  <div
                    key={review.id}
                    className="flex flex-col justify-between gap-2 rounded-xl bg-background-light dark:bg-background-dark p-6 border border-black/10 dark:border-white/10 w-80 h-42"
                  >
                    <p className="text-foreground font-medium">
                      &quot;{review.review}&quot;
                    </p>
                    <p className="text-muted">-{review.user}</p>
                  </div>
                );
              })}
            </div>
            <div className="shrink-0 flex items-center space-x-8 px-4">
              {reviews.map((review) => {
                return (
                  <div
                    key={review.id}
                    className="flex flex-col justify-between gap-2 rounded-xl bg-background-light dark:bg-background-dark p-6 border border-black/10 dark:border-white/10 w-80 h-42"
                  >
                    <p className="text-foreground font-medium">
                      &quot;{review.review}&quot;
                    </p>
                    <p className="text-muted">-{review.user}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-black/5 dark:bg-white/5 py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {/* Logo + Description */}
            <div className="col-span-2 md:col-span-4 lg:col-span-1">
              <div className="flex items-center gap-3 text-text-light-primary dark:text-text-dark-primary mb-4">
                <div className="size-6">
                  <Image
                    src={LogoImage}
                    alt="SoleMate Logo"
                    width={24}
                    height={24}
                  />
                </div>
                <h2 className="text-xl font-bold leading-tight tracking-[-0.015em]">
                  SoleMate
                </h2>
              </div>
              <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                Crafting the future of footwear, one step at a time.
              </p>
            </div>

            {/* Footer Lists */}
            <div>
              <FooterList contact={contacts[0]} />
            </div>
            <div>
              <FooterList contact={contacts[1]} />
            </div>
            <div>
              <FooterList contact={contacts[2]} />
            </div>

            <NewsLetterForm />
          </div>

          <div className="mt-10 pt-8 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
              © 2024 SoleMate. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <SocialIcons />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
