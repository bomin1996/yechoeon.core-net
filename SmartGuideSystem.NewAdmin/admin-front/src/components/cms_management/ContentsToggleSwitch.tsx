import { Bars3Icon, PhotoIcon } from "@heroicons/react/24/solid";
import { IconToggleButton } from "@/components/ui/button/ImageToggleButton";
interface Props {
  className?: string;
  index: number;
  onSelected: (index: number) => void;
}
export default function ContentsToggleSwitch({
  className,
  index,
  onSelected,
}: Props) {
  //const [selectedIndex, SetSelectedIndex] = useState(index);
  return (
    <div className={`${className} flex `}>
      <IconToggleButton
        className="w-[24px] text-white rounded-sm p-[2px] "
        svgIconNode={<Bars3Icon className="h-5 w-5" />}
        onClick={() => {
          //SetSelectedIndex(0);
          onSelected(0);
        }}
        isSelected={index === 0}
      />
      <IconToggleButton
        className="w-[24px] text-white rounded-sm p-[2px]"
        svgIconNode={<PhotoIcon className="h-5 w-6 " />}
        onClick={() => {
          //SetSelectedIndex(1);
          onSelected(1);
        }}
        isSelected={index === 1}
      />
    </div>
  );
}
