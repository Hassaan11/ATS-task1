import axios from "axios";
import "./header.css";

const Header = ({ data }: any) => {
  const saveData = () => {
    console.log("SAVE DATA", data);
    axios
      .put(
        "http://127.0.0.1:4010/api/341.4390838681663/programs/accusamus/application-form",
        data
      )
      .then((res) => console.log("Response", res))
      .catch((err) => console.log("Put Error", err));
  };
  return (
    <>
      <div className="mt-2 d-flex justify-content-end">
        <button className="btn btn-default savebtn1" onClick={saveData}>
          {" "}
          Save & Continue{" "}
        </button>
      </div>
      <div className="headerComponent d-flex justify-content-center align-items-center bg-white">
        <span>Program Details</span>
        <span className="active">Application Form</span>
        <span>Workflow</span>
        <div className="line"></div>
        <span>Preview</span>
      </div>
    </>
  );
};

export default Header;
