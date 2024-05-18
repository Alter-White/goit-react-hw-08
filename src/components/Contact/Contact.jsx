import css from "./contact.module.css";
import { FaUser, FaPhone } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsOps";

const Contact = ({ contact }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteContact(contact.id));
  };
  return (
    <li className={css.contactItem} key={contact.id}>
      <div>
        <div className={css.contactDescription}>
          <FaUser className={css.icon} /> {contact.name}
        </div>
        <div className={css.contactDescription}>
          <FaPhone className={css.icon} />
          {contact.number}
        </div>
      </div>
      <button className={css.deleteButton} onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
};

export default Contact;
