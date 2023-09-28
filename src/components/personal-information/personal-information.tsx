import { useState } from "react";

import { InformationProps, QuestionProps } from "../../types/types";
import AddQuestionForm from "../add-question-form/add-question-form";
import AddQuestion from "../add-question/add-question";
import DisplayQuestion from "../display-questions/display-questions";
import LabelWithOptions from "../lable-with-options/lable-with-options";

const PersonalInformation = ({ data, setData }: InformationProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-5 headingcontainer shadow bg-white">
      <h4 className="title">Personal Information</h4>
      <LabelWithOptions label="First Name" data={data} setData={setData} />
      <LabelWithOptions label="Last Name" data={data} setData={setData} />
      <LabelWithOptions label="Email" data={data} setData={setData} />
      <LabelWithOptions
        data={data}
        setData={setData}
        label="Phone"
        internal={
          data?.data?.attributes?.personalInformation?.phoneNumber?.internalUse
        }
        show={data?.data?.attributes?.personalInformation?.phoneNumber?.show}
        value="phoneNumber"
        sub="(without dial code)"
        showOptions={true}
      />
      <LabelWithOptions
        setData={setData}
        data={data}
        label="Nationality"
        internal={
          data?.data?.attributes?.personalInformation?.nationality?.internalUse
        }
        show={data?.data?.attributes?.personalInformation?.nationality?.show}
        value="nationality"
        showOptions={true}
      />
      <LabelWithOptions
        setData={setData}
        data={data}
        label="Current Residence "
        internal={
          data?.data?.attributes?.personalInformation?.currentResidence
            ?.internalUse
        }
        show={
          data?.data?.attributes?.personalInformation?.currentResidence?.show
        }
        value="currentResidence"
        showOptions={true}
      />
      <LabelWithOptions
        setData={setData}
        data={data}
        label="ID Number"
        internal={
          data?.data?.attributes?.personalInformation?.idNumber?.internalUse
        }
        show={data?.data?.attributes?.personalInformation?.idNumber?.show}
        value="idNumber"
        showOptions={true}
      />
      <LabelWithOptions
        setData={setData}
        data={data}
        label="Date of Birth"
        internal={
          data?.data?.attributes?.personalInformation?.dateOfBirth?.internalUse
        }
        show={data?.data?.attributes?.personalInformation?.dateOfBirth?.show}
        value="dateOfBirth"
        showOptions={true}
      />
      <LabelWithOptions
        setData={setData}
        data={data}
        label="Gender"
        internal={
          data?.data?.attributes?.personalInformation?.gender?.internalUse
        }
        show={data?.data?.attributes?.personalInformation?.gender?.show}
        value="gender"
        showOptions={true}
      />

      <div className="displayquestions">
        {data?.data?.attributes?.personalInformation?.personalQuestions?.map(
          (question: QuestionProps, index: number) => (
            <DisplayQuestion
              key={index}
              question={question}
              setData={setData}
              data={data}
              type={"personalInformation"}
            />
          )
        )}
      </div>
      {open && (
        <AddQuestionForm
          data={data}
          setData={setData}
          setOpen={setOpen}
          type={"personalInformation"}
        />
      )}
      <AddQuestion setOpen={setOpen} open={open} />
    </div>
  );
};

export default PersonalInformation;
