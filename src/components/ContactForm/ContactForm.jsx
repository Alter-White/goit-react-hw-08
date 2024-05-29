import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import { selectFilteredContacts } from "../../redux/contacts/selectors";
import { TextField, Button } from "@mui/material";
import { styled } from "@mui/system";

const ContactForm = () => {
  const contacts = useSelector(selectFilteredContacts);
  const dispatch = useDispatch();
  const INITIAL_FORM_DATA = {
    name: "",
    number: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too short!")
      .max(50, "Too Long!")
      .required("Required")
      .test("uniqueName", "Name already exists", (value) => {
        return !contacts.some((contact) => contact.name === value);
      }),
    number: Yup.string()
      .min(3, "Phonenumber must be at least 3 characters!")
      .required("Required"),
  });
  const handleSubmit = (values, { resetForm }) => {
    dispatch(addContact({ id: nanoid(), ...values }));
    resetForm();
  };

  const FormContainer = styled("div")`
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `;

  const FormAddContact = styled("div")`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  `;

  return (
    <Formik
      initialValues={INITIAL_FORM_DATA}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <FormContainer>
          <FormAddContact>
            <Field
              as={TextField}
              type="text"
              name="name"
              id="name"
              variant="outlined"
              label="Name"
            />
            <ErrorMessage name="name" component="div" />
          </FormAddContact>
          <FormAddContact>
            <Field
              as={TextField}
              type="text"
              name="number"
              id="number"
              variant="outlined"
              label="Number"
            />
            <ErrorMessage name="number" component="div" />
          </FormAddContact>
          <Button variant="contained" type="submit">
            Add Contact
          </Button>
        </FormContainer>
      </Form>
    </Formik>
  );
};

export default ContactForm;
