import imgF1 from "figma:asset/04aeb0e60be37b09dae54c8b30ac6fde6488618b.png";
import imgA1 from "figma:asset/67c4f36461261a63c7eb556ef1e8eb4a8d23c94a.png";
import imgE1 from "figma:asset/d8df3ea02c39f7ea1b44b4ba533ee67cdcec7f29.png";
import imgC1 from "figma:asset/045044cfcf266075e28b21433f1d57b1c3f130e0.png";
import imgB1 from "figma:asset/656b2a21bace18c57b1d2d48fb1915a43553a1dc.png";
import imgD1 from "figma:asset/8bf31333c7889ebb8d857a6fc6b8beb87dea654c.png";

export default function Frame() {
  return (
    <div className="bg-white relative size-full">
      <div className="absolute h-[3024px] left-[834px] top-[2981.5px] w-[4032px]" data-name="F 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgF1} />
      </div>
      <div className="absolute h-[4032px] left-[4906px] top-[1973.5px] w-[3024px]" data-name="A 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgA1} />
      </div>
      <div className="absolute h-[3024px] left-[7970px] top-[2981.5px] w-[4032px]" data-name="E 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgE1} />
      </div>
      <div className="absolute h-[1989px] left-[834px] top-[6045.5px] w-[3383px]" data-name="C 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgC1} />
      </div>
      <div className="absolute h-[2503px] left-[4257px] top-[6045.5px] w-[1935px]" data-name="B 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgB1} />
      </div>
      <div className="absolute h-[3024px] left-[6680px] top-[6046px] w-[4032px]" data-name="D 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgD1} />
      </div>
    </div>
  );
}