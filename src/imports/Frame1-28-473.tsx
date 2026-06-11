import img21 from "figma:asset/92728a435a7c9e3df337b43ddf7b1651b85c89ef.png";
import img41 from "figma:asset/d2bf3876e7324cb7fd2b3b0983d3978c480ddf39.png";
import img31 from "figma:asset/41ba5bfa0074482701373513ea9ebf560039b253.png";
import img11 from "figma:asset/9225716c982c7ea79c5365c37c3d7c79f3f0b602.png";
import img51 from "figma:asset/7a4c4ab6fc2c14b287f964c75fcc44a8f931a1e2.png";

export default function Frame() {
  return (
    <div className="bg-white relative size-full">
      <div className="absolute h-[1508px] left-0 top-[101px] w-[2010px]" data-name="2 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img21} />
      </div>
      <div className="absolute h-[1508px] left-[2050px] top-[101px] w-[1106px]" data-name="4 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img41} />
      </div>
      <div className="absolute h-[1508px] left-[3196px] top-[101px] w-[1176px]" data-name="3 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img31} />
      </div>
      <div className="absolute h-[1508px] left-0 top-[1649px] w-[2084px]" data-name="1 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img11} />
      </div>
      <div className="absolute h-[1508px] left-[2124px] top-[1649px] w-[2278px]" data-name="5 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img51} />
      </div>
    </div>
  );
}