import css from "./contact.module.css";
import { FaUser, FaPhone } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteContact, editContact } from "../../redux/contacts/operations";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { toast } from "react-hot-toast";
import { Button, TextField } from "@mui/material";

const Contact = ({ contact }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editedContact, setEditedContact] = useState({ ...contact });
  const dispatch = useDispatch();

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    dispatch(deleteContact(contact.id));
    toast.success("Contact was deleted successfully");
    setIsDeleteModalOpen(false);
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const handleSave = () => {
    dispatch(editContact(editedContact));
    setIsEditModalOpen(false);
  };

  useEffect(() => {
    setEditedContact({ ...contact });
  }, [contact]);

  useEffect(() => {
    setEditedContact({ ...contact });
  }, [contact]);

  return (
    <div className={css.contactItem}>
      <div>
        <div className={css.contactDescription}>
          <FaUser /> {contact.name}
        </div>
        <div className={css.contactDescription}>
          <FaPhone />
          {contact.number}
        </div>
      </div>

      <Button onClick={openEditModal} variant="contained">
        Edit
      </Button>

      <Button onClick={openDeleteModal} variant="contained">
        Delete
      </Button>

      <Modal
        className={css.modal}
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
      >
        <h2>Edit Contact</h2>
        <form>
          <TextField
            sx={{
              width: 200,
              marginBottom: "15px",
            }}
            label="Name:"
            type="text"
            value={editedContact.name}
            onChange={(e) =>
              setEditedContact({ ...editedContact, name: e.target.value })
            }
          />

          <TextField
            sx={{
              width: 200,
              marginBottom: "15px",
              display: "flex",
              gap: "5px",
            }}
            label="Number:"
            type="text"
            value={editedContact.number}
            onChange={(e) =>
              setEditedContact({ ...editedContact, number: e.target.value })
            }
          />
        </form>
        <div>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
        </div>
      </Modal>

      <Modal
        className={css.modal}
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
      >
        <h2>Delete this contact?</h2>
        <p>Are you sure you want to delete this contact?</p>
        <div>
          <Button onClick={confirmDelete}>Confirm</Button>
          <Button onClick={cancelDelete}>Cancel</Button>
        </div>
      </Modal>
    </div>
  );
};

export default Contact;
