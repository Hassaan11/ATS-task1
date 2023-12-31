import { useEffect, useState } from "react";
import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import axios from "axios";

import Header from "../../components/header/header";
import PersonalInformation from "../../components/personal-information/personal-information";
import ProfileInformation from "../../components/profile-information/profile-information";
import Sidebar from "../../components/sidebar/sidebar";
import { Data } from "../../types/types";
import AdditionalQuestions from "../../components/additional-questions/additional-questions";

import "./Home.css";

const Home = () => {
  const [data, setData] = useState<Data>({
    data: {
      id: "497f6eca-6276-4993-bfeb-53cbbbba6f08",
      type: "applicationForm",
      attributes: {
        coverImage: "http://example.com",
        personalInformation: {
          firstName: {
            internalUse: false,
            show: true,
          },
          lastName: {
            internalUse: false,
            show: true,
          },
          emailId: {
            internalUse: false,
            show: true,
          },
          phoneNumber: {
            internalUse: false,
            show: true,
          },
          nationality: {
            internalUse: false,
            show: true,
          },
          currentResidence: {
            internalUse: false,
            show: true,
          },
          idNumber: {
            internalUse: false,
            show: true,
          },
          dateOfBirth: {
            internalUse: false,
            show: true,
          },
          gender: {
            internalUse: false,
            show: true,
          },
          personalQuestions: [
            {
              id: "497f6eca-6276-4993-bfeb-53cbbbba6f08",
              type: "Paragraph",
              question: "string",
              choices: ["string"],
              maxChoice: 0,
              disqualify: false,
              other: false,
            },
          ],
        },
        profile: {
          education: {
            mandatory: true,
            show: true,
          },
          experience: {
            mandatory: true,
            show: true,
          },
          resume: {
            mandatory: true,
            show: true,
          },
          profileQuestions: [
            {
              id: "497f6eca-6276-4993-bfeb-53cbbbba6f08",
              type: "Paragraph",
              question: "string",
              choices: ["string"],
              maxChoice: 0,
              disqualify: false,
              other: false,
            },
          ],
        },
        customisedQuestions: [
          {
            id: "497f6eca-6276-4993-bfeb-53cbbbba6f08",
            type: "Paragraph",
            question: "string",
            choices: ["string"],
            maxChoice: 0,
            disqualify: false,
            other: false,
          },
        ],
      },
    },
  });
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(
        "http://127.0.0.1:4010/api/376.74211850100164/programs/sequi/application-form"
      )
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setError("");
      })
      .catch((err) => {
        setError(err?.message);
        console.log("Get Error", err);
      });
  }, []);

  const handleButtonClick = () => {
    document.getElementById("fileInput")?.click();
  };
  const handleFileInput = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      if (file.size <= 1024 * 1024) {
        if (data) {
          if (file.type.startsWith("image/")) {
            setImage(URL.createObjectURL(file));
            const newData: Data = { ...data };
            newData.data.attributes.coverImage = URL.createObjectURL(file);
            setData(newData);
          } else {
            alert("Please select an image file.");
          }
        }
      } else {
        alert("File size exceeds the 1MB limit. Please choose a smaller file.");
        e.target.value = null;
      }
    } else {
      console.log("No file selected.");
    }
  };

  const removeImg = () => {
    setImage("");
    setTimeout(() => handleButtonClick(), 500);
  };

  return (
    <div>
      <div className="d-flex">
        <Sidebar />
        <div className="d-flex-col w-100">
          <Header data={data} />
          {error && (
            <h6 className="mt-4 text-center">
              {`${error} as backend server is not running so I have added the default state`}{" "}
            </h6>
          )}
          <div className="homecontainer">
            <div className="headingcontainer shadow bg-white">
              <h4 className="title">Upload cover image</h4>
              {image ? (
                <>
                  <img className="displayImg" src={image} alt="" />
                  <button
                    onClick={removeImg}
                    className="m-3 mb-0 d-flex align-items-center deleteqs"
                    style={{ color: "#A80000" }}
                  >
                    <CloseOutlined
                      style={{ fontSize: "15px", marginTop: "5px" }}
                    />
                    <span className="deleteImg"> Delete & re-upload</span>
                  </button>
                </>
              ) : (
                <button
                  className="uploadimg"
                  id="upload"
                  onClick={handleButtonClick}
                >
                  <input
                    type="file"
                    hidden
                    id="fileInput"
                    onChange={handleFileInput}
                  />
                  <UploadOutlined style={{ fontSize: 40 }} />
                  <h5>Upload cover image</h5>
                  <h6>16:9 ratio is recommended. Max image size 1mb</h6>
                </button>
              )}
            </div>

            <PersonalInformation data={data} setData={setData} />
            <ProfileInformation data={data} setData={setData} />
            <AdditionalQuestions data={data} setData={setData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
