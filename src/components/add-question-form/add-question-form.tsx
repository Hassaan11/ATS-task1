import { CloseOutlined, DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown, Space } from "antd";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";

import "./add-question-form.css";
import AddChoice from "../questions/add-choice";
import VideoQuestion from "../questions/video-question";

const AddQuestionForm = ({ data, setData, setOpen, type }: any) => {
  const [question, setQuestion] = useState({
    id: uuidv4(),
    type: "Paragraph",
    question: "",
    choices: [""],
    maxChoice: 0,
    disqualify: false,
    other: false,
    duration: "",
    time: "",
    videInfo: "",
  });
  const handleFileInput = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      if (file.size <= 1024 * 1024) {
        if (file.type.startsWith("image/")) {
          setQuestion({ ...question, question: URL.createObjectURL(file) });
        } else {
          alert("Please select an image file.");
        }
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
    if (e.key) setQuestion({ ...question, type: e?.domEvent.target.innerText });
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const saveQuestion = () => {
    setOpen(false);
    if (type === "personalInformation") {
      setData({
        data: {
          ...data?.data,
          attributes: {
            ...data?.data?.attributes,
            personalInformation: {
              ...data?.data?.attributes?.personalInformation,
              personalQuestions: [
                ...data?.data?.attributes?.personalInformation
                  ?.personalQuestions,
                question,
              ],
            },
          },
        },
      });
    }
    if (type === "profile") {
      setData({
        data: {
          ...data?.data,
          attributes: {
            ...data?.data?.attributes,
            profile: {
              ...data?.data?.attributes?.profile,
              profileQuestions: [
                ...data?.data?.attributes?.profile?.profileQuestions,
                question,
              ],
            },
          },
        },
      });
    }
    if (type === "customisedQuestions") {
      setData({
        data: {
          ...data?.data,
          attributes: {
            ...data?.data?.attributes,
            customisedQuestions: [
              ...data?.data?.attributes?.customisedQuestions,
              question,
            ],
          },
        },
      });
    }
  };

  return (
    <div className="addquestionform mx-3">
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
            {question?.type}
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
      <label htmlFor="qs" className="mt-3 type">
        Question
      </label>

      {(question?.type === "Paragraph" ||
        question?.type === "Yes/No" ||
        question?.type === "Short answer" ||
        question?.type === "Dropdown" ||
        question?.type === "Video question" ||
        question?.type === "Multiple choice") && (
        <input
          className="w-100 dropdown text"
          type="text"
          name="qs"
          id="qs"
          placeholder="Type here"
          onChange={(e) =>
            setQuestion({ ...question, question: e.target.value })
          }
        />
      )}
      {question?.type === "Number" && (
        <input
          className="w-100 dropdown text"
          type="number"
          name="number"
          id="number"
          placeholder="Type here"
          onChange={(e) =>
            setQuestion({ ...question, question: e.target.value })
          }
        />
      )}
      {question?.type === "Date" && (
        <input
          className="w-100 dropdown text"
          type="date"
          name="date"
          id="date"
          placeholder="Type here"
          onChange={(e) =>
            setQuestion({ ...question, question: e.target.value })
          }
        />
      )}
      {question?.type === "File upload" && (
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
      {question?.type === "Yes/No" && (
        <div className="mt-2">
          <Checkbox
            checked={question?.disqualify}
            onChange={(e: CheckboxChangeEvent) =>
              setQuestion({ ...question, disqualify: e.target.checked })
            }
          >
            Disqualify candidate if the answer is no
          </Checkbox>
        </div>
      )}
      {(question?.type === "Dropdown" ||
        question?.type === "Multiple choice") && (
        <div className="mt-3">
          <label htmlFor="" className="type" style={{ marginLeft: "20px" }}>
            Choice
          </label>
          {question?.choices?.map((choice, index) => (
            <AddChoice
              key={index}
              question={question}
              setQuestion={setQuestion}
              choice={choice}
              index={index}
              showPlus={index + 1 === question.choices.length}
            />
          ))}
          <div className="mt-2">
            <Checkbox
              checked={question?.other}
              onChange={(e: CheckboxChangeEvent) =>
                setQuestion({ ...question, other: e.target.checked })
              }
            >
              Enable “Other” option
            </Checkbox>
          </div>
          {question?.type === "Multiple choice" && (
            <div className="mt-4">
              <label htmlFor="choice" className="type">
                Max choice allowed
              </label>
              <input
                type="number"
                className="dropdown w-100 text mt-2"
                name="choice"
                id="choice"
                placeholder="Enter number of choice allowed here"
                onChange={(e) =>
                  setQuestion({
                    ...question,
                    maxChoice: parseInt(e.target.value),
                  })
                }
              />
            </div>
          )}
        </div>
      )}
      {question?.type === "Video question" && (
        <VideoQuestion question={question} setQuestion={setQuestion} />
      )}
      <div className="mt-4 footer d-flex justify-content-between align-items-center">
        <button
          onClick={() => {
            setOpen(false);
          }}
          className="my-3 d-flex align-items-center deleteqs"
          style={{ color: "red" }}
        >
          <CloseOutlined style={{ fontSize: "20px" }} />
          <span className="questionbtn"> Delete question</span>
        </button>
        <button className="savebtn" onClick={saveQuestion}>
          Save
        </button>
      </div>
    </div>
  );
};
export default AddQuestionForm;
