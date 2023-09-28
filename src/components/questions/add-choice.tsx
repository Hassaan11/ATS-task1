import { UnorderedListOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { ChoiceProps } from "../../types/types";

const AddChoice = ({
  choice,
  index,
  showPlus,
  setQuestion,
  question,
}: ChoiceProps) => {
  const [option, setOption] = useState("");
  const add = () => {
    const newQuestion = { ...question };
    newQuestion.choices[index] = option;
    newQuestion.choices.push("");
    setQuestion(newQuestion);
  };
  return (
    <div className="mt-2 w-100 d-flex">
      <UnorderedListOutlined style={{ fontSize: "20px" }} />
      <input
        type="text"
        className="w-100 mx-2 dropdown text"
        value={choice}
        onChange={(e) => {
          setOption(e.target.value);
          const newQuestion = { ...question };
          newQuestion.choices[index] = e.target.value;
          setQuestion(newQuestion);
        }}
      />
      {showPlus && <PlusOutlined style={{ cursor: "pointer" }} onClick={add} />}
    </div>
  );
};

export default AddChoice;
