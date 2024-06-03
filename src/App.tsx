import React, { useState } from 'react';
import './App.css';
import { Col, Row, Input, DatePicker, Select, Space, Button, Table, Form } from 'antd';

const { Option } = Select;

const columns = [
  {
    title: 'Username',
    
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: 'Firstname',
    dataIndex: 'firstname',
    key: 'firstname',
  },
  {
    title: 'Lastname',
    dataIndex: 'lastname',
    key: 'lastname',
  },
  {
    title: 'Date of Birth',
    dataIndex: 'dateofbirth',
    key: 'dateofbirth',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
  },
];

const initialData = [
  {
    key: '1',
    username: 'fguncevic',
    firstname: 'Filip',
    lastname: 'Guncevic',
    dateofbirth: '2001-01-07',
    gender: 'Male',
  },
  {
    key: '2',
    username: 'dguncevic',
    firstname: 'Domagoj',
    lastname: 'Guncecic',
    dateofbirth: '1997-12-20',
    gender: 'Male',
  },
  
];

function App() {
  const [form] = Form.useForm();
  const [data, setData] = useState(initialData);

  const handleSave = (values:any) => {
    const newUser = {
      key: data.length + 1, 
      username: values.username,
      firstname: values.firstname,
      lastname: values.lastname,
      dateofbirth: values.dateofbirth.format('YYYY-MM-DD'),
      gender: values.gender,
    };

    console.log('New User:', newUser);

    try {
      setData((prevData:any) => [...prevData, newUser]);
      form.resetFields();
    } catch (error) {
      console.error('Error adding new user:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Row justify="start" style={{ width: '100%', padding: '20px' }}>
          <Col span={8}>
            <Form form={form} onFinish={handleSave}>
              <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
                  <Input placeholder="Username" />
                </Form.Item>
                <Form.Item name="firstname" rules={[{ required: true, message: 'Please input your First name!' }]}>
                  <Input placeholder="First name" />
                </Form.Item>
                <Form.Item name="lastname" rules={[{ required: true, message: 'Please input your Last name!' }]}>
                  <Input placeholder="Last name" />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
                  <Input.Password placeholder="Password" />
                </Form.Item>
                <Form.Item name="dateofbirth" rules={[{ required: true, message: 'Please select your Date of Birth!' }]}>
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item name="gender" rules={[{ required: true, message: 'Please select your Gender!' }]}>
                  <Select
                    placeholder="Select Gender"
                    style={{ width: '100%' }}
                  >
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                  </Select>
                </Form.Item>
                <Row justify="start" gutter={16}>
                  <Col>
                    <Button type="primary" htmlType="submit">Save</Button>
                  </Col>
                  <Col>
                    <Button type="default" onClick={() => form.resetFields()}>Cancel</Button>
                  </Col>
                </Row>
              </Space>
            </Form>
          </Col>
          <Col span={8} style={{ marginLeft: '100px' }}>
            <Table columns={columns} dataSource={data} pagination={false} />
          </Col>
        </Row>
      </header>
    </div>
  );
}

export default App;