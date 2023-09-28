import { useState } from "react";
import { DownOutlined, MinusOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown, Space, Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";

import AddChoice from "../questions/add-choice";
import VideoQuestion from "../questions/video-question";

const EditQuestion = ({
  question,
  setData,
  data,
  type: type1,
  setEdit,
}: any) => {
  const [updateQuestion, setUpdateQuestion] = useState({
    type: question?.type,
    question: question?.question,
    choices: question?.choices,
    maxChoice: question?.maxChoice,
    disqualify: question?.disqualify,
    other: question?.other,
    duration: question?.duration,
    time: question?.time,
    videInfo: question?.videInfo,
  });
  const update = (key: string, value: any) => {
    setUpdateQuestion({ ...updateQuestion, [key]: value });
  };

  const handleFileInput = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      if (file.size <= 1024 * 1024) {
        let image = URL.createObjectURL(file);
        update("question", image);
      } else {
        alert("File size exceeds the 1MB limit. Please choose a smaller file.");
        e.target.value = null;
      }
    } else {
      console.log("No file selected.");
    }
  };

  const items: MenuProps["items"] = [
    {
      label: "Paragraph",
      key: "1",
    },
    {
      label: "Short answer",
      key: "2",
    },
    {
      label: "Yes/No",
      key: "3",
    },
    {
      label: "Dropdown",
      key: "4",
    },
    {
      label: "Multiple choice",
      key: "5",
    },
    {
      label: "Date",
      key: "6",
    },
    {
      label: "Number",
      key: "7",
    },
    {
      label: "File upload",
      key: "8",
    },
    {
      label: "Video question",
      key: "9",
    },
  ];

  const handleMenuClick: MenuProps["onClick"] = (e: any) => {
    if (e.key) {
      update("type", e?.domEvent.target.innerText);
    }
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const saveQuestion = () => {
    let find = -1;
    const newData = { ...data };
    if (type1 === "personalInformation") {
      find =
        data?.data?.attributes?.personalInformation?.personalQuestions?.findIndex(
          (q: any) => q.id === question.id
        );
      newData.data.attributes.personalInformation.personalQuestions[find] = {
        id: question.id,
        ...updateQuestion,
      };

      setData(newData);
    }
    if (type1 === "profile") {
      find = data?.data?.attributes?.profile?.profileQuestions?.findIndex(
        (q: any) => q.id === question.id
      );
      newData.data.attributes.profile.profileQuestions[find] = {
        id: question.id,
        ...updateQuestion,
      };

      setData(newData);
    }
    if (type1 === "customisedQuestions") {
      find = data?.data?.attributes?.customisedQuestions?.findIndex(
        (q: any) => q.id === question.id
      );
      newData.data.attributes.customisedQuestions[find] = {
        id: question.id,
        ...updateQuestion,
      };

      setData(newData);
    }
    setEdit(false);
  };

  const deleteQuestion = () => {
    let result = 0;
    const newData = { ...data };
    if (type1 === "personalInformation") {
      result =
        data?.data?.attributes?.personalInformation?.personalQuestions?.filter(
          (q: any) => q.id !== question.id
        );
      if (result) {
        newData.data.attributes.personalInformation.personalQuestions = result;
        setData(newData);
      }
    }
    if (type1 === "profile") {
      result = data?.data?.attributes?.profile?.profileQuestions?.filter(
        (q: any) => q.id !== question.id
      );
      if (result) {
        newData.data.attributes.profile.profileQuestions = result;
        setData(newData);
      }
    }
    if (type1 === "customisedQuestions") {
      result = data?.data?.attributes?.customisedQuestions?.filter(
        (q: any) => q.id !== question.id
      );
      if (result) {
        newData.data.attributes.customisedQuestions = result;
        setData(newData);
      }
    }
    setEdit(false);
  };
  return (
    <div className="addquestionform mb-3">
      <label htmlFor="" className="type">
        Type
      </label>
      <Dropdown
        className="mt-1 w-100 dropdown"
        menu={menuProps}
        trigger={["click"]}
      >
        <Button>
          <Space className="d-flex justify-content-between">
            {updateQuestion?.type}
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
      <label htmlFor="qs" className="mt-3 type">
        Question
      </label>

      {(updateQuestion?.type === "Paragraph" ||
        updateQuestion?.type === "Yes/No" ||
        updateQuestion?.type === "Short answer" ||
        updateQuestion?.type === "Dropdown" ||
        updateQuestion?.type === "Video question" ||
        updateQuestion?.type === "Multiple choice") && (
        <input
          className="w-100 dropdown text"
          type="text"
          name="qs"
          id="qs"
          placeholder="Type here"
          value={updateQuestion?.question}
          onChange={(e) => update("question", e.target.value)}
        />
      )}
      {updateQuestion?.type === "Number" && (
        <input
          className="w-100 dropdown text"
          type="number"
          name="number"
          id="number"
          placeholder="Type here"
          value={updateQuestion?.question}
          onChange={(e) => update("question", e.target.value)}
        />
      )}
      {updateQuestion?.type === "Date" && (
        <input
          className="w-100 dropdown text"
          type="date"
          name="date"
          id="date"
          placeholder="Type here"
          value={updateQuestion?.question}
          onChange={(e) => update("question", e.target.value)}
        />
      )}
      {updateQuestion?.type === "File upload" && (
        <>
          <input
            className="w-100 file "
            type="file"
            name="file"
            id="file"
            placeholder="Upload file"
            onChange={handleFileInput}
          />
        </>
      )}
      {updateQuestion?.type === "Yes/No" && (
        <div className="mt-2">
          <Checkbox
            checked={updateQuestion?.disqualify}
            onChange={(e: CheckboxChangeEvent) =>
              update("disqualify", e.target.checked)
            }
          >
            Disqualify candidate if the answer is no
          </Checkbox>
        </div>
      )}
      {(updateQuestion?.type === "Dropdown" ||
        updateQuestion?.type === "Multiple choice") && (
        <div className="mt-3">
          <label htmlFor="" className="type" style={{ marginLeft: "20px" }}>
            Choice
          </label>
          {updateQuestion?.choices?.map((choice: any, index: any) => (
            <AddChoice
              key={index}
              question={updateQuestion}
              setQuestion={setUpdateQuestion}
              choice={choice}
              index={index}
              showPlus={index + 1 === question.choices.length}
            />
          ))}
          <div className="mt-2">
            <Checkbox
              checked={updateQuestion?.other}
              onChange={(e: CheckboxChangeEvent) =>
                update("other", e.target.checked)
              }
            >
              Enable “Other” option
            </Checkbox>
          </div>
          {updateQuestion?.type === "Multiple choice" && (
            <div className="mt-4">
              <label htmlFor="choice" className="type">
                Max choice allowed
              </label>
              <input
                type="number"
                className="dropdown w-100 text mt-2"
                value={updateQuestion?.maxChoice}
                name="choice"
                id="choice"
                placeholder="Enter number of choice allowed here"
                onChange={(e) => update("maxChoice", parseInt(e.target.value))}
              />
            </div>
          )}
        </div>
      )}
      {updateQuestion?.type === "Video question" && (
        <VideoQuestion
          question={updateQuestion}
          setQuestion={setUpdateQuestion}
        />
      )}
      <div className="mt-4 footer d-flex justify-content-between align-items-center">
        <button
          onClick={deleteQuestion}
          className="my-3 d-flex align-items-center deleteqs"
          style={{ color: "red" }}
        >
          <MinusOutlined style={{ fontSize: "20px" }} />
          <span className="questionbtn"> Delete question</span>
        </button>
        <button className="updatebtn" onClick={saveQuestion}>
          Update
        </button>
      </div>
    </div>
  );
};

export default EditQuestion;
