import imgBackpack1024X7681 from "figma:asset/4719646452f60f40c2fd18a839433b9f0d03a5ea.png";
import imgBooks1024X7681 from "figma:asset/2d904bc08808ef9be3c5f5eeef27cfcce05472e2.png";
import imgBoots1024X7681 from "figma:asset/f189658d20e6cc202e17a3edbc085eaa24c0ffd8.png";
import imgCards1024X7311 from "figma:asset/136048dcb8ac765b88c793edeec181976b848b7b.png";
import imgDeodorant1024X7681 from "figma:asset/7f91baf26eef7d7a05b971b6264959a4fcdd9cd0.png";
import imgPillow1024X9711 from "figma:asset/4c5feed48d9d2271a4c1ff34588d38518a4a67e7.png";
import imgWaterBottle1024X7681 from "figma:asset/4f61f606421f17d0e0f9e07a75889a95a671f485.png";
import img02Scaled1 from "figma:asset/4be0af614b01a2a3131569b7609f5e87accb8a2c.png";

export default function Frame() {
  return (
    <div className="bg-white relative size-full">
      <div className="absolute h-[768px] left-0 top-0 w-[1024px]" data-name="Backpack-1024x768 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgBackpack1024X7681} />
      </div>
      <div className="absolute h-[768px] left-[1064px] top-0 w-[1024px]" data-name="Books-1024x768 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgBooks1024X7681} />
      </div>
      <div className="absolute h-[768px] left-[2128px] top-0 w-[1024px]" data-name="Boots-1024x768 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgBoots1024X7681} />
      </div>
      <div className="absolute h-[731px] left-0 top-[808px] w-[1024px]" data-name="Cards-1024x731 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgCards1024X7311} />
      </div>
      <div className="absolute h-[768px] left-[1064px] top-[808px] w-[1024px]" data-name="Deodorant-1024x768 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgDeodorant1024X7681} />
      </div>
      <div className="absolute h-[971px] left-[2128px] top-[808px] w-[1024px]" data-name="Pillow-1024x971 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPillow1024X9711} />
      </div>
      <div className="absolute h-[768px] left-0 top-[1819px] w-[1024px]" data-name="Water-Bottle-1024x768 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgWaterBottle1024X7681} />
      </div>
      <div className="absolute h-[1465px] left-[1064px] top-[1819px] w-[2560px]" data-name="0-2-scaled 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img02Scaled1} />
      </div>
    </div>
  );
}