"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface ItemProps {
  name: string;
  imageurl: string;
}

const Item = ({ name, imageurl }: ItemProps) => {
  const router = useRouter();

  const handleClick = () => {
    console.log("CLicked")
    router.push(
      `/exercise/detail?name=${encodeURIComponent(name)}&imageurl=${encodeURIComponent(imageurl)}`
    );
  };

  return (
    <div
      className="flex w-full flex-col items-center pt-5 cursor-pointer"
      onClick={handleClick}
    >
      <img className="w-[80%] h-[160px]"/>
      <h3>{name}</h3>
    </div>
  );
};

export default Item;
