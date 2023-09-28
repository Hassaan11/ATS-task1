import { useState } from "react";

import { InformationProps, QuestionProps } from "../../types/types";
import AddQuestionForm from "../add-question-form/add-question-form";
import AddQuestion from "../add-question/add-question";
import DisplayQuestion from "../display-questions/display-questions";
import LabelWithOptions from "../lable-with-options/lable-with-options";

const ProfileInformation = ({ data, setData }: InformationProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-5 headingcontainer shadow bg-white">
      <h4 className="title">Profile Information</h4>
      <LabelWithOptions
        label="Education"
        data={data}
        setData={setData}
        value="education"
        showOptions={true}
        internal={data?.data?.attributes?.profile?.education?.mandatory}
        show={data?.data?.attributes?.profile?.education?.mandatory?.show}
        profile={true}
      />
      <LabelWithOptions
        label="Experience"
        data={data}
        setData={setData}
        value="experience"
        showOptions={true}
        internal={data?.data?.attributes?.profile?.experience?.mandatory}
        show={data?.data?.attributes?.profile?.experience?.show}
        profile={true}
      />
      <LabelWithOptions
        label="Resume"
        data={data}
        setData={setData}
        value="resume"
        showOptions={true}
        internal={data?.data?.attributes?.profile?.resume.mandatory}
        show={data?.data?.attributes?.profile?.resume?.show}
        profile={true}
      />

      <div className="displayquestions">
        {data?.data?.attributes?.profile?.profileQuestions?.map(
          (question: QuestionProps, index: number) => (
            <DisplayQuestion
              key={index}
              question={question}
              type={"profile"}
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
          type={"profile"}
        />
      )}
      <AddQuestion setOpen={setOpen} open={open} />
    </div>
  );
};

export default ProfileInformation;
