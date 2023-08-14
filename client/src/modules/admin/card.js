import { Button, Card, Divider, Form, Input, Select } from "antd";
import React, { useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  ScheduleOutlined,
  GroupOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import WeekdayPicker from "./weekday-peeker";
import { Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { scheduleDelete, scheduleEdit } from "../../action/schedule";
const { Option } = Select;
const CalendarCard = ({ isEditable, item }) => {
  const [date, setDate] = useState([]);
  const [isEdit, setEdit] = useState(false);
  const [group, setGroup] = React.useState(item.group);
  const [form] = Form.useForm();
  const [city, setCity] = React.useState(item.city);
  const dispatch = useDispatch();
  const onFinish = (data) => {
    let result = {};
    if (date.length) {
      result = Object.assign(
        data,
        { date: date },
        { city: city },
        { group: group }
      );
    } else {
      result = Object.assign(
        data,
        { date: item.date },
        { city: city },
        { group: group }
      );
    }
    dispatch(scheduleEdit(result, item._id));
    setEdit(false);
  };
  const handleDelete = () => {
    dispatch(scheduleDelete(item._id));
  };
  return (
    <Form
      form={form}
      onFinish={onFinish}
      style={{ width: "100%", maxWidth: 300, margin: "auto" }}
    >
      <Card
        style={{
          height: "100%",
          width: "100%",
          maxWidth: 300,
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          textAlign: "left",
        }}
        title={
          isEdit ? (
            <Form.Item label="ქალაქი" style={{ padding: 6, marginTop: "1rem" }}>
              <Select
                value={city}
                onChange={(value) => setCity(value)}
                size="medium"
              >
                <Option value="ბათუმი">ბათუმი</Option>
                <Option value="თბილისი">თბილისი</Option>
              </Select>
            </Form.Item>
          ) : (
            <span>{item.city}</span>
          )
        }
        actions={
          isEditable &&
          !isEdit && [
            <DeleteOutlined
              key="delete"
              style={{ color: "crimson" }}
              onClick={handleDelete}
            />,
            <EditOutlined
              key="edit"
              style={{ color: "crimson" }}
              onClick={() => setEdit(true)}
            />,
          ]
        }
      >
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 16 }}
        >
          {isEdit ? (
            <Form.Item
              name="name"
              initialValue={item.name}
              label="name"
              rules={[{ required: true, message: "Input is required" }]}
            >
              <Input />
            </Form.Item>
          ) : (
            <>
              <UserOutlined style={{ fontSize: 24, marginRight: 8 }} />
              <span style={{ fontWeight: "bold" }}>{item.name}</span>
            </>
          )}
        </div>
        <div style={{ marginBottom: 16 }}>
          <ScheduleOutlined style={{ fontSize: 20, marginRight: 8 }} />
          <span style={{ fontWeight: "bold" }}>Lecture Schedule:</span>
          <ul style={{ paddingLeft: 20 }}>
            {isEdit ? (
              <>
                <Divider />
                <WeekdayPicker setData={setDate} />
              </>
            ) : (
              <>
                {item.date?.map((element, index) => (
                  <li key={index}>
                    {element.weekday}: {element.time} AM
                  </li>
                ))}
              </>
            )}
          </ul>
        </div>
        <div style={{ marginBottom: 16 }}>
          {isEdit ? (
            <Form.Item
              name="address"
              initialValue={item.address}
              label="address"
              rules={[{ required: true, message: "Input is required" }]}
            >
              <Input />
            </Form.Item>
          ) : (
            <>
              <EnvironmentOutlined style={{ fontSize: 20, marginRight: 8 }} />
              <span style={{ fontWeight: "bold" }}>Address:</span>{" "}
              {item.address}
            </>
          )}
        </div>
        <div>
          {isEdit ? (
            <Form.Item label="Group" style={{ padding: 6, marginTop: "1rem" }}>
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
          ) : (
            <>
              <GroupOutlined style={{ fontSize: 20, marginRight: 8 }} />
              <span style={{ fontWeight: "bold" }}>Group:</span> {item.group}
            </>
          )}
        </div>

        {isEdit && (
          <>
            <Divider />
            <Stack
              sx={{
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <Button onClick={() => setEdit(false)} style={{ width: "100%" }}>
                Cancel
              </Button>
              <Divider type="vertical" />
              <Button htmlType="submit" danger style={{ width: "100%" }}>
                Save
              </Button>
            </Stack>
          </>
        )}
      </Card>
    </Form>
  );
};

export default CalendarCard;
