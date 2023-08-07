import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import './ContactApp.css';

class ContactApp extends Component {
  state = {
    contacts: [],
    filter: '',
    name: '',
    surname: '',
    number: '',
  };

  saveContactsToLocalStorage = (contacts) => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  };

  loadContactsFromLocalStorage = () => {
    const storedContacts = localStorage.getItem('contacts');
    return storedContacts ? JSON.parse(storedContacts) : [];
  };

  componentDidMount() {
    const loadedContacts = this.loadContactsFromLocalStorage();
    this.setState({ contacts: loadedContacts });
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      this.saveContactsToLocalStorage(contacts);
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name' || name === 'surname') {
      const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
      this.setState({ [name]: capitalizedValue });
    } else if (name === 'number') {
      const formattedValue = value.replace(/\D/g, '').slice(0, 9);
      const formattedNumber = formattedValue.replace(/(\d{3})(\d{1,3})?(\d{1,3})?/, (_, p1, p2, p3) => {
        let result = p1;
        if (p2) result += '-' + p2;
        if (p3) result += '-' + p3;
        return result;
      });
      this.setState({ [name]: formattedNumber });
    } else {
      this.setState({ [name]: value });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, surname, number, contacts } = this.state;
    const existingContact = contacts.find(
      (contact) =>
        contact.name.toLowerCase() === name.toLowerCase() &&
        contact.surname.toLowerCase() === surname.toLowerCase() &&
        contact.number === number
    );
    if (existingContact) {
      alert('Contact with the same name, surname, and number already exists.');
    } else {
      const id = nanoid();
      const newContact = { id, name, surname, number };
      this.setState({
        contacts: [...contacts, newContact],
        name: '',
        surname: '',
        number: '',
      });
    }
  };

  handleFilterChange = (event) => {
    const { value } = event.target;
    this.setState({ filter: value });
  };

  handleDeleteContact = (id) => {
    const { contacts } = this.state;
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    this.setState({ contacts: updatedContacts });
  };

  handleResetContacts = () => {
    if (window.confirm('Are you sure you want to delete all contacts? This action cannot be undone.')) {
      this.setState({ contacts: [] });
    }
  };

  render() {
    const { name, number, surname, contacts, filter } = this.state;

    const filteredContacts = contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(filter.toLowerCase()) ||
        contact.surname.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div className="ContactApp">
        <h1>Phonebook</h1>

        <form onSubmit={this.handleSubmit}>
          <div className="form-section">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder='Jan'
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              value={name}
              onChange={this.handleChange}
            />
          </div>

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
              onChange={this.handleChange}
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
              onChange={this.handleChange}
            />
          </div>

          <button type="submit">Add Contact</button>
          
        </form>

        <h2>Contacts</h2>
        <input
          type="text"
          placeholder="Search by name"
          value={filter}
          onChange={this.handleFilterChange}
        />
        <ul>
          {filteredContacts.map((contact) => (
            <li key={contact.id}>
              {contact.name} {contact.surname}: {contact.number}{' '}
              <button onClick={() => this.handleDeleteContact(contact.id)}>Delete</button>
            </li>
          ))}
        </ul>
        <button className="reset-button" type="button" onClick={this.handleResetContacts}>
            Reset Contacts
          </button>
      </div>
    );
  }
}

export default ContactApp;
