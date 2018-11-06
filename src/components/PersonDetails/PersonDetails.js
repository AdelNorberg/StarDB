
import React, { Component } from 'react';

import './PersonDetails.css';
import SwapiService from '../../services/SwapiServices';

export default class PersonDetails extends Component {

  swapiService = new SwapiService;

  state = {
    person: null
  };

  render() {

    if (!this.state.person) {
      return <span>Select a person from a list</span>;
    }

    const { person: {id, name, gender, birthYear, eyeColor} } = this.state;
    
    return (
      <div className="person-details card">
        <img className="person-image"
             src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
             alt="person-image" />
        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year</span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color</span>
              <span>{eyeColor}</span>
            </li>
          </ul>
        </div>
      </div>
    )
  };

  componentDidMount() {
    this.updatePerson();
  };

  componentDidUpdate(prevProps) {
    if (this.props.personId != prevProps.personId) {
      this.updatePerson();
    }
  };

  updatePerson() {
     const { personId } = this.props;
     if (!personId) {
       return;
     }

     this.swapiService
      .getPerson(personId)
      .then((person) => {
       this.setState({ person })
     })
  };
}