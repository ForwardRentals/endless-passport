import imgImage004Page41 from "figma:asset/9a91b2de43f45598baa0ab9375779d489e9cdf00.png";
import imgImage005Page41 from "figma:asset/eb296693eb343712e1ff42ffbf62f2eb27e2b74f.png";
import imgImage001Page21 from "figma:asset/ff0f9685abfa4d80332a200721b666e3c650704a.png";
import imgImage002Page31 from "figma:asset/0f3b2df4d95d57f6a32307dfcda70834588a611e.png";
import imgImage003Page31 from "figma:asset/f7cdb6c3cee40aaf6aeb34c7d281dada969a4b7f.png";

export default function Frame() {
  return (
    <div className="bg-white relative size-full">
      <div className="absolute h-[1875px] left-0 top-[0.5px] w-[2500px]" data-name="image_004_page4 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage004Page41} />
      </div>
      <div className="absolute h-[1875px] left-[2540px] top-[0.5px] w-[2500px]" data-name="image_005_page4 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage005Page41} />
      </div>
      <div className="absolute h-[1470px] left-[5080px] top-[405.5px] w-[2500px]" data-name="image_001_page2 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage001Page21} />
      </div>
      <div className="absolute h-[2500px] left-0 top-[1915.5px] w-[1933px]" data-name="image_002_page3 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage002Page31} />
      </div>
      <div className="absolute h-[1875px] left-[1973px] top-[1915.5px] w-[2500px]" data-name="image_003_page3 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage003Page31} />
      </div>
    </div>
  );
}