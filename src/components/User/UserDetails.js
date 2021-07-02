import React from 'react';
import { Modal, Row, Col, Card, Space } from 'antd';


const UserDetails = (props) => {
    return (
        <div>
            <Modal visible={props.open} footer={null} title="User Details" onCancel={props.handleModal} forceRender>
                <Row gutter={10} type="flex"
                    style={{ alignItems: "center" }}
                    justify="center">
                    <Col lg={16} md={16} sm={16} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Card title={props.user.userName} bordered={false} >
                            <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'space-between', paddingBottom: '20px' }}>
                                <Space><span>User Name: </span><span>{props.user?.userName}</span></Space>
                                <Space><span>First Name: </span><span>{props.user?.firstName}</span></Space>
                                <Space><span>Last Name: </span><span>{props.user?.lastName}</span></Space>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Modal>
        </div>
    );
}

export default UserDetails;
