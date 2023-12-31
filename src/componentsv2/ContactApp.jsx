import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import './ContactApp.css';

function ContactApp() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const [surname, setSurname] = useState('');
  const [number, setNumber] = useState('');

  const saveContactsToLocalStorage = (contacts) => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  };

  const loadContactsFromLocalStorage = () => {
    const storedContacts = localStorage.getItem('contacts');
    return storedContacts ? JSON.parse(storedContacts) : [];
  };

  useEffect(() => {
    const loadedContacts = loadContactsFromLocalStorage();
    setContacts(loadedContacts);
  }, []);

  useEffect(() => {
    saveContactsToLocalStorage(contacts);
  }, [contacts]);

  const handleChange = (event, setterFunction, formatFunction) => {
    const { value } = event.target;
    if (formatFunction) {
      const formattedValue = formatFunction(value);
      setterFunction(formattedValue);
    } else {
      setterFunction(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const existingContact = contacts.find(
      (contact) =>
        contact.surname.toLowerCase() === surname.toLowerCase() &&
        contact.number === number
    );
    if (existingContact) {
      alert('Contact with the same surname and number already exists.');
    } else {
      const id = nanoid();
      const newContact = { id, surname, number };
      setContacts([...contacts, newContact]);
      setSurname('');
      setNumber('');
    }
  };

  const handleFilterChange = (event) => {
    const { value } = event.target;
    setFilter(value);
  };

  const handleDeleteContact = (id) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(updatedContacts);
  };

  const handleResetContacts = () => {
    if (window.confirm('Are you sure you want to delete all contacts? This action cannot be undone.')) {
      setContacts([]);
    }
  };

  const formatPhoneNumber = (value) => {
    const formattedValue = value.replace(/\D/g, '').slice(0, 9);
    const formattedNumber = formattedValue.replace(/(\d{3})(\d{1,3})?(\d{1,3})?/, (_, p1, p2, p3) => {
      let result = p1;
      if (p2) result += '-' + p2;
      if (p3) result += '-' + p3;
      return result;
    });
    return formattedNumber;
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.surname.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="ContactApp">
      <h1>Phonebook</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <label htmlFor='surname'>Surname:</label>
          <input
            type="text"
            id="surname"
            name="surname"
            placeholder='Kowalski'
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Surname"
            required
            value={surname}
            onChange={(event) => handleChange(event, setSurname)}
          />
        </div>

        <div className="form-section">
          <label htmlFor="number">Phone Number:</label>
          <input
            type="text"
            name="number"
            placeholder='000-000-000'
            title="Phone number"
            required
            value={number}
            onChange={(event) => handleChange(event, setNumber, formatPhoneNumber)}
          />
        </div>

        <button type="submit">Add Contact</button>
      </form>

      <h2>Contacts</h2>
      <input
        type="text"
        placeholder="Search by surname"
        value={filter}
        onChange={handleFilterChange}
      />
      <ul>
        {filteredContacts.map((contact) => (
          <li key={contact.id}>
            {contact.surname}: {contact.number}{' '}
            <button onClick={() => handleDeleteContact(contact.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button className="reset-button" type="button" onClick={handleResetContacts}>
        Reset Contacts
      </button>
    </div>
  );
}

export default ContactApp;
