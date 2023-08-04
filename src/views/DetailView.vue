<template>
    <div class="detail-container" ref="chartContainer" style="">
        <canvas :width="canvasWidth" :height="canvasHeight" ref="myChartCanvas"></canvas>
    </div>
</template>
  
<script>
import { ref, onMounted, reactive } from 'vue';
import Chart from 'chart.js/auto';

export default {
    setup() {
        const myChartCanvas = ref(null);
        const chartContainer = ref(null);
        const chartData = reactive({
            labels: [],
            datasets: [
                {
                    label: 'Pokemon Types Dataset',
                    data: [],
                    backgroundColor: ["rgb(255, 99, 132)", "rgb(0, 128, 0)", "rgb(50, 50, 255)", "rgb(255, 255, 0)", "rgb(128, 0, 128)",
                        "rgb(0, 255, 255)", "rgb(255, 165, 0)", "rgb(0, 0, 255)", "rgb(139, 69, 19)", "rgb(255, 0, 0)", "rgb(0, 255, 0)",
                        "rgb(128, 128, 128)", "rgb(176, 224, 230)", "rgb(255, 192, 203)", "rgb(255, 99, 71)", "rgb(0, 0, 128)", "rgb(255, 228, 196)",
                        "rgb(46, 139, 87)", "rgb(255, 20, 147)", "rgb(128, 0, 0)",],
                    hoverOffset: 4,
                },
            ],
        });

        onMounted(async () => {
            const ctx = myChartCanvas.value.getContext('2d');
            const { width, height } = chartContainer.value.getBoundingClientRect();

            chartData.canvasWidth = width;
            chartData.canvasHeight = height;

            try {
                const pokemonTypeResponse = await fetch('https://pokeapi.co/api/v2/type');
                const pokemonTypeData = await pokemonTypeResponse.json();

                const pokemonLengths = [];

                await Promise.all(
                    pokemonTypeData.results.map(async (item) => {
                        const pokemonTypeName = await fetch(`https://pokeapi.co/api/v2/type/${item.name}`);
                        const pokemonTypeNameData = await pokemonTypeName.json();
                        pokemonLengths.push(pokemonTypeNameData.pokemon.length);
                    })
                );

                chartData.labels = pokemonTypeData.results.map(item => item.name);
                chartData.datasets[0].data = pokemonLengths.map(item => item);

                new Chart(ctx, {
                    type: 'doughnut',
                    data: chartData,
                });
            } catch (error) {
                console.error('Data Error:', error);
            }
        });

        return {
            myChartCanvas,
            chartContainer,
        };
    },
};
</script>

<style>
.detail-container {
    position: relative;
    width: 500px;
    height: 300px;
    margin-top: 25px;
}

@media screen and (max-width:950px) {
    .detail-container {
        width: 100%;
        margin-top: 90px;
    }
}
</style>