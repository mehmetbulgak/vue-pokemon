<template>
  <div class="home-container">
    <ul class="pokemon-list-container">
      <!-- <h3 v-if="pokemonType">{{ pokemonType }} Pokemons</h3> -->
      <li v-for="pokemon in displayedPokemon" :key="pokemon.name">
        <router-link class="pokemon-card" :to="{ name: 'PokemonDetail', params: { name: pokemon.name } }">
          <img :src="getPokemonImage(pokemon.url)" :alt="pokemon.name" />
          <span>{{ pokemon.name }}</span>
        </router-link>
      </li>
      <button class="load-more-button" v-if="displayLoadMoreButton" @click="loadMore">Load More</button>
    </ul>

    <div class="filter-buttons">
      <h3 class="pokemon-type-header">#Hashtags</h3>

      <ul class="pokemon-type-container">
        <li v-for="pokemonType in allPokemonTypes" :key="pokemonType.name">
          <button @click="setPokemonType(pokemonType.name)">#{{ pokemonType.name }}</button>
        </li>
      </ul>

      <select class="selectbox-pokemon" v-model="selectedPokemonType" @change="setPokemonType(selectedPokemonType)">
        <option value="" disabled>Select a Pokémon type</option>
        <option v-for="pokemonType in allPokemonTypes" :key="pokemonType.name" :value="pokemonType.name">
          {{ pokemonType.name }}
        </option>
      </select>

    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getPokemonList, getPokemonType, getAllPokemonType } from '@/services/pokeApiService.js';

export default {
  setup() {
    const pokemonList = ref([]);
    const displayedPokemon = ref([]); 
    const allPokemonTypes = ref([]);
    const pokemonType = ref('');
    const selectedPokemonType = ref('');
    const displayLoadMoreButton = ref(false); 

    const fetchPokemonList = () => {
      getPokemonList()
        .then((data) => {
          pokemonList.value = data.results;
          displayedPokemon.value = data.results;
        })
        .catch((error) => {
          console.error('Error fetching Pokemon list:', error);
        });
    };

    const setPokemonType = (type) => {
      selectedPokemonType.value = type;
      pokemonType.value = type;
      displayedPokemon.value = []; 
      displayLoadMoreButton.value = true; 
      fetchTypePokemon(pokemonType.value);
    };

    const getPokemonImage = (pokemonUrl) => {
      const pokemonId = pokemonUrl.split('/').filter(Boolean).pop();
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
    };

    const fetchAllTypePokemon = () => {
      getAllPokemonType()
        .then((data) => {
          allPokemonTypes.value = data.results;
        })
        .catch((error) => {
          console.error(`Error fetching Pokemon Type:`, error);
        });
    };

    const fetchTypePokemon = (pokemontype) => {
      displayLoadMoreButton.value = true;
      getPokemonType(pokemontype)
        .then((data) => {
          const pokemons = data.pokemon.slice(0, 25).map((entry) => entry.pokemon);
          displayedPokemon.value = [...displayedPokemon.value, ...pokemons]; 
          if (pokemons.length < 25) {
            displayLoadMoreButton.value = false; 
          }
        })
        .catch((error) => {
          console.error(`Error fetching ${pokemontype} Pokemon:`, error);
        });
    };

    const loadMore = () => {
      const nextPageStart = displayedPokemon.value.length; 
      const nextPageEnd = nextPageStart + 25;

      getPokemonType(pokemonType.value).then((data) => {
          const pokemons = data.pokemon
            .slice(nextPageStart, nextPageEnd)
            .map((entry) => entry.pokemon);
          displayedPokemon.value = [...displayedPokemon.value, ...pokemons];

          if (pokemons.length < 25) {
            displayLoadMoreButton.value = false; 
          }
        })
        .catch((error) => {
          console.error(`Error fetching ${pokemonType.value} Pokemon:`, error);
        });
    };

    const fetchAllPokemon = () => {
      displayedPokemon.value = pokemonList.value;
    };

    onMounted(() => {
      fetchPokemonList();
      fetchAllTypePokemon();
    });

    return {
      displayedPokemon,
      setPokemonType,
      fetchAllPokemon,
      getPokemonImage,
      loadMore,
      pokemonType,
      displayLoadMoreButton,
      allPokemonTypes,
      selectedPokemonType
    };
  },
};
</script>

<style>
.home {
  flex: 1;
}

.home-container {
  display: flex;
  justify-content: space-between;
}

.home-container ul {
  list-style: none;
}

.filter-buttons {
  margin-bottom: 20px;
  padding-right: 25px;
}

.filter-buttons button {
  margin-right: 10px;
}

.pokemon-list-container {
  margin-top: 25px;
  width: 100%;
  margin-right: 25px;
  display: flex;
  flex-direction: column;
}

.pokemon-card {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  text-decoration: none;
  color: black;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0 20px;
  transition: 0.3s ease;
}

.pokemon-card:hover{
  transform: scale(1.01);
}

.pokemon-card img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.pokemon-type-container {
  display: flex;
  border: 1px dashed #0203F7;
  width: 450px;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px 5px;
  border-radius: 5px;
}

.pokemon-type-header {
  color: #0203F7;
  margin: 20px 0 10px 0;
}

.pokemon-type-container button {
  background-color: initial;
  border: 1px solid #0203F7;
  color: #0203F7;
  padding: 7.5px 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: 0.5s ease;
}

.pokemon-type-container button:hover {
  background-color: #0203F7;
  color: white;
}

.load-more-button {
  background-color: #0203F7;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  margin: 0px auto 30px auto;
  width: 100px;
}

.selectbox-pokemon{
  background-color: #0203F7;
  color: white;
  border: none;
  border-radius: 5px;
  outline: none;
  padding: 10px;
  width: 100%;
  display: none;
}


@media screen and (max-width:950px) {
   .home-container{
    flex-direction: column-reverse;
    width: 85%;
    margin: 0 auto;
    padding-top: 50px;
   }

   .pokemon-type-header{
    display: none;
   }

   .pokemon-type-container{
    display: none;
   }

   .filter-buttons{
    padding: initial;
    margin-bottom: initial;
    margin-top: 20px;
   }

   .selectbox-pokemon{
    display: block;
   }
}
</style>
