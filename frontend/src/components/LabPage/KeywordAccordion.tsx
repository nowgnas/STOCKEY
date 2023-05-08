import { useRecoilState } from "recoil";
import {
  KeywordCardType,
  keywordAccordionOpenState,
} from "../../stores/LaboratoryAtoms";
import AccordionLayout from "./AccordionLayout";

const sampleItem: KeywordCardType[] = [
  {
    id: 1,
    name: "keyword1",
  },
  {
    id: 2,
    name: "keyword2",
  },
  {
    id: 3,
    name: "keyword3",
  },
  {
    id: 4,
    name: "keyword4",
  },
  {
    id: 5,
    name: "keyword5",
  },
  {
    id: 6,
    name: "keyword6",
  },
  {
    id: 7,
    name: "keyword7",
  },
  {
    id: 8,
    name: "keyword8",
  },
];

const KeywordAccordion = () => {
  const [openState, setOpenState] = useRecoilState(keywordAccordionOpenState);

  return (
    <AccordionLayout
      type="KEYWORD"
      items={sampleItem}
      openState={openState}
      setOpenState={setOpenState}
    />
  );
};

export default KeywordAccordion;
