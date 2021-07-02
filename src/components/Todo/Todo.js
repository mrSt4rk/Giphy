import React, { useReducer, useState } from 'react';
import { Col, Row, Input, Button, Space, List, Card, Modal } from 'antd';
import MainLayout from '../Layout/Layout';
import * as actions from '../../store/todo/todoActionTypes';

const Todo = () => {
    const [todoItem, setTodoItem] = useState();
    const [openModal, setOpenModal] = useState(false);
    const initialState = {
        counter: 0,
        todos: [],
        todo: {}
    };

    const [state, dispatch] = useReducer((state = initialState, action) => {
        switch (action.type) {
            case actions.ADD_TODO: {
                const newTodo = {
                    id: state.counter + 1,
                    name: action.payload,
                };
                return { counter: state.counter + 1, todos: [...state.todos, newTodo] }
            }
            case actions.DELETE_TODO:

                return {
                    counter: state.counter,
                    todos: state.todos.filter(item => item.id !== action.id),
                };

            case actions.GET_TODO:
                return {
                    counter: state.counter,
                    todos: [...state.todos],
                    todo: state.todos.filter(item => item.id == action.id)[0],
                };

            default:
                return state;
        }
    });


    const handleAddTodo = (todoItem) => {
        dispatch({ type: actions.ADD_TODO, payload: todoItem });
    }

    const handleDeleteTodo = (id) => {
        dispatch({ type: actions.DELETE_TODO, id: id });
    }

    const handleViewTodo = (id) => {
        dispatch({ type: actions.GET_TODO, id: id });
        setOpenModal(!openModal);
    }


    return (
        <MainLayout>
            <Row gutter={10} type="flex"
                style={{ alignItems: "center" }}
                justify="center">
                <Col lg={12} md={16} sm={16} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Space direction="vertical">
                        <Input name="todoItem" onChange={(e) => setTodoItem(e.target.value)} placeholder="todo..." />
                        <Button type="primary" onClick={() => handleAddTodo(todoItem)}>Add</Button>
                        <Card title="Todo List">
                            {state &&
                                <List
                                    size="small"
                                    bordered
                                    dataSource={state.todos}
                                    renderItem={item => <List.Item
                                        actions={[<a key="view" onClick={() => handleViewTodo(item.id)}>View</a>, <a key="delete" onClick={() => handleDeleteTodo(item.id)}>Delete</a>]}
                                    >{item.name}</List.Item>}

                                />}
                        </Card>
                    </Space>
                    <Modal visible={openModal} onCancel={() => setOpenModal(!openModal)} onOk={() => setOpenModal(!openModal)}>
                        <span>{state && state.todo?.name}</span>
                    </Modal>
                </Col>
            </Row>
        </MainLayout>
    );
}

export default Todo;
