import React from "react";
import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import dictionary from "./styles/dictionary";
import styles from "./styles/styles";
import { useForm } from "react-hook-form";
import { login } from "../../action/user";
import { useDispatch } from "react-redux";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(login(data));
  };
  return (
    <Paper
      component="form"
      sx={{ ...styles.authPaper }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack gap={2}>
        <Typography variant={dictionary.txtVar}>გაიარეთ ავტორიზაცია</Typography>
        <TextField
          required
          label="იმეილი"
          size={dictionary.size}
          error={!errors.email ? false : true}
          helperText={!errors.email ? "" : "შეიყვანეთ სწორი იმეილი"}
          {...register(`email`, {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            minLength: 4,
          })}
        />
        <TextField
          required
          autoComplete="on"
          label="პაროლი"
          size={dictionary.size}
          type={dictionary.passwordInput}
          {...register(`password`, {
            required: true,
          })}
        />
        {/* <Typography
          sx={{
            fontSize: "small",
            textDecoration: "underline",
            cursor: "pointer",
            userSelect: "none",
          }}
          color="secondary"
        >
          დაგავიწყდათ პაროლი
        </Typography> */}
        <Button type={dictionary.type} sx={{ ...styles.authBtn }}>
          შესვლა
        </Button>
      </Stack>
    </Paper>
  );
};

export default Login;
