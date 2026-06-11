import img51 from "figma:asset/03457b407d84438f1a50b28de809501fd380ddc3.png";
import img21 from "figma:asset/59c24d8b28a0c7734b2ad6c16dafb758cdc8eb7a.png";
import img31 from "figma:asset/8d3a36622a96744bcfa93f2b404aad5d2af65089.png";
import img41 from "figma:asset/26f77d72bb8450017b3f55db2f84d07d3abd5e45.png";
import img11 from "figma:asset/56f88d945c0bbac9a175fa010e02908c1dd14d84.png";

export default function Frame() {
  return (
    <div className="bg-white relative size-full">
      <div className="absolute h-[1656px] left-0 top-0 w-[2208px]" data-name="5 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img51} />
      </div>
      <div className="absolute h-[1656px] left-[2248px] top-0 w-[1874px]" data-name="2 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img21} />
      </div>
      <div className="absolute h-[1656px] left-0 top-[1696px] w-[2208px]" data-name="3 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img31} />
      </div>
      <div className="absolute h-[1656px] left-[2248px] top-[1696px] w-[2208px]" data-name="4 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img41} />
      </div>
      <div className="absolute h-[1596px] left-[4162px] top-0 w-[2788px]" data-name="1 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img11} />
      </div>
    </div>
  );
}