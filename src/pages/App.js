import React, { Component } from "react";
import "../css/App.css";
import Pokemon from "../components/Pokemon";
import PokemonModal from "../components/PokemonModal";
import Nav from "../components/Nav";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
export default class App extends Component {
  state = {
    pokemons: [],
    pokemonDetails: [],
    isFetching: false,
    offset: 0,
    loadNumber: 15,
    showModal: false,
    singlePokemon: [],
  };
  showModal = async (index) => {
    await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${index}`)
      .then((res) => {
        const pokemon = res.data;
        this.setState({ singlePokemon: pokemon });
      });
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };
  getNextOffset = () => {
    return this.state.offset + this.state.loadNumber;
  };

  handleMore = () => {
    const newOffset = this.getNextOffset();
    this.setState({ offset: newOffset }, () => {
      console.log("Offset: " + this.state.offset);
      this.getMorePokemon();
    });
  };
  componentDidMount() {
    this.getMorePokemon();
  }
  async getMorePokemon() {
    let url =
      "https://pokeapi.co/api/v2/pokemon?offset=" +
      this.state.offset +
      "&limit=" +
      this.state.loadNumber;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          this.setState({ isFetching: true });
          this.setState({ pokemons: data.results }, () => {
            this.state.pokemons.map((pokemon) => {
              fetch(pokemon.url)
                .then((response) => response.json())
                .then((data) => {
                  if (data) {
                    var temp = this.state.pokemonDetails;
                    temp.push(data);
                    this.setState({ pokemonDetails: temp, isFetching: false });
                  }
                })
                .catch(console.log);
            });
          });
        }
      })
      .catch(console.log);
  }

  render() {
    const { pokemonDetails } = this.state;

    const renderedPokemonList = pokemonDetails.map((pokemon, index) => {
      return (
        <div>
          <PokemonModal
            show={this.state.show}
            pokemon={this.state.singlePokemon}
            handleClose={this.hideModal}
            key={this.state.singlePokemon.id}
          ></PokemonModal>
          <div onClick={this.showModal.bind(this, pokemon.id)}>
            <Pokemon pokemon={pokemon} key={pokemon.id} />
          </div>
        </div>
      );
    });

    return (
      <>
        <Nav />
        <div data-testid="App" className="container">
          <InfiniteScroll
            dataLength={this.state.pokemonDetails.length}
            next={this.handleMore}
            hasMore={true}
            loader={<h4>Loading...</h4>}
          >
            {this.state.isFetching ? (
              <div className="App">
                <h1>LOADING....</h1>
              </div>
            ) : (
              <div className="App">{renderedPokemonList}</div>
            )}
          </InfiniteScroll>
        </div>
      </>
    );
  }
}
