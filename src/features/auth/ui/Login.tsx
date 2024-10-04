import React from "react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField } from "@mui/material";
import { isLoadingSelector } from "app/app.selector";
import { login } from "../model/auth-reducer";
import { BaseResponseType } from "../../../common/types/base-response-type";

export const Login = () => {
  const dispatch = useAppDispatch();

  const isLoggedIn = useSelector(isLoadingSelector);

  const formik = useFormik({
    validate: (values) => {
      if (!values.email) {
        return {
          email: "Email is required"
        };
      }
      if (!values.password) {
        return {
          password: "Password is required"
        };
      }
    },
    initialValues: {
      email: "",
      password: "",
      rememberMe: false
    },
    onSubmit: (values, formikHelpers) => {
      dispatch(login({ email: values.email, password: values.password, rememberMe: values.rememberMe }))
        .unwrap()
        .then((res) => {

        })
        .catch((error: BaseResponseType) => {
          error.fieldsErrors.forEach((el) => {
            if (error.fieldsErrors) {
              formikHelpers.setFieldError(el.field, el.error); // вариант обработки нескольких ошибок
            }
          });
          // formikHelpers.setFieldError(error.fieldsErrors[0].field, error.fieldsErrors[0].error); // когда приходит с сервера одна ошибка
        });
    }
  });

  if (isLoggedIn) {
    return <Navigate to={"/"} />;
  }

  return (
    <Grid container justifyContent="center">
      <Grid item xs={4}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>
                To log in get registered{" "}
                <a href={"https://social-network.samuraijs.com/"} target={"_blank"}>
                  here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p> Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <TextField label="Email" margin="normal" {...formik.getFieldProps("email")} />
              {formik.errors.email ?
                <div style={{ color: "red", fontWeight: "bold" }}>{formik.errors.email}</div> : null}
              <TextField type="password" label="Password" margin="normal" {...formik.getFieldProps("password")} />
              {formik.errors.password ?
                <div style={{ color: "red", fontWeight: "bold" }}>{formik.errors.password}</div> : null}
              <FormControlLabel
                label={"Remember me"}
                control={<Checkbox {...formik.getFieldProps("rememberMe")} checked={formik.values.rememberMe} />}
              />
              <Button type={"submit"} variant={"contained"} color={"primary"}>
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};
