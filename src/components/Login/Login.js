import React from 'react';
import { Form, Button, Input, Row, Col, Space, Card } from 'antd';
import AuthLayout from '../Layout/AuthLayout';
import { loginUser } from '../../store/user/userActions';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

const Login = (props) => {
    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        props.loginUser(values);
    }

    React.useEffect(() => {
        props.user?.userLoggedIn && props.history.push('/');
    }, [props.user]);

    return (
        <AuthLayout>
            <Row>
                <Col lg={8} md={8} sm={12} xs={12} offset={8}>
                    <Card title="Login">
                        <Form name="login-form" form={form} onFinish={handleSubmit} layout="vertical" >
                            <Form.Item name="userName" rules={[
                                {
                                    required: true,
                                    message: 'User Name is required'
                                }
                            ]}>
                                <Input placeholder="User Name" />
                            </Form.Item>
                            <Form.Item name="password" rules={[
                                {
                                    required: true,
                                    message: 'Password is required'
                                }
                            ]}>
                                <Input placeholder="Password" type="password" />
                            </Form.Item>
                            <Form.Item>
                                <Space>
                                    <Button type="primary" htmlType="submit">Login</Button>
                                    <Link to="/register">Register</Link>
                                </Space>
                            </Form.Item>
                        </Form>
                    </Card>


                </Col>

            </Row>
        </AuthLayout>
    );
}

const mapStateToProps = (state) => ({
    user: state.User
})


const mapDispatchToProps = {
    loginUser
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
