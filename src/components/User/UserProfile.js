import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Space, Avatar, Button, Spin } from 'antd';
import MainLayout from '../../components/Layout/Layout';
import { connect } from 'react-redux';
import PersistUser from './PersistUser';
import { updateUser, getUser } from '../../store/user/userActions';
import { withRouter } from 'react-router-dom';

const UserProfile = (props) => {
    const [openModal, setOpenModal] = useState();

    useEffect(() => {
        props.getUser(props.history.location.state?.id);
    }, []);

    useEffect(() => {
        props.user.updateUserStatus && props.getUser(props.history.location.state?.id);
    }, [props.user.updateUserStatus]);



    const cardTitle =
        <Space>
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" ></Avatar>
            <span>{props.user?.user?.userName} Profile</span>
        </Space>

    const handleEditUser = () => {
        setOpenModal(!openModal);
    }

    const handleSubmit = (values) => {
        props.updateUser(values);
        handleEditUser();
    }

    return (
        <MainLayout>
            <Row gutter={10} type="flex"
                style={{ alignItems: "center" }}
                justify="center">
                <Col lg={16} md={16} sm={16} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Card title={cardTitle} bordered={false} >
                        <Spin spinning={props.user?.loading}>
                            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingBottom: '20px' }}>
                                <Space><span>User Name: </span><span>{props.user?.user?.userName}</span></Space>
                                <Space><span>First Name: </span><span>{props.user?.user?.firstName}</span></Space>
                                <Space><span>Last Name: </span><span>{props.user?.user?.lastName}</span></Space>
                            </div>

                            <Button type="primary" onClick={handleEditUser}>Edit User</Button>
                        </Spin>
                    </Card>
                </Col>
            </Row>
            <PersistUser type="update" handleSubmit={handleSubmit} open={openModal} user={props.user?.user} handleModal={handleEditUser} />
        </MainLayout>
    );
}

const mapStateToProps = (state) => ({
    user: state.User
})

const mapDispatchToProps = {
    updateUser,
    getUser
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserProfile));
