import React from 'react';
import { Form, Button, Input, Row, Col, Space, Card } from 'antd';
import AuthLayout from '../Layout/AuthLayout';
import { connect } from 'react-redux';
import { registerUser } from '../../store/user/userActions';
import { withRouter, Link } from 'react-router-dom';

const Register = (props) => {
    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        props.registerUser(values);
    }


    return (
        <AuthLayout>
            <Row>
                <Col lg={8} md={8} sm={12} xs={12} offset={8}>
                    <Card title="Register">
                        <Form name="register-form" form={form} onFinish={handleSubmit} layout="vertical" >
                            <Form.Item label="User Name" name="userName" rules={[
                                {
                                    required: true,
                                    message: 'User Name is required'
                                }
                            ]}>
                                <Input placeholder="User Name" />
                            </Form.Item>
                            <Form.Item label="First Name" name="firstName" rules={[
                                {
                                    required: true,
                                    message: 'First Name is required'
                                }
                            ]}>
                                <Input placeholder="First Name" />
                            </Form.Item>
                            <Form.Item label="Last Name" name="lastName" rules={[
                                {
                                    required: true,
                                    message: 'Last Name is required'
                                }
                            ]}>
                                <Input placeholder="Last Name" />
                            </Form.Item>
                            <Form.Item label="Password" name="password" rules={[
                                {
                                    required: true,
                                    message: 'Password is required'
                                }
                            ]}>
                                <Input placeholder="Password" type="password" />
                            </Form.Item>
                            <Form.Item>
                                <Space>
                                    <Button type="primary" htmlType="submit">Register</Button>
                                    <Link to="/login">Login</Link>
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
    User: state.User
});

const mapDispatchToProps = {
    registerUser
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));
