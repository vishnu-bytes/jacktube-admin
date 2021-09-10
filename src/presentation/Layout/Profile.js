import React from 'react';
import { Avatar, Dropdown, Button, Menu, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const Profile = () => {
    const menu = (
        <div className="profileBody">
            <div className="top">
                <div className="left">
                    <Avatar
                        style={{
                            color: '#f56a00',
                            backgroundColor: '#fde3cf',
                        }}
                    >
                        U
    </Avatar>
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
                <Avatar
                    style={{
                        color: '#f56a00',
                        backgroundColor: '#fde3cf',
                    }}>
                    U
                </Avatar>
            </Dropdown>
        </div>

    );
};

export default Profile;