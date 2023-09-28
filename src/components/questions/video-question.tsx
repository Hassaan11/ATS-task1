import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown, Space } from "antd";

const VideoQuestion = ({ question, setQuestion }: any) => {
  const items: MenuProps["items"] = [
    {
      label: "Minutes",
      key: "1",
    },
    {
      label: "Seconds",
      key: "2",
    },
  ];
  const handleMenuClick: MenuProps["onClick"] = (e: any) => {
    if (e.key) setQuestion({ ...question, time: e?.domEvent.target.innerText });
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <div className="mt-3">
      <textarea
        className="w-100 dropdown text"
        style={{ height: "auto", minHeight: "80px" }}
        placeholder="Additional information"
        value={question.videInfo}
        onChange={(e) => setQuestion({ ...question, videInfo: e.target.value })}
      ></textarea>
      <div className="d-flex mt-2">
        <input
          type="number"
          placeholder="Max duration of video"
          className="w-50 dropdown text"
          value={question.duration}
          style={{ marginRight: "20px" }}
          onChange={(e) =>
            setQuestion({ ...question, duration: e.target.value })
          }
        />

        <Dropdown
          className="w-50 dropdown"
          menu={menuProps}
          trigger={["click"]}
        >
          <Button>
            <Space className="d-flex justify-content-between">
              {question?.time || "Select Minute or Seconds"}
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      </div>
    </div>
  );
};
export default VideoQuestion;
