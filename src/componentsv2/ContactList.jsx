import React from 'react';

const ContactList = ({ contacts, filter }) => {
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Contacts</h2>
      <ul>
        {filteredContacts.map((contact) => (
          <li key={contact.id}>
            {contact.name}: {contact.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
