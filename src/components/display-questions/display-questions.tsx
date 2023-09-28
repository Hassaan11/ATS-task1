import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";

import EditQuestion from "../edit-question/edit-question";
import "./display-questions.css";

const DisplayQuestion = ({ question, setData, data, type }: any) => {
  const [edit, setEdit] = useState(false);
  return (
    <div className="d-flex m-3  flex-column displayqs">
      <div className="pb-4 d-flex justify-content-beteen">
        <div className="d-flex flex-column w-75">
          <span className="name">
            {question?.type === "Video question"
              ? `${question?.duration} ${question?.time}`
              : question?.type}
          </span>
          <span className="detail">{question?.question}</span>
        </div>
        <span className="editIcon">
          <EditOutlined
            style={{ fontSize: "30px" }}
            onClick={() => setEdit(!edit)}
          />
        </span>
      </div>
      {edit && (
        <EditQuestion
          question={question}
          setData={setData}
          data={data}
          type={type}
          setEdit={setEdit}
        />
      )}
    </div>
  );
};

export default DisplayQuestion;
