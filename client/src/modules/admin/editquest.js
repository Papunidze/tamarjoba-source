import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { editQuest, fetchAll } from "../../action/quest";
import PageLoader from "../../layout/app-skeleton";
import QuestForm from "./components/quest-form";

export default function EditQuest() {
  const [expanded, setExpanded] = React.useState("");
  const [value, setValue] = React.useState(0);
  const [choosArray, setChoosArray] = React.useState([]);
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0);
  React.useState(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const handlePage = (event, value) => {
    setPage(value - 1);
    setExpanded("");
  };
  const handleSelect = (event) => {
    setValue(event.target.value);
    setExpanded("");
    setChoosArray(() => {
      if (event.target.value !== 0) {
        const newArray = [];
        questions.allQuest.map(
          (element) =>
            element.section === event.target.value && newArray.push(element)
        );
        return newArray;
      } else {
        return questions.allQuest;
      }
    });
  };
  const questions = useSelector((action) => action.questReducer);

  const renderItem = (item) => {
    return item.slice(page * 10, page * 10 + 10).map((element, index) => (
      <Accordion
        key={index}
        expanded={expanded === `panel${index + 1}`}
        onChange={handleChange(`panel${index + 1}`)}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>
            {element.section}.{element.counter}.{element.title}
          </Typography>
        </AccordionSummary>
        {expanded === `panel${index + 1}` && (
          <AccordionDetails>
            <QuestForm
              title={element.title}
              answer={element.answer}
              correctanswers={element.correctanswer}
              content={element.content}
              section={element.section}
              id={element._id}
              action={editQuest}
            />
          </AccordionDetails>
        )}
      </Accordion>
    ));
  };
  return (
    <div>
      <PageLoader loading={questions.isLoading}>
        <Stack
          sx={{ width: "100%", justifyContent: "center", alignItems: "center" }}
        >
          <FormControl sx={{ m: 1, minWidth: 120 }} size={"small"}>
            <InputLabel>სექცია</InputLabel>
            <Select value={value} onChange={handleSelect} label="სექცია">
              <MenuItem value={0}>ყველა</MenuItem>
              <MenuItem value={1}>ისტორია</MenuItem>
              <MenuItem value={2}>სამართალი</MenuItem>
              <MenuItem value={3}>ქართული</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        {value === 0 ? renderItem(questions.allQuest) : renderItem(choosArray)}
        <Stack
          spacing={2}
          sx={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 1,
          }}
        >
          <Pagination
            count={Math.ceil(
              value === 0
                ? questions.allQuest.length / 10
                : choosArray.length / 10
            )}
            defaultPage={1}
            shape="rounded"
            size="medium"
            siblingCount={0}
            onChange={handlePage}
          />
        </Stack>
      </PageLoader>
    </div>
  );
}
