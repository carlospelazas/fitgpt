import Image from "next/image";
import bgImg from "@/media/Features-that-Could-Make-Your-Fitness-App-Popular-Like-Fitbit.png";
import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="w-full">
        <div className="flex flex-row items-center justify-between space-x-9 sm:mx-72 mt-20">
          <div className="ml-20">
            <p className="text-7xl font-bold leading-relaxed">
              Get the physique you always wanted.
            </p>
            <p className="text-xl my-3">
              Get yourself a workout + meal plan with only a few clicks!
            </p>
          </div>
          <Image
            src={bgImg}
            alt="background Image"
            className="opacity-75 w-4/12 object-contain rounded-full"
          />
        </div>
        <div className="text-center mt-40">
          <Link
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg px-20 py-5 text-center mr-2 mb-2 text-xl"
            href="/dashboard"
          >
            Get started now!
          </Link>
        </div>
      </div>
    </>
  );
}
