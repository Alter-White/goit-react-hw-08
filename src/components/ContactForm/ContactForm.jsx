import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { nanoid } from "nanoid";
import css from "./ContactForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/contactsOps";
import { selectFilteredContacts } from "../../redux/contactsSlice";

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
  return (
    <Formik
      initialValues={INITIAL_FORM_DATA}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div className={css.formContainer}>
          <div className={css.formAddContact}>
            <label htmlFor="name">Name</label>
            <Field type="text" name="name" />
            <ErrorMessage name="name" component="div" />
          </div>
          <div className={css.formAddContact}>
            <label htmlFor="number">Number</label>
            <Field type="text" name="number" />
            <ErrorMessage name="number" component="div" />
          </div>
          <button className={css.formButton} type="submit">
            Add Contact
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default ContactForm;
