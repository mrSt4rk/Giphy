import React, { useEffect, useState } from 'react';
import { getUsers, registerUser, deleteUser } from '../../store/user/userActions';
import { connect } from 'react-redux';
import { Table, Row, Col, Popconfirm, Spin, Button, Space } from 'antd';
import MainLayout from '../Layout/Layout';
import PersistUser from './PersistUser';
import UserDetails from './UserDetails';

const UserList = (props) => {
    const [selectedUser, setSelectedUser] = useState();
    const [openPersistModal, setOpenPersistModal] = useState(false);
    const [openDetailsModal, setOpenDetailsModal] = useState(false);

    useEffect(() => {
        props.getUsers();
    }, []);

    useEffect(() => {
        props.user.addUserStatus && props.getUsers();
    }, [props.user.addUserStatus]);

    useEffect(() => {
        props.user.deleteUserStatus && props.getUsers();
    }, [props.user.deleteUserStatus]);

    const handleAddUser = () => { setOpenPersistModal(!openPersistModal); }
    const handleDeleteUser = (id) => { props.deleteUser(id); }
    const handleSubmit = (values) => { setOpenPersistModal(!openPersistModal); props.registerUser(values); }

    const columns = [
        { title: "First Name", dataIndex: 'firstName', key: 'firstName' },
        { title: "Last Name", dataIndex: 'lastName', key: 'lastName' },
        { title: "User Name", dataIndex: 'userName', key: 'userName' },
        {
            title: "", dataIndex: '', key: 'x', render: (text, record) =>
                props.user.users.length !== 0 ? (
                    <span >
                        <Popconfirm
                            title="Are you sure you want to delete this item?"
                            onConfirm={(e) => { handleDeleteUser(record.id); e.stopPropagation(); }}
                            okText="Delete"
                            cancelText="Cancel"
                        >
                            <a onClick={(e) => { e.stopPropagation(); }}>Delete User</a>
                        </Popconfirm>
                    </span>
                ) : null
        }];

    const onUserClicked = (record) => {
        setOpenDetailsModal(!openDetailsModal);
        setSelectedUser(record)
    }

    return (
        <MainLayout>
            <Row gutter={10} type="flex"
                style={{ alignItems: "center" }}
                justify="center">
                <Col lg={12} md={16} sm={16} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Space direction="vertical">
                        <Button type="primary" onClick={() => setOpenPersistModal(!openPersistModal)}>Add User</Button>

                        <Spin spinning={props.user.loading}>
                            <Table columns={columns} dataSource={props.user && props.user.users} onRow={(record, rowIndex) => (
                                { onClick: () => onUserClicked(record) }
                            )} />
                        </Spin>
                    </Space>
                </Col>
            </Row>
            <PersistUser type="add" handleSubmit={handleSubmit} open={openPersistModal} handleModal={handleAddUser} />
            {selectedUser && <UserDetails open={openDetailsModal} user={selectedUser} handleModal={() => setOpenDetailsModal(!openDetailsModal)} />}
        </MainLayout>
    );
}

const mapStateToProps = (state) => ({
    user: state.User
});

const mapDispatchToProps = {
    getUsers,
    registerUser,
    deleteUser
}
export default connect(mapStateToProps, mapDispatchToProps)(UserList);
