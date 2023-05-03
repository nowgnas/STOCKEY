import { useRecoilState } from "recoil";
import {
  StockCardType,
  stockAccordionOpenState,
} from "../../stores/LaboratoryAtoms";
import AccordionLayout from "./AccordionLayout";

const sampleItem: StockCardType[] = [
  {
    id: 1,
    name: "BGF리테일",
  },
  {
    id: 2,
    name: "CJ제일제당",
  },
  {
    id: 3,
    name: "DB손해보험",
  },
  {
    id: 4,
    name: "F&F",
  },
  {
    id: 5,
    name: "HD현대",
  },
  {
    id: 6,
    name: "HMM",
  },
  {
    id: 7,
    name: "KB금융",
  },
  {
    id: 8,
    name: "KT&G",
  },
];

const StockAccordion = () => {
  const [openState, setOpenState] = useRecoilState(stockAccordionOpenState);

  return (
    <AccordionLayout
      type="STOCK"
      items={sampleItem}
      openState={openState}
      setOpenState={setOpenState}
    />
  );
};

export default StockAccordion;
