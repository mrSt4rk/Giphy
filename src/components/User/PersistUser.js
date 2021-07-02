import React, { useEffect } from 'react';
import { Modal, Form, Button, Input } from 'antd';


const PersistUser = (props) => {
    const [form] = Form.useForm();

    useEffect(() => {
        form && form.resetFields();
    }, [form]);

    useEffect(() => {
        if (props.type === 'update' && props.user) {
            const { userName, firstName, lastName, id, token } = props.user;
            form.setFieldsValue({
                userName: userName,
                firstName: firstName,
                lastName: lastName,
                id: id,
                token: token
            })
        }
    }, [props.user])

    const handleSubmit = (values) => {
        if (props.user) {
            values.token = props.user.token;
            values.id = props.user.id;
            props.handleSubmit(values);
        } else {
            props.handleSubmit(values);
        }

        form.resetFields();
    }

    return (
        <div>
            <Modal visible={props.open} footer={null} title={props.type === 'add' ? "Add New User" : "Edit User"} onCancel={props.handleModal} forceRender>
                <Form name="add-user" form={form} onFinish={handleSubmit}>
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

                    {props.type === 'add' &&
                        <Form.Item label="Password" name="password" rules={[
                            {
                                required: true,
                                message: 'Password is required'
                            }
                        ]}>
                            <Input placeholder="Password" type="password" />
                        </Form.Item>
                    }

                    <Form.Item>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}



export default PersistUser;
