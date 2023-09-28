import { PlusOutlined } from "@ant-design/icons";

import { AddQuestionProps } from "../../types/types";

import "./add-question.css";

const AddQuestion = ({ setOpen, open }: AddQuestionProps) => {
  return (
    <button
      onClick={() => setOpen(!open)}
      className="my-3 btn btn-default d-flex align-items-center"
    >
      <PlusOutlined style={{ fontSize: "20px" }} />
      <span className="questionbtn"> Add a question</span>
    </button>
  );
};

export default AddQuestion;
