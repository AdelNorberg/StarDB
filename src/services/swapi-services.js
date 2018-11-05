export default class SwapiService {

  _apiBase = 'https://swapi.co/api';

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);
  
    if(!res.ok) {
      throw new Error(`Could not fetch ${this._apiBase}${url}, received ${res.status}`)
    }

    return await res.json();
  }

  getPlanet(id) {
    return this.getResource(`/planets/${id}`);
  };


  getAllStarships() {
    const res = this.getResource(`/starships/`);
    return res.results;
  };

  getStarship(id) {
    return this.getResource(`/starships/${id}`)
  };

  getAllPeople() {
    const res = this.getResource(`/people/`);
    return res.results;
  };

  getPerson(id) {
    return this.getResource(`/people/${id}`)
  };
}

const swapi = new SwapiService();

swapi.getPerson(3).then((body) => {
  console.log(body.name)
});
