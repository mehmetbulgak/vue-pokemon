<template>
    <div class="pokemon-left-image"></div>
</template>

<style>
.pokemon-left-image {
    width: 50%;
    background-image: url('../assets/login-left.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

@media screen and (max-width:950px) {
    .pokemon-left-image {
        display: none;
    }
}
</style>