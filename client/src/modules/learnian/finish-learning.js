import * as React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Divider,
  IconButton,
  ListItemText,
  Pagination,
  Stack,
  Toolbar,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import styles from "./styles/styles";
import dictionary from "./styles/dictionary";
import DangerousIcon from "@mui/icons-material/Dangerous";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box } from "@mui/system";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Finish = ({ open, question, answer }) => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const handleClose = () => {
    localStorage.removeItem("counter");
    localStorage.removeItem("answer");
    localStorage.removeItem("checked");
    navigate("/");
  };
  const handlePage = (event, value) => {
    setPage(value - 1);
  };
  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Stack gap={1}>
          <AppBar sx={{ ...styles.appHeader }}>
            <Toolbar>
              <Typography
                sx={{ ml: 2, flex: 1 }}
                variant={dictionary.variant}
                component={dictionary.component}
              >
                ტესტირება დასრულებულია
              </Typography>
              <IconButton
                edge={dictionary.edge}
                color={dictionary.color}
                onClick={handleClose}
              >
                <HomeIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Stack sx={{ ...styles.flexContainer, marginBottom: 2 }}>
            {question.slice(page * 10, page * 10 + 10).map((element, index) => (
              <Box key={index} sx={{ width: "100%" }}>
                <Typography sx={{ ...styles.titleText }} variant="subtitle1">
                  {element.counter}.{element.section} {element.title}
                </Typography>
                <Stack sx={{ ...styles.answerBox }}>
                  {element.answer.map((ans, ind) =>
                    ind + 1 === answer[index] ? (
                      <ListItemText
                        key={ind}
                        primary={ans}
                        sx={{ ...styles.checkedAnswer }}
                      />
                    ) : (
                      <ListItemText
                        key={ind}
                        primary={ans}
                        sx={{ ...styles.answerText }}
                      />
                    )
                  )}
                  {element.correctanswer === answer[index] ? (
                    <Typography sx={{ ...styles.resultBox }}>
                      <CheckCircleIcon
                        sx={{ fontSize: "x-large", color: "green" }}
                      />
                      სწორია
                    </Typography>
                  ) : (
                    <Stack sx={{ ...styles.wrongBox }}>
                      <Typography sx={{ ...styles.wrongText }}>
                        <DangerousIcon
                          sx={{ fontSize: "x-large", color: "red" }}
                        />
                        არასწორია, სწორი პასუხია
                      </Typography>
                      <Typography sx={{ ...styles.correctAnswer }}>
                        {element.answer[element.correctanswer - 1]}
                      </Typography>
                    </Stack>
                  )}
                </Stack>
                <Divider />
              </Box>
            ))}
            <Pagination
              count={Math.ceil(question.length / 10)}
              defaultPage={1}
              shape="rounded"
              size="small"
              siblingCount={0}
              onChange={handlePage}
            />
          </Stack>
        </Stack>
      </Dialog>
    </div>
  );
};
export default Finish;
