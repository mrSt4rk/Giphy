import React from 'react';
import { Layout, Menu, Avatar, Space, Button } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../store/services/User/user.service';

const { Header, Footer, Content } = Layout;

const MainLayout = ({ children, user }) => {

    return (
        <Layout style={{ height: "100vh", overflow: "auto" }}>
            <Header>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Menu theme="dark" mode="horizontal" style={{ width: '100%' }}>
                        <Menu.Item key={1}><Link to='/'>Search</Link></Menu.Item>
                        <Menu.Item key={2}><Link to='/users'>Users</Link></Menu.Item>
                        <Menu.Item key={3}><Link to='/todo'>Todos</Link></Menu.Item>
                    </Menu>
                    <Space>
                        <Link to={{ pathname: '/user', state: { id: user.userLoggedIn?.id } }} style={{ color: '#a8dadc' }}>{user.userLoggedIn?.userName}</Link>
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" ></Avatar>
                        <Button type="link" onClick={() => logout()}>Log Out</Button>
                    </Space>
                </div>
            </Header>
            <Content style={{ padding: '50px' }}>
                {children}
            </Content>
            <Footer style={{ textAlign: 'center' }}>Develoop</Footer>
        </Layout >
    );
}

const mapStateToProps = (state) => ({
    user: state.User
});

const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
