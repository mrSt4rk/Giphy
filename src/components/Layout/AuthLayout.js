import React from 'react';
import { Layout } from 'antd';
import './AuthLayout.css';
const {  Content } = Layout;

const AuthLayout = ({ children }) => {
    return (
        <Layout style={{ height: '100%', width: '100%' }}>
            <Content style={{ padding: '0 50px' }}>
                <div className="site-layout-content">{children}</div>
            </Content>
        </Layout>
    );
}

export default AuthLayout;
