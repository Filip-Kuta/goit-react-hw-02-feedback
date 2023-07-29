import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import './ContactApp.css'; // Import pliku CSS

class ContactApp extends Component {
  state = {
    contacts: [],
    name: ''
  };

  handleChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, contacts } = this.state;
    const id = nanoid(); // Generowanie unikalnego identyfikatora za pomocą nanoid
    const newContact = { id, name };

    this.setState({
      contacts: [...contacts, newContact],
      name: ''
    });
  };

  render() {
    const { name, contacts } = this.state;

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
          <button type="submit">Add Contact</button>
        </form>

        <h2>Contacts</h2>
        <ul>
          {contacts.map((contact) => (
            <li key={contact.id}>{contact.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ContactApp;
