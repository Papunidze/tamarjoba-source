import React, { useState, useRef } from "react";
import { Button, Form, Input, Select, Space, Typography } from "antd";
import { useDispatch } from "react-redux";

import WeekdayPicker from "./weekday-peeker";
import { scheduleCreate } from "../../action/schedule";

const { Option } = Select;

const AddGroup = () => {
  const [form] = Form.useForm();
  const [group, setGroup] = useState("A1");
  const [city, setCity] = useState("თბილისი");
  const [date, setData] = useState([]);
  const [err, setError] = useState("");
  const dispatch = useDispatch();
  const weekdayPickerRef = useRef(null); // Ref for WeekdayPicker component

  const onFinish = (data) => {
    if (date.length) {
      const result = Object.assign(
        data,
        { date: date },
        { city: city },
        { group: group }
      );
      dispatch(scheduleCreate(result));
      setError("");
      form.resetFields(); // Reset all form inputs
      weekdayPickerRef.current.reset(); // Reset WeekdayPicker component
    } else {
      setError("Please select at least one weekday");
    }
  };

  return (
    <Form
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        boxShadow: "0",
      }}
      form={form}
      onFinish={onFinish}
    >
      <Space direction="vertical" size={12}>
        <Space direction="horizontal" size={12}>
          <Form.Item
            name="name"
            label="name"
            rules={[{ required: true, message: "Input is required" }]}
          >
            <Input placeholder="სახელი" />
          </Form.Item>
          <Form.Item
            name="address"
            label="address"
            rules={[{ required: true, message: "Input is required" }]}
          >
            <Input placeholder="მისამართი" />
          </Form.Item>
        </Space>
        <Space direction="horizontal" size={12}>
          <Form.Item label="ქალაქი">
            <Select
              value={city}
              onChange={(value) => setCity(value)}
              size="medium"
            >
              <Option value="ბათუმი">ბათუმი</Option>
              <Option value="თბილისი">თბილისი</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Group">
            <Select
              value={group}
              onChange={(value) => setGroup(value)}
              size="medium"
            >
              <Option value="A1">A1</Option>
              <Option value="A2">A2</Option>
              <Option value="A2+">A2+</Option>
            </Select>
          </Form.Item>
        </Space>
        <Typography.Text style={{ fontWeight: "bold" }}>
          Schedule
        </Typography.Text>
        <WeekdayPicker ref={weekdayPickerRef} setData={setData} />
        {<span style={{ color: "red" }}>{err && err}</span>}
        <Button type="primary" htmlType="submit" danger>
          დამატება
        </Button>
      </Space>
    </Form>
  );
};

export default AddGroup;
