import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Toaster, toast } from "react-hot-toast";
import { Button, TextField } from "@mui/material";

const LoginForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    dispatch(logIn(values))
      .unwrap()
      .then(() => {
        resetForm();
      })
      .catch(() => {
        toast.error(
          "Failed to log in. Please check your credentials and try again."
        );
      });
  };

  return (
    <>
      <Toaster />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form autoComplete="off">
          <Field name="email">
            {({ field, meta }) => (
              <div>
                <TextField
                  {...field}
                  type="email"
                  label="Email"
                  fullWidth
                  InputProps={{
                    style: { marginBottom: "15px" },
                  }}
                />
                {meta.touched && meta.error && <div>{meta.error}</div>}
              </div>
            )}
          </Field>
          <Field name="password">
            {({ field, meta }) => (
              <div>
                <TextField
                  {...field}
                  type="password"
                  label="Password"
                  fullWidth
                  InputProps={{
                    style: { marginBottom: "15px" },
                  }}
                />
                {meta.touched && meta.error && <div>{meta.error}</div>}
              </div>
            )}
          </Field>
          <Button
            type="submit"
            variant="contained"
            style={{ marginTop: "15px" }}
          >
            Log In
          </Button>
        </Form>
      </Formik>
    </>
  );
};

export default LoginForm;
