<template>
    <div class="pokemon-detail-container">
        <div v-if="loading">Loading...</div>
        <div v-else-if="pokemonDetail">
            <div class="pokemon-detail-header">
                <img :src="pokemonImageUrl">
                <h2>{{ pokemonDetail.name }}</h2>
            </div>
            <div class="pokemon-detail-weight-height">
                <p>Height: {{ pokemonDetail.height }}</p>
                <p>Weight: {{ pokemonDetail.weight }}</p>
            </div>
            <p>{{ pokemonDesc }}</p>
            <div class="pokemon-detail-img">
                <template v-for="(sprite, key) in sprites">
                    <div v-if="sprite && typeof sprite === 'string'" :key="key" class="pokemon-detail-img-container">
                        <img :src="sprite">
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
  
<script>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { getPokemonDetails, getPokemonAbility } from '@/services/pokeApiService.js';

export default {
    setup() {
        const router = useRouter();
        const pokemonDetail = ref(null);
        const pokemonDetailID = ref('');
        const pokemonDesc = ref('');
        const pokemonImageUrl = ref('');
        const sprites = ref({});
        const loading = ref(true);

        const fetchPokemonDetail = () => {
            const pokemonName = router.currentRoute.value.params.name;
            getPokemonDetails(pokemonName)
                .then((data) => {
                    pokemonDetail.value = data;
                    pokemonDetailID.value = data.id;
                    getPokemonDesc(pokemonDetailID.value);
                    sprites.value = data.sprites;
                })
                .catch((error) => {
                    console.error('Error fetching Pokemon details:', error);
                })
        };

        const getPokemonDesc = (pokemonId) => {
            getPokemonAbility(pokemonId)
                .then((data) => {
                    pokemonDesc.value = data.effect_entries[1].effect
                })
                .catch((error) => {
                    console.error(`Error fetching Pokemon Type:`, error);
                })
                .finally(() => {
                    loading.value = false; 
                });
        };

        onMounted(() => {
            fetchPokemonDetail();
            getPokemonDesc();
        });

        watch(pokemonDetail, (newValue) => {
            if (newValue) {
                pokemonImageUrl.value =
                    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' +
                    newValue.id +
                    '.png';
            }
        });

        return {
            pokemonDetail,
            pokemonImageUrl,
            loading,
            sprites,
            pokemonDesc
        };
    },
};
</script>
  
<style>
.pokemon-detail-container {
    width: 60%;
}

.pokemon-detail-header {
    display: flex;
    align-items: center;
}

.pokemon-detail-container h2 {
    color: #0203F7;
}

.pokemon-detail-weight-height {
    display: flex;
    align-items: center;
    margin-bottom: 40px;
}

.pokemon-detail-weight-height p {
    margin-right: 20px;
    color: #909090;
}

.pokemon-detail-img {
    display: flex;
    flex-wrap: wrap;
    margin-top: 40px;
}

.pokemon-detail-img-container {
    border: 1px dashed #f7ca15;
    margin-right: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
}

@media screen and (max-width:950px) {
    .pokemon-detail-container{
        width: 90%;
        margin: 70px auto 0 auto;
    }
}
</style>