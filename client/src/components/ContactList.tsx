import React from "react";

// Defines the Contact type
interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}
//   Defines the list of Contacts as a prop type
interface ContactListProps {
  contacts: Contact[];
  handleDeleteContact: (id: number) => void;
}

// Defines the contact list component, which expects props of type "ContactListProps
const ContactList: React.FC<ContactListProps> = ({
  contacts,
  handleDeleteContact,
}) => {
  return (
    <>
      <h1>Contacts</h1>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.firstName}</td>
              <td>{contact.lastName}</td>
              <td>{contact.email}</td>
              <td>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeleteContact(contact.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ContactList;
