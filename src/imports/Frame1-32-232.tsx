import img61 from "figma:asset/17fb3df59997757a135d10ca6d1f4a8d8dc8a464.png";
import img21 from "figma:asset/d28cec51c69a03c12014ffdcd1578321e9e03eba.png";
import img31 from "figma:asset/5c4a99c292f017be16e28dfbd268d4f2094628f2.png";
import img41 from "figma:asset/db669177f16b1905b719509728c6e39cdf670468.png";
import img51 from "figma:asset/314fc0fa98f94f03a5e1370dc9e691307861ec6c.png";

export default function Frame() {
  return (
    <div className="bg-white relative size-full">
      <div className="absolute h-[1827px] left-[72.5px] top-[621.5px] w-[3116px]" data-name="6 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img61} />
      </div>
      <div className="absolute h-[2448px] left-[3228.5px] top-[0.5px] w-[3264px]" data-name="2 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img21} />
      </div>
      <div className="absolute h-[733px] left-[6532.5px] top-[1715.5px] w-[1221px]" data-name="3 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img31} />
      </div>
      <div className="absolute h-[2941px] left-[72.5px] top-[2488.5px] w-[3895px]" data-name="4 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img41} />
      </div>
      <div className="absolute h-[2340px] left-[4007.5px] top-[2488.5px] w-[2970px]" data-name="5 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img51} />
      </div>
    </div>
  );
}