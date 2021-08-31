import React from "react";
import { Menu } from "antd";
import { NavLink, useRouteMatch, Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import { routes } from "../common/Routes";

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
            <FeatherIcon icon="home" />
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
            <FeatherIcon icon="user" />
          </NavLink>
        }
      >
        <Link to={routes.STUDENTLIST}>User</Link>
      </Menu.Item>
      <Menu.Item
        key="notification"
        icon={
          <NavLink className="menuItem-icon" to={routes.NOTIFICATION}>
            <FeatherIcon icon="bell" />
          </NavLink>
        }
      >
        <Link to={routes.NOTIFICATION}>Category</Link>
      </Menu.Item>
      <Menu.Item
        key="course"
        icon={
          <NavLink className="menuItem-icon" to={routes.WEBINAR}>
            <FeatherIcon icon="book" />
          </NavLink>
        }
      >
        <Link to={routes.WEBINAR}>Webinars</Link>
      </Menu.Item>
      <Menu.Item
        key="blog"
        icon={
          <NavLink className="menuItem-icon" to={routes.BLOG}>
            <FeatherIcon icon="edit-3" />
          </NavLink>
        }
      >
        <Link to={routes.BLOG}>Blogs</Link>
      </Menu.Item>
      <Menu.Item
        key="facultylist"
        icon={
          <NavLink className="menuItem-icon" to={routes.FACULTYLIST}>
            <FeatherIcon icon="users" />
          </NavLink>
        }
      >
        <Link to={routes.FACULTYLIST}>Faculty</Link>
      </Menu.Item>
    </Menu>
  );
};

export default MenuItems;
