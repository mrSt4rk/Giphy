import React, { useEffect } from 'react';
import { Row, Col, Input, Button, Space, Form, Spin, Card } from 'antd';
import { getGifs } from '../../store/gifs/Actions';
import { getUser } from '../../store/user/userActions';
import { connect } from 'react-redux';


const Search = (props) => {
    const [form] = Form.useForm();

    const handleSearch = (values) => {
        props.getGifs(values.search);
    }

    useEffect(() => {
        props.getUser(1);
    }, [])


    return (
        <>
            <Row gutter={10} type="flex"
                style={{ alignItems: "center" }}
                justify="center">
                <Col lg={16} md={16} sm={16} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Space direction="vertical">
                        <Form fomr={form} onFinish={handleSearch} layout="vertical">
                            <Form.Item name="search">
                                <Input placeholder="Search Gifs..." />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    loading={props.gifs?.loading}
                                    type="primary" htmlType="submit">Go</Button>
                            </Form.Item>
                        </Form>
                    </Space>
                </Col>
            </Row>
            <Row gutter={10} type="flex"
                style={{ alignItems: "center" }}
                justify="center">
                <Col span={16}>
                    <Card style={{ borderRadius: '5px', padding: '20px' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {props.gifs?.gifsResult?.map(item => (
                                <img width="200" height="200" key={item.id} src={item.images?.original?.url} alt={item.id} />
                            ))}
                        </div>
                    </Card>
                </Col>
            </Row>
        </>

    );
}

const mapStateToProps = (state) => ({
    gifs: state.Gifs,
    user: state.User
});

const mapDispatchToProps = {
    getGifs,
    getUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);

