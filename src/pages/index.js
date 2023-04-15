import { useState, useEffect } from "react";
import { useGlobalContext } from "@/context/global";
import Router from "next/router";

export default function Home() {
  const {
    allPokemonData,
    searchResults,
    getPokemon,
    loading,
    realTimeSearch,
  } = useGlobalContext();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    realTimeSearch(search);
  };

  const displaySearchResults = () => {
    return searchResults.map((pokemon) => {
      return (
        <div
          key={pokemon.id}
          onClick={() => {
            Router.push(`/pokemon/${pokemon.name}`);
          }}
          className="pokemon-name"
        >
          {pokemon.name}
        </div>
      );
    });
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    if (allPokemonData && allPokemonData.length > 0) {
      setTotalPages(Math.ceil(allPokemonData.length / 20));
    }
  }, [allPokemonData]);

  const displayAllPokemon = () => {
    const startIndex = (currentPage - 1) * 20;
    const endIndex = currentPage * 20;

    return allPokemonData.slice(startIndex, endIndex).map((pokemon) => {
      return (
        <div
          key={pokemon.id}
          className="card"
          onClick={() => {
            Router.push(`/pokemon/${pokemon.name}`);
          }}
        >
          <div className="card-image">
            <img
              src={pokemon.sprites.other.home.front_shiny}
              alt={pokemon.name}
            />
          </div>
          <div className="card-body">
            <h3>{pokemon.name}</h3>
            <p>More Details &nbsp; &rarr;</p>
          </div>
        </div>
      );
    });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchResults]);

  useEffect(() => {
    setCurrentPage(1);
  }, [allPokemonData]);

  return (
    <main>
      <form action="" className="search-form" onSubmit={handleSearch}>
        <div className="input-control">
          <input
            type="text"
            value={search}
            onChange={handleChange}
            placeholder="Search for a Pokemon..."
          />
          <button className="submit-btn" type="submit">
            Search
          </button>
        </div>
      </form>

      {search && searchResults.length > 0 && (
        <div className="search-results">{displaySearchResults()}</div>
      )}

      <div className="all-pokemon">
        {allPokemonData ? (
          displayAllPokemon()
        ) : (
          <h1>Loading...</h1>
        )}
      </div>

      

      <div className="pagination">
        {totalPages > 1 &&
          Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => {
                  setCurrentPage(page);
                }}
                className={page === currentPage ? "active" : ""}
              >
                {page}
              </button>
            )
          )}
      </div>

    
    </main>
  );
}
