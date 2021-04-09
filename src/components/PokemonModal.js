import "../css/modal.css";
const PokemonModal = ({ handleClose, show, pokemon }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  console.log(pokemon);
  return (
    <div className={showHideClassName}>
      <section
        className="modal-main"
        style={
          pokemon.types
            ? pokemon.types[0]["type"]["name"] === "fire"
              ? { backgroundColor: "rgba(255, 0, 0, 0.5)" }
              : pokemon.types[0]["type"]["name"] === "grass"
              ? { backgroundColor: "rgba(0, 128, 0, 0.445)" }
              : pokemon.types[0]["type"]["name"] === "water"
              ? { backgroundColor: "rgba(0, 0, 255, 0.452)" }
              : {}
            : {}
        }
      >
        <div className="text-center mx-auto" key={pokemon.id}>
          <div className="card-header">
            <h1>
              <b>{pokemon.name}</b>
            </h1>
          </div>
          <div className="card-body">
            <h2 className="card-subtitle mb-2 text-muted">
              Height: {pokemon.height}
            </h2>
            <h2 className="card-subtitle mb-2 text-muted">
              Weight: {pokemon.weight}
            </h2>
            <img
              className="modalImg"
              src={
                pokemon.sprites ? pokemon.sprites["front_default"] : "Loading"
              }
              alt={pokemon.name}
            />
            <img
              className="modalImg"
              src={
                pokemon.sprites ? pokemon.sprites["back_default"] : "Loading"
              }
              alt={pokemon.name}
            />
            <h2>
              Type:{" "}
              {pokemon.types ? pokemon.types[0]["type"]["name"] : "Loading"}
            </h2>
            <h2>
              Best move:{" "}
              {pokemon.moves ? pokemon.moves[0]["move"]["name"] : "Loading"}
            </h2>
            <h2>
              Best ablity:{" "}
              {pokemon.abilities
                ? pokemon.abilities[0]["ability"]["name"]
                : "Loading"}
            </h2>
          </div>
        </div>
        <button type="button" className="buttonModal" onClick={handleClose}>
          Back
        </button>
      </section>
    </div>
  );
};

export default PokemonModal;
