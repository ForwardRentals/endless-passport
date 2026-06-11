import img31 from "figma:asset/3c75c18378f71bc5c87ab6dd90f9a1b676d055a4.png";
import img41 from "figma:asset/e2b2db07f7171df35c0e19af138e1cd25725093c.png";
import img11 from "figma:asset/f7d992b8d327b9967d680218ca1bf665e7ef6621.png";
import img21 from "figma:asset/6881e76310f44fec415ac8bdfa80f39035903ebf.png";

export default function Frame() {
  return (
    <div className="bg-white relative size-full">
      <div className="absolute h-[2446px] left-[146px] top-0 w-[2903px]" data-name="3 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img31} />
      </div>
      <div className="absolute h-[2110px] left-[3089px] top-[336px] w-[2972px]" data-name="4 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img41} />
      </div>
      <div className="absolute h-[2389px] left-[146px] top-[2486px] w-[2944px]" data-name="1 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img11} />
      </div>
      <div className="absolute h-[2448px] left-[3130px] top-[2486px] w-[3264px]" data-name="2 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img21} />
      </div>
    </div>
  );
}