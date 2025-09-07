"use client";

import Image from "next/image";
import Link from "next/link";

const SportsSection = ({ sport }) => {
  return (
    <Link
            href={`/product/68b5d0650d3a9198c89473b3`}
            className="flex-shrink-0 group"
          >
            <div className="w-72 sm:w-96 h-96 bg-white rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl cursor-pointer">
              <div className="h-3/4 overflow-hidden relative">
                <Image
                  src={
                    sport.imageUrl[0]
                  }
                  alt={sport.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
                
              </div>
              <div className="h-1/4 p-4 flex items-center justify-center">
                <span className="text-center font-semibold text-sm sm:text-base text-gray-700">
                  {sport.name}
                </span>
              </div>
            </div>
          </Link>
  );
};

export default SportsSection;
