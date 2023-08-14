import { Box, Paper, Tab, Tabs, useMediaQuery } from "@mui/material";
import React from "react";
import { createQuest } from "../../action/quest";
import QuestForm from "../../modules/admin/components/quest-form";
import EditQuest from "../../modules/admin/editquest";
import AdminPanel from "../../modules/admin/table";
import Panel from "../../util/panel";
import dictionary from "./styles/dictionary";
import styles from "./styles/styles";
import Schedule from "../../modules/admin/schedule";

const Admin = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper
      sx={{
        width: "100%",
        p: 0,
      }}
    >
      <Box sx={{ ...styles.mainContainer }}>
        <Tabs
          value={value}
          onChange={handleChange}
          centered={!isMobile}
          variant={isMobile ? "scrollable" : "standard"}
          scrollButtons={isMobile ? "auto" : true}
          textColor={dictionary.color}
          TabIndicatorProps={{ style: { ...styles.tabsBorder } }}
        >
          <Tab label="მონაცემები" />
          <Tab label="ტესტების განახლება" />
          <Tab label="ტესტების დამატება" />
          <Tab label="ცხრილი" />
        </Tabs>
        <Panel value={value} index={0}>
          <AdminPanel />
        </Panel>
        <Panel value={value} index={1}>
          <EditQuest />
        </Panel>
        <Panel value={value} index={2}>
          <QuestForm answer={Array(4).fill("")} action={createQuest} />
        </Panel>
        <Panel value={value} index={3}>
          <Schedule />
        </Panel>
      </Box>
    </Paper>
  );
};

export default Admin;
