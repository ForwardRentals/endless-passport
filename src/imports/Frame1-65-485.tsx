import imgImage001Page21 from "figma:asset/307ab3027368eb3f4f61c4034ca520f59f41b5a1.png";
import imgImage002Page31 from "figma:asset/19b1c5bbdcb61c6fa766733a039009025b3a8088.png";
import imgImage003Page31 from "figma:asset/a0ae4a48d1e58ad38db8a33b65d88179b2ad9b3d.png";
import imgImage004Page41 from "figma:asset/0268eae7f270142986362559f8fdd43fae9608a9.png";
import imgImage005Page41 from "figma:asset/57c2f0493470dc56478b81f428fe9e9aa61caa15.png";

export default function Frame() {
  return (
    <div className="bg-white relative size-full">
      <div className="absolute h-[1367px] left-[128px] top-[221px] w-[2048px]" data-name="image_001_page2 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage001Page21} />
      </div>
      <div className="absolute h-[1508px] left-[2216px] top-[80px] w-[1132px]" data-name="image_002_page3 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage002Page31} />
      </div>
      <div className="absolute h-[1508px] left-[3388px] top-[80px] w-[2010px]" data-name="image_003_page3 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage003Page31} />
      </div>
      <div className="absolute h-[1508px] left-[128px] top-[1628px] w-[2010px]" data-name="image_004_page4 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage004Page41} />
      </div>
      <div className="absolute h-[1449px] left-[2178px] top-[1628px] w-[2048px]" data-name="image_005_page4 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage005Page41} />
      </div>
    </div>
  );
}