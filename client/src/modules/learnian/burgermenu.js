import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import dictionary from "./styles/dictionary";
import styles from "./styles/styles";
import VirtualScroll from "react-dynamic-virtual-scroll";

export default function BurgerMenu({
  quest,
  setCounter,
  answer,
  setLanguage,
  counter,
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [choosArray, setArray] = React.useState(quest);
  const [temp, setTemp] = React.useState(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleClick = (index) => {
    setCounter(temp + index);
    setLanguage(false);
  };

  const renderItem = React.useCallback(
    (rowIndex) => {
      return (
        <Box sx={{ ...styles.mainBox }} role={dictionary.role}>
          <List sx={{ paddingTop: 0.2 }}>
            <ListItem
              key={rowIndex}
              disablePadding
              sx={{
                ...styles.listItem(
                  value === 0 ? answer[rowIndex] : answer[temp + rowIndex],
                  counter === rowIndex
                ),
              }}
            >
              <ListItemButton onClick={() => handleClick(rowIndex)}>
                <ListItemText
                  primary={rowIndex + 1 + "." + choosArray[rowIndex].title}
                  sx={{ ...styles.listText }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      );
    },
    [value, answer, temp, counter, choosArray, handleClick]
  );
  const handleChange = (event) => {
    setValue(event.target.value);
    setTemp(() => {
      const newArray = [];
      quest.map(
        (element) =>
          element.section < event.target.value && newArray.push(element)
      );
      return newArray.length;
    });
    setArray(() => {
      if (event.target.value !== 0) {
        const newArray = [];
        quest.map(
          (element) =>
            element.section === event.target.value && newArray.push(element)
        );
        return newArray;
      } else {
        return quest;
      }
    });
  };
  return (
    <React.Fragment>
      <IconButton onClick={() => setOpen(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor={dictionary.anchorSide}
        open={open}
        onClose={() => setOpen(false)}
      >
        <FormControl sx={{ m: 1, minWidth: 120 }} size={"small"}>
          <InputLabel>სექცია</InputLabel>
          <Select value={value} onChange={handleChange} label="სექცია">
            <MenuItem value={0}>ყველა</MenuItem>
            <MenuItem value={1}>ისტორია</MenuItem>
            <MenuItem value={2}>სამართალი</MenuItem>
            <MenuItem value={3}>ქართული</MenuItem>
          </Select>
        </FormControl>
        <VirtualScroll
          className="List"
          minItemHeight={40}
          totalLength={choosArray.length}
          renderItem={renderItem}
        />
      </Drawer>
    </React.Fragment>
  );
}
