import React, { useState } from "react";

interface ContactFormProps {
  fetchContacts: () => void;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ContactForm: React.FC<ContactFormProps> = ({
  fetchContacts,
  setIsModalOpen,
}) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    interface dataRequest {
      firstName: string;
      lastName: string;
      email: string;
    }
    const data: dataRequest = {
      firstName,
      lastName,
      email,
    };

    const url: string = "http://127.0.0.1:5000/create_contact";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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
      setIsModalOpen(false);
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="firstName">First Name: </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => {
              e.preventDefault();
              setFirstName(e.target.value);
            }}
          />

          <label htmlFor="lastName">Last Name: </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => {
              e.preventDefault();
              setLastName(e.target.value);
            }}
          />

          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              e.preventDefault();
              setEmail(e.target.value);
            }}
          />
        </div>
        <button type="submit">Create Contact</button>
      </form>
    </div>
  );
};

export default ContactForm;
