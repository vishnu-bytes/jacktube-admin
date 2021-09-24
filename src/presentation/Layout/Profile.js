import React from 'react';
import { Avatar, Dropdown, Button, Menu, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import firebase from "../../config/api/firebase";
import { setStorageItem ,getStorageItem,removeStorageItem} from "../../infrastructure/common/local";
import { routes } from "../common/Routes/routes";



const auth=firebase.auth();


const Profile = () => {
    const signOut=()=>{
      const signOutData=  auth.signOut();
      console.log("signout",signOutData)
      console.log("signout",auth.currentUser)
      removeStorageItem("token");
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
                    U
                </Avatar>
            </Dropdown>
        </div>

    );
};

export default Profile;