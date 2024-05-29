import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import css from "./RegistrationForm.module.css";
import { Button, TextField } from "@mui/material";

const RegisterForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    dispatch(register(values))
      .unwrap()
      .then(() => {
        resetForm();
      });
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validate={(values) => {
        const errors = {};
        if (!values.name) {
          errors.name = "Required";
        }
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        if (!values.password) {
          errors.password = "Required";
        } else if (values.password.length < 6) {
          errors.password = "Password must be at least 6 characters long";
        }
        return errors;
      }}
    >
      <Form autoComplete="off">
        <div className={css.input}>
          <Field name="name">
            {({ field, meta }) => (
              <div>
                <TextField {...field} label="Username" fullWidth />
                {meta.touched && meta.error && (
                  <div className={css.error}>{meta.error}</div>
                )}
              </div>
            )}
          </Field>
        </div>
        <div className={css.input}>
          <Field name="email">
            {({ field, meta }) => (
              <div>
                <TextField {...field} label="Email" fullWidth />
                {meta.touched && meta.error && (
                  <div className={css.error}>{meta.error}</div>
                )}
              </div>
            )}
          </Field>
        </div>
        <div className={css.input}>
          <Field name="password">
            {({ field, meta }) => (
              <div>
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  fullWidth
                />
                {meta.touched && meta.error && (
                  <div className={css.error}>{meta.error}</div>
                )}
              </div>
            )}
          </Field>
        </div>
        <div>
          <Button
            type="submit"
            variant="contained"
            style={{ marginTop: "15px" }}
          >
            Register
          </Button>
        </div>
      </Form>
    </Formik>
  );
};

export default RegisterForm;
