import {
  MenuOutlined,
  HomeOutlined,
  FileDoneOutlined,
  UserOutlined,
} from "@ant-design/icons";

import "./sidebar.css";

const Sidebar = () => {
  return (
    <div className="d-flex flex-column justify-content-between sidebar bg-white">
      <div className="d-flex flex-column">
        <MenuOutlined style={{ fontSize: 20, marginTop: 20 }} />
        <HomeOutlined style={{ fontSize: 20, marginTop: 30 }} />
        <FileDoneOutlined style={{ fontSize: 20, marginTop: 20 }} />
      </div>
      <>
        <UserOutlined style={{ fontSize: 20, marginBottom: 50 }} />
      </>
    </div>
  );
};

export default Sidebar;
