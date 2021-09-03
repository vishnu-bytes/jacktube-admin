import React from 'react';
import { Avatar, Dropdown, Button, Menu, Divider } from 'antd';

const Profile = () => {
    const menu = (
        <div className="profileBody">
            <div className="top">
                <div className="left">
                <Avatar src="https://cdn0.iconfinder.com/data/icons/user-pictures/100/matureman1-512.png" />
                </div>
                <div className="right">
                    <p className="name">
                    John Doe
                    </p>
                    <span className="email">
                    johndoe@example.com
                    </span>
                </div>
            </div>
            <Divider />

            <div className="bottom">
            <Button type="primary">Sign Out</Button>
            </div>

        </div>
    );
    return (
        <div className="profile">

            <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
                <Avatar src="https://cdn0.iconfinder.com/data/icons/user-pictures/100/matureman1-512.png" />
            </Dropdown>
        </div>

    );
};

export default Profile;