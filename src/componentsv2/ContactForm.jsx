// import React, { Component } from 'react';
// import { nanoid } from 'nanoid';
// import './ContactApp.css';
// import ContactForm from './ContactForm';
// import ContactList from './ContactList';

// class ContactApp extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//     name: '',
//     number: '',
//   };

//   handleChange = (event) => {
//     const { name, value } = event.target;
//     if (name === 'number') {
//       const formattedValue = value.replace(/\D/g, '').slice(0, 9);
//       const formattedNumber = formattedValue.replace(/(\d{3})(\d{1,3})?(\d{1,3})?/, (_, p1, p2, p3) => {
//         let result = p1;
//         if (p2) result += '-' + p2;
//         if (p3) result += '-' + p3;
//         return result;
//       });
//       this.setState({ [name]: formattedNumber });
//     } else {
//       this.setState({ [name]: value });
//     }
//   };

//   handleSubmit = (event) => {
//     event.preventDefault();
//     const { name, number, contacts } = this.state;
//     const existingContact = contacts.find(
//       (contact) => contact.name.toLowerCase() === name.toLowerCase() && contact.number === number
//     );
//     if (existingContact) {
//       alert('Contact with the same name and number already exists.');
//     } else {
//       const id = nanoid();
//       const newContact = { id, name, number };
//       this.setState({
//         contacts: [...contacts, newContact],
//         name: '',
//         number: '',
//       });
//     }
//   };

//   handleFilterChange = (event) => {
//     const { value } = event.target;
//     this.setState({ filter: value });
//   };

//   render() {
//     const { name, number, contacts, filter } = this.state;

//     return (
//       <div className="ContactApp">
//         <h1>Phonebook</h1>

//         <ContactForm
//           name={name}
//           number={number}
//           onNameChange={this.handleChange}
//           onNumberChange={this.handleChange}
//           onSubmit={this.handleSubmit}
//         />

//         <input
//           type="text"
//           placeholder="Search by name"
//           value={filter}
//           onChange={this.handleFilterChange}
//         />

//         <ContactList contacts={contacts} filter={filter} />
//       </div>
//     );
//   }
// }

// export default ContactApp;
