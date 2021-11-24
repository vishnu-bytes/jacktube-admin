import React, { useEffect, useState } from 'react';
import { Avatar, Dropdown, Button, Menu, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import firebase from "../../config/api/firebase";
import { setStorageItem, getStorageItem, removeStorageItem } from "../../infrastructure/common/local";
import { routes } from "../common/Routes/routes";


const auth = firebase.auth();


const Profile = () => {
    const [email, setEmail] = useState("")

    useEffect(() => {
        console.log("email", getStorageItem("email"))
        getStorageItem("email").then((res) => {
            console.log(res, "res");
            setEmail(res)
        });
    }, []);

    console.log("email in profile", email)
    const signOut = () => {
        const signOutData = auth.signOut();
        console.log("signout", signOutData)
        console.log("signout", auth.currentUser)
        removeStorageItem("token");
        removeStorageItem("email");
        window.location.replace(routes.LOGIN);


    }
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
                        {email?.substring(0, 1).toUpperCase()}
                    </Avatar>
                </div>
                <div className="right">
                    <span className="email">
                        {email}
                    </span>
                </div>
            </div>
            <Divider />
            <div className="bottom">
                <Button type="primary" onClick={signOut}>Sign Out</Button>
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
                    {email.substring(0, 1).toUpperCase()}
                </Avatar>
            </Dropdown>
        </div>
    );
};

export default Profile;