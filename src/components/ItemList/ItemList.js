import React, {Component} from 'react';
import SwapiServices from '../../services/SwapiServices';
import Spinner from '../Spinner/Spinner';

import './ItemList.css';

export default class ItemList extends Component {

  swapiServices = new SwapiServices();

  state = {
    peopleList: null
  };

  render() {

    const { peopleList } = this.state;

    if (!peopleList) {
      return <Spinner />
    }

    const items = this.renderItems(peopleList);

    return (
      <ul className="item-list list-group">
        {items}
      </ul>
    )
  }

  componentDidMount() {
    this.swapiServices
      .getAllPeople()
      .then((peopleList) => {
        this.setState({
          peopleList
        });
      });
  };

  renderItems(arr) {
    return arr.map(({ id, name }) => {
      return (
        <li className="list-group-item"
            key={id}
            onClick={() => this.props.onItemSelected(id)}>
          {name}
        </li>
      )
    });
  };
}