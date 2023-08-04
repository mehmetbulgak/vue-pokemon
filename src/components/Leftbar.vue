<template>
    <!-- Mobile LeftBar Menu -->
    <div class="hamburger-icon" @click="toggleLeftbar">
        <div v-if="!showLeftbar">
            <img src="../assets/icons/menu-icon.svg" width="25">
        </div>
        <div v-else>
            <img src="../assets/icons/close-icon.svg" width="25">
        </div>
    </div>
    <div v-if="user"
        :class="{ 'left-menu-container-mobile': !showLeftbar, 'left-menu-container-opened-mobile': showLeftbar }">
        <router-link @click="toggleLeftbar" to="/">
            <div class="left-menu-logo">
                <img src="@/assets/logo.png" width="200" alt="logo">
            </div>
        </router-link>
        <div class="left-menu-profile"> {{ user.email }}</div>
        <router-link @click="toggleLeftbar" class="left-menu-link" to="/">
            <img src="@/assets/icons/home-icon.svg" width="25">
            <div>Home</div>
        </router-link>
        <router-link @click="toggleLeftbar" class="left-menu-link" to="/detail">
            <img src="@/assets/icons/detail-icon.svg" width="25">
            <div>Details</div>
        </router-link>
        <button class="left-bar-logout" @click="handleLogout">Logout</button>
    </div>

    <!-- Desktop LeftBar Menu -->
    <div v-if="user" class="left-menu-container">
        <router-link to="/">
            <div class="left-menu-logo">
                <img src="@/assets/logo.png" width="200" alt="logo">
            </div>
        </router-link>
        <div class="left-menu-profile"> {{ user.email }}</div>
        <router-link class="left-menu-link" to="/">
            <img src="@/assets/icons/home-icon.svg" width="25">
            <div>Home</div>
        </router-link>
        <router-link class="left-menu-link" to="/detail">
            <img src="@/assets/icons/detail-icon.svg" width="25">
            <div>Details</div>
        </router-link>
        <button class="left-bar-logout" @click="handleLogout">Logout</button>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const store = useStore();
        const router = useRouter();
        const showLeftbar = ref(false);

        const toggleLeftbar = () => {
            showLeftbar.value = !showLeftbar.value;
        };

        const handleLogout = () => {
            store.dispatch('logout');
            router.push('/login');
        }

        return {
            showLeftbar,
            toggleLeftbar,
            handleLogout,
            user: computed(() => store.state.user),
        }
    }
}
</script>

<style>
.left-menu-container {
    border-right: 1px solid #ccc;
    width: 300px;
    height: 100vh;
    margin-right: 25px;
    display: flex;
    flex-direction: column;
}

.left-menu-logo {
    margin: 20px 0 10px 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.left-menu-profile {
    color: #c1c1c3;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 25px;
}

.left-menu-link {
    text-decoration: none;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 25px;
}

.left-menu-link img {
    margin-right: 15px;
}

.left-bar-logout {
    width: 150px;
    height: 35px;
    margin: 0 auto;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    background-color: #f5054f;
    color: white;
}

.hamburger-icon {
    display: none;
}

.left-menu-container-mobile {
    display: none;
}

@media screen and (max-width:950px) {
    .hamburger-icon {
        display: block;
        position: absolute;
        z-index: 3;
        top: 25px;
        left: 25px;
    }

    .left-menu-container {
        display: none;
    }

    .left-menu-container-mobile {
        transform: translateX(-100%);
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border: none;
        background-color: white;
        transition: 0.5s ease;
        z-index: 2;
    }

    .left-menu-container-opened-mobile {
        transform: translateX(0%);
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border: none;
        background-color: white;
        transition: 0.5s ease;
        z-index: 2;
    }

    .left-bar-logout {
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>