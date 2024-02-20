"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Home: NextPage = () => {
  return (
    <>
      <div
        className="flex items-center flex-col flex-grow pt-10"
        style={{ backgroundImage: `url(/gateway.avif)`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="flex flex-col bg-base-100 opacity-90 px-5 py-10 text-center items-center max-w-m rounded-3xl ">
          <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl text-amber-400 font-bold">Public Good supportUs</span>
            <span className="block text-xs subpixel-antialiased mt-[10px]">
              🌟 Gateway to supporting your favorite projects 🌟
            </span>
          </h1>
          <h2 className="italic">Start by exploring all campaigns below</h2>
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="text-center mb-2">
              <Link
                href="/campaign"
                className="mt-2 bg-[#020617] text-white rounded-[10px] px-4 py-2 hover:bg-[#7c3aed] flex justify-center items-center"
              >
                <MagnifyingGlassIcon className="h-5 w-5 justify-center items-center fill-secondary mr-1" />
                Explore Campaigns
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
