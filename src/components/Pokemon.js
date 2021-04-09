import React from "react";
import "../css/PokemonComponent.css";
export default function Pokemon({ pokemon }) {
  return (
    <div
      data-testid="pokemoncomponent"
      className="card text-center mx-auto"
      style={{ maxWidth: "18rem" }}
      key={pokemon.id}
    >
      <img
        src={pokemon.sprites ? pokemon.sprites["front_default"] : "Loading"}
        alt={pokemon.name}
      />
      <div className="card-header">
        <b>{pokemon.name}</b>
      </div>
    </div>
  );
}
