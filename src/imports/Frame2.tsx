import img11 from "figma:asset/7b56ff61ddd5e91f734a08376aa6d04f577803e6.png";
import img41 from "figma:asset/f0e6826d94bb1b8649695c15dfa034051c395262.png";
import img31 from "figma:asset/8cbc2eca6e943872988269a1bc6cb3052600b855.png";
import img21 from "figma:asset/258d5e5d2c8c763bccfd4bce6add91e5baf3e6e7.png";

export default function Frame() {
  return (
    <div className="relative size-full">
      <div className="absolute h-[1516px] left-[150px] top-[96px] w-[2098px]" data-name="1 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img11} />
      </div>
      <div className="absolute h-[1516px] left-[2288px] top-[96px] w-[2022px]" data-name="4 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img41} />
      </div>
      <div className="absolute h-[1516px] left-[150px] top-[1652px] w-[2346px]" data-name="3 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img31} />
      </div>
      <div className="absolute h-[1516px] left-[2536px] top-[1652px] w-[2022px]" data-name="2 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img21} />
      </div>
    </div>
  );
}