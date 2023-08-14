import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import dictionary from "../styles/dictionary";
import { styles } from "../styles/styles";
import { useDispatch } from "react-redux";
import { displayToast } from "../../../util/alert";
const QuestForm = ({
  title,
  answer,
  correctanswers,
  content,
  section,
  action,
  id,
}) => {
  const [value, setValue] = useState(section || 1);
  const [correctanswer, setCorrectanswer] = useState(correctanswers || 0);
  const disptach = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const answer = [data.answer1, data.answer2, data.answer3, data.answer4];
    if (correctanswer !== 0) {
      const finalResult = Object.assign(
        { answer },
        { correctanswer: correctanswer },
        { section: value },
        { title: data.title },
        { content: data.content },
        id && { id: id }
      );
      disptach(action(finalResult));

      if (!id) {
        reset();
        setValue(1);
        setCorrectanswer(0);
      }
    } else {
      displayToast(`აირჩიეთ სწორი პასუხი`, "error", "crimson");
    }
  };

  return (
    <Paper
      sx={{ ...styles.paperForm }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack sx={{ ...styles.inputContianer }}>
        <FormControl sx={{ m: 1, minWidth: 120 }} size={dictionary.inputSize}>
          <InputLabel>სექცია</InputLabel>
          <Select
            value={value}
            onChange={(e) => setValue(e.target.value)}
            label="სექცია"
          >
            <MenuItem value={1}>ისტორია</MenuItem>
            <MenuItem value={2}>სამართალი</MenuItem>
            <MenuItem value={3}>ქართული</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="კითხვა"
          multiline
          minRows={4}
          maxRows={4}
          defaultValue={title || ""}
          size={dictionary.inputSize}
          error={!errors.title ? false : true}
          helperText={!errors.title ? "" : "მინიმუმ 4 სიმბოლო"}
          {...register(`title`, {
            required: true,
            minLength: 4,
          })}
        />
        <RadioGroup
          onChange={(e) => setCorrectanswer(e.target.value)}
          defaultValue={correctanswers}
        >
          <Grid
            container
            spacing={{ xs: 1, md: 1 }}
            columns={{ xs: 2, sm: 8, md: 12 }}
          >
            <Grid item xs={6}>
              <Stack sx={{ ...styles.answerdForm }}>
                <Radio value={1} sx={{ ...styles.radioButton }} />
                <TextField
                  size={dictionary.inputSize}
                  fullWidth
                  defaultValue={answer[0] ? answer[0] : ""}
                  label="ა"
                  error={!errors.answer1 ? false : true}
                  helperText={!errors.answer1 ? "" : "მინიმუმ 2 სიმბოლო"}
                  {...register(`answer1`, {
                    required: true,
                    minLength: 2,
                  })}
                />
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack sx={{ ...styles.answerdForm }}>
                <Radio value={2} sx={{ ...styles.radioButton }} />
                <TextField
                  size={dictionary.inputSize}
                  fullWidth
                  defaultValue={answer[1] || ""}
                  label="ბ"
                  error={!errors.answer2 ? false : true}
                  helperText={!errors.answer2 ? "" : "მინიმუმ 2 სიმბოლო"}
                  {...register(`answer2`, {
                    required: true,
                    minLength: 2,
                  })}
                />
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack sx={{ ...styles.answerdForm }}>
                <Radio value={3} sx={{ ...styles.radioButton }} />
                <TextField
                  size={dictionary.inputSize}
                  fullWidth
                  defaultValue={answer[2] || ""}
                  label="გ"
                  error={!errors.answer3 ? false : true}
                  helperText={!errors.answer3 ? "" : "მინიმუმ 2 სიმბოლო"}
                  {...register(`answer3`, {
                    required: true,
                    minLength: 2,
                  })}
                />
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack sx={{ ...styles.answerdForm }}>
                <Radio value={4} sx={{ ...styles.radioButton }} />
                <TextField
                  size={dictionary.inputSize}
                  fullWidth
                  defaultValue={answer[3] || ""}
                  label="დ"
                  error={!errors.answer4 ? false : true}
                  helperText={!errors.answer4 ? "" : "მინიმუმ 2 სიმბოლო"}
                  {...register(`answer4`, {
                    required: true,
                    minLength: 2,
                  })}
                />
              </Stack>
            </Grid>
          </Grid>
        </RadioGroup>
        <TextField
          fullWidth
          label="კონტენტი"
          multiline
          minRows={7}
          maxRows={7}
          defaultValue={content || ""}
          size={dictionary.inputSize}
          error={!errors.content ? false : true}
          helperText={!errors.content ? "" : "მინიმუმ 2 სიმბოლო"}
          {...register(`content`, {
            required: true,
            minLength: 2,
          })}
        />
        <Button color="error" type="submit" variant="contained">
          შენახვა
        </Button>
      </Stack>
    </Paper>
  );
};

export default QuestForm;
