import { Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import PageLayout from "../../layout/app-page";
import Login from "../../modules/auth/login";
import Register from "../../modules/auth/register";
import Panel from "../../util/panel";
import styles from "./styles/styles";

const Authorization = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, value) => {
    setValue(value);
  };
  return (
    <Box sx={{ ...styles.mainContainer }}>
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ style: { ...styles.tabsBorder } }}
      >
        <Tab label="ავტორიზაცია" />
        <Tab label="რეგისტრაცია" />
      </Tabs>
      <PageLayout>
        <Panel value={value} index={0}>
          <Login />
        </Panel>
        <Panel value={value} index={1}>
          <Register />
        </Panel>
      </PageLayout>
    </Box>
  );
};

export default Authorization;
