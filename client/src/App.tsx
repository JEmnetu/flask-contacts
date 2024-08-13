import { useState, useEffect } from "react";
import "./App.css";
import ContactList from "./components/ContactList";
import ContactForm from "./components/ContactForm/ContactForm";

function App() {
  // Defines a type for the Contacts that will be fetched from the Flask API
  interface Contact {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  }

  // Defines type for the data repsonse
  interface ContactAPIResponse {
    contacts: Contact[];
  }

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const fetchContacts = async () => {
    // Async request to the flask API that fetches contacts
    const response = await fetch("http://127.0.0.1:5000/contacts");
    const data: ContactAPIResponse = await response.json();
    setContacts(data.contacts);
  };

  const handleDelete = async (id: number) => {
    const url: string = `http://127.0.0.1:5000/delete/${id}`;
    const options = {
      method: "DELETE",
    };

    const response = await fetch(url, options);
    if (response.status !== 201 && response.status !== 200) {
      const data = await response.json();
      alert(data.message);
    } else {
      // Sucessful
      const data = await response.json();
      alert(data.message);
      fetchContacts();
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <>
      <ContactList contacts={contacts} handleDeleteContact={handleDelete} />
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsModalOpen(true);
        }}
      >
        Add New Contact
      </button>
      {isModalOpen && (
        <div className="modal">
          <span
            className="close"
            onClick={(e) => {
              e.preventDefault();
              setIsModalOpen(false);
            }}
          >
            &times;
          </span>
          <div className="modal-content">
            <ContactForm
              fetchContacts={fetchContacts}
              setIsModalOpen={setIsModalOpen}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
