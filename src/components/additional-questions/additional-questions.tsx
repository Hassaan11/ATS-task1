import { useState } from "react";

import { InformationProps, QuestionProps } from "../../types/types";
import AddQuestionForm from "../add-question-form/add-question-form";
import AddQuestion from "../add-question/add-question";
import DisplayQuestion from "../display-questions/display-questions";

const AdditionalQuestions = ({ data, setData }: InformationProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-5 headingcontainer shadow bg-white">
      <h4 className="title">Additional questions</h4>
      <div className="displayquestions">
        {data?.data?.attributes?.customisedQuestions?.map(
          (question: QuestionProps, index: number) => (
            <DisplayQuestion
              key={index}
              question={question}
              type={"customisedQuestions"}
              setData={setData}
              data={data}
            />
          )
        )}
      </div>
      {open && (
        <AddQuestionForm
          data={data}
          setData={setData}
          setOpen={setOpen}
          type={"customisedQuestions"}
        />
      )}
      <AddQuestion setOpen={setOpen} open={open} />
    </div>
  );
};
export default AdditionalQuestions;
