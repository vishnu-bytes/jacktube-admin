import React from "react";
import { Menu } from "antd";
import { NavLink, useRouteMatch, Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import { routes } from "../common/Routes";
import {
  categories,
  dashboard,
  experts,
  notification,
  users,
  webinar,
} from "../common/Assets/Icons";

const MenuItems = ({ darkMode, topMenu, events }) => {
  const { path } = useRouteMatch();

  const pathName = window.location.pathname;
  const pathArray = pathName.split(path);
  const mainPath = pathArray[1];
  const mainPathSplit = mainPath.split("/");

  const [openKeys, setOpenKeys] = React.useState([
    `${mainPathSplit.length > 2 ? mainPathSplit[1] : "dashboard"}`,
  ]);

  const onOpenChange = (keys) => {
    setOpenKeys(
      keys[keys.length - 1] !== "recharts"
        ? [keys.length && keys[keys.length - 1]]
        : keys
    );
  };

  const onClick = (item) => {
    if (item.keyPath.length === 1) setOpenKeys([]);
  };

  return (
    <Menu
      onOpenChange={onOpenChange}
      onClick={onClick}
      mode={!topMenu || window.innerWidth <= 991 ? "inline" : "horizontal"}
      theme={darkMode && "dark"}
      // // eslint-disable-next-line no-nested-ternary
      defaultSelectedKeys={[
        `${
          mainPathSplit.length === 1
            ? "home"
            : mainPathSplit.length === 2
            ? mainPathSplit[1]
            : mainPathSplit[2]
        }`,
      ]}
      defaultOpenKeys={
        !topMenu
          ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : "dashboard"}`]
          : []
      }
      overflowedIndicator={<FeatherIcon icon="more-vertical" />}
      openKeys={openKeys}
    >
      <Menu.Item
        key="dashboard"
        icon={
          <NavLink className="menuItem-icon" to={routes.DASHBOARD}>
            <img src={dashboard} />
          </NavLink>
        }
      >
        <Link to={routes.DASHBOARD}>Dashboard</Link>
      </Menu.Item>
      {/* <Menu.Item
        key="schedule"
        icon={
          <NavLink className="menuItem-icon" to={`${routes.CALENDER}/month`}>
            <FeatherIcon icon="calendar" />
          </NavLink>
        }
      >
        <Link to={`${routes.CALENDER}/month`}>Schedule</Link>
      </Menu.Item> */}
      <Menu.Item
        key="studenlist"
        icon={
          <NavLink className="menuItem-icon" to={routes.STUDENTLIST}>
            <img src={users} />
          </NavLink>
        }
      >
        <Link to={routes.STUDENTLIST}>User</Link>
      </Menu.Item>
      <Menu.Item
        key="categories"
        icon={
          <NavLink className="menuItem-icon" to={routes.CATEGORY}>
            <img src={categories} />
          </NavLink>
        }
      >
        <Link to={routes.CATEGORY}>Category</Link>
      </Menu.Item>
      <Menu.Item
        key="course"
        icon={
          <NavLink className="menuItem-icon" to={routes.WEBINAR}>
            <img src={webinar} />
          </NavLink>
        }
      >
        <Link to={routes.WEBINAR}>Webinars</Link>
      </Menu.Item>
      <Menu.Item
        key="blog"
        icon={
          <NavLink className="menuItem-icon" to={routes.EXPERTS}>
            <img src={experts} />
          </NavLink>
        }
      >
        <Link to={routes.EXPERTS}>Experts</Link>
      </Menu.Item>
      <Menu.Item
        key="facultylist"
        icon={
          <NavLink className="menuItem-icon" to={routes.NOTIFICATION}>
            <img src={notification} />
          </NavLink>
        }
      >
        <Link to={routes.NOTIFICATION}>Notifications</Link>
      </Menu.Item>
    </Menu>
  );
};

export default MenuItems;
