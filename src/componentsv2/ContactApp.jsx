import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import './ContactApp.css';

class ContactApp extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'number') {
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
    const { name, number, contacts } = this.state;
    const existingContact = contacts.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase() && contact.number === number
    );
    if (existingContact) {
      alert('Contact with the same name and number already exists.');
    } else {
      const id = nanoid();
      const newContact = { id, name, number };
      this.setState({
        contacts: [...contacts, newContact],
        name: '',
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

  render() {
    const { name, number, contacts, filter } = this.state;

    const filteredContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div className="ContactApp">
        <h1>Phonebook</h1>

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={this.handleChange}
          />

          <label htmlFor="number">Phone Number:</label>
          <input
            type="text"
            name="number"
            title="Phone number must be digits and can start with +"
            required
            value={number}
            onChange={this.handleChange}
          />

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
              {contact.name}: {contact.number}{' '}
              <button onClick={() => this.handleDeleteContact(contact.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ContactApp;
