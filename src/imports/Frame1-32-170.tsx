import imgE1 from "figma:asset/ffb358e40012dd8816b0c1a78648eb796aa8ada9.png";
import imgC1 from "figma:asset/1f371054124b2fa18c4d215c812078ab2cee3d9c.png";
import imgD1 from "figma:asset/99064d19549f0d9b51267d984629b7b0728828c1.png";
import imgB1 from "figma:asset/fbf378275fec9a46defbfd4226c5438ee7ff30ed.png";
import imgA1 from "figma:asset/fc6783c40c8eeec10bac13808bd04eecb885224f.png";

export default function Frame() {
  return (
    <div className="bg-white relative size-full">
      <div className="absolute h-[1646px] left-[109px] top-0 w-[2194px]" data-name="E 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgE1} />
      </div>
      <div className="absolute h-[1646px] left-[2343px] top-0 w-[2194px]" data-name="C 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgC1} />
      </div>
      <div className="absolute h-[1646px] left-[4577px] top-0 w-[2194px]" data-name="D 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgD1} />
      </div>
      <div className="absolute h-[1646px] left-[109px] top-[1686px] w-[2236px]" data-name="B 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgB1} />
      </div>
      <div className="absolute h-[1646px] left-[2385px] top-[1686px] w-[2332px]" data-name="A 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgA1} />
      </div>
    </div>
  );
}