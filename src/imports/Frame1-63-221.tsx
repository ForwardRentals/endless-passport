import imgImage001Page21 from "figma:asset/6c03de549fa7bbf5e4835f5b16ddc6feba3a33e0.png";
import imgImage002Page31 from "figma:asset/a995402b4891eb4d5f7a19a3b9842aaf9b8e4f49.png";
import imgImage003Page31 from "figma:asset/4f858a3259ff01e10931a89fad648193b55e02df.png";
import imgImage004Page41 from "figma:asset/8da6792066ee4819424ccc7f46774b77de2b9f35.png";
import imgImage005Page41 from "figma:asset/6a6457498c35e13049ba64ccab86fde3658c9763.png";

export default function Frame() {
  return (
    <div className="bg-white relative size-full">
      <div className="absolute h-[733px] left-[37px] top-[78px] w-[1221px]" data-name="image_001_page2 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage001Page21} />
      </div>
      <div className="absolute h-[779px] left-[1298px] top-[32px] w-[925px]" data-name="image_002_page3 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage002Page31} />
      </div>
      <div className="absolute h-[811px] left-[2263px] top-0 w-[1000px]" data-name="image_003_page3 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage003Page31} />
      </div>
      <div className="absolute h-[779px] left-[37px] top-[851px] w-[1205px]" data-name="image_004_page4 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage004Page41} />
      </div>
      <div className="absolute h-[719px] left-[1282px] top-[851px] w-[960px]" data-name="image_005_page4 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage005Page41} />
      </div>
    </div>
  );
}