/*
 * Main app component
 */

/* Module imports */
import React, { Component } from 'react';

/* Styles imports */
import './App.css';

/* Config import */
import { apiAddress } from '../../conf.json';


/* Component imports */


/* App component */
class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      contacts: []
    }
  }
  
  componentDidMount() {
    this._getContacts();
  }

  _getContacts = () => {
    const headers = {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest"
    };

    const options = {
      method: 'GET',
      headers: headers
    }

    fetch(apiAddress + '/contact/all', options)
    .then(
      (response) => response.json()
    )
    .then(
      (data) => {
        this.setState({contacts: data})
      },
      (error) => {
        console.log(error);
      }
    )
  }

  _createContact = (e) => {
    e.preventDefault();
    
    if(!this.state.lastname || !this.state.firstname) {
      alert('Veuillez saisir un nom et un prénom');
      return;
    }

    const headers = {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest"
    };

    const contactData = {
      lastname: this.state.lastname,
      firstname: this.state.firstname,
      email: this.state.email,
      phone: this.state.phone
    };

    const options = {
      method: 'POST',
      headers: headers,
      mode: 'cors',
      body: JSON.stringify({
        contactData: contactData
      })
    }

    fetch(apiAddress + '/contact/create', options)
    .then(
      (response) => response.json()
    )
    .then(
      (data) => {
        const tempContacts = this.state.contacts;
        tempContacts.push(contactData);
        this.setState({
          contacts: tempContacts, 
          lastname: '', 
          firstname: '', 
          email: '',
          phone: ''
        });
      },
      (error) => {
        console.log(error);
      }
    )


  }

  _displayContacts = () => this.state.contacts.map((contact, index) => 
    (
      <div>
        <p>Nom: {contact.lastname}</p>
        <p>Prénom: {contact.firstname}</p>
        <p>Email: <a href={"mailto:" + contact.email}>{contact.email}</a></p>
        <p>Phone: <a href={"tel:" + contact.phone}>{contact.phone}</a></p>
      </div>
    )
  );

  _onChangeText = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    return (
      <div>
        <h1 class="title">Carnet de contacts</h1>
        {this._displayContacts()}

        <br />

        <form>
          <label for="lastname">Nom:</label>
          <input type="text" id="lastname" name="lastname" placeholder="Nom" onChange={this._onChangeText} required />

          <label for="firstname">Prénom:</label>
          <input type="text" id="firstname" name="firstname" placeholder="Prénom" onChange={this._onChangeText} required />

          <label for="email">Email:</label>
          <input type="email" id="email" name="email" placeholder="Email" onChange={this._onChangeText} />

          <label for="phone">Téléphone:</label>
          <input type="number" id="phone" name="phone" placeholder="Téléphone" onChange={this._onChangeText} />

          <button id="submitContact" onClick={this._createContact}>Valider</button>
        </form>

      </div>
    );
  }
}

export default App;
