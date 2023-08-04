<template>
  <div class="login-container">
    <PokemonSide />
    <div class="login-right">
      <h3 class="login-header">Login</h3>
      <form class="login-form" @submit.prevent="handleSubmit">
        <label class="login-label-email" for="email">Email:</label>
        <input class="login-input" type="email" name="email" v-model="email" required>

        <label class="login-label-password" for="password">Password:</label>
        <input class="login-input" type="password" name="password" v-model="password" required>

        <div class="login-error" v-if="error">{{ error }}</div>

        <button class="signin-button">Sign In</button>
      </form>

      <div class="signup-link">
        <router-link to="/signup">If you don't have an account, you can have it here.</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import PokemonSide from '@/components/PokemonSide.vue'

export default {
    setup() {
        const email = ref('');
        const password = ref('');
        const error = ref(null);
        const store = useStore();
        const router = useRouter();
        const handleSubmit = async () => {
            try {
                await store.dispatch('login', {
                    email: email.value,
                    password: password.value
                });
                router.push('/');
            }
            catch (err) {
                error.value = err.message;
            }
        };
        return { handleSubmit, email, password, error };
    },
    components: { PokemonSide }
}
</script>

<style>
.login-container {
  display: flex;
  width: 100%;
}

.pokemon-left-image {
  width: 50%;
  background-image: url('../assets/login-left.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.login-right {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 50%;
}

.login-header {
  margin-bottom: 20px;
}

.login-form {
  display: flex;
  flex-direction: column;
  padding: 20px 0px;
  width: 400px;
  border-top: 1px solid #F3F3F4;
}

.login-label-email {
  margin-bottom: 10px;
}

.login-label-password {
  margin-bottom: 10px;
  margin-top: 30px;
}

.login-input {
  height: 40px;
  border: none;
  background-color: #F3F3F4;
  border-radius: 8px;
  padding: 0 10px;
}

.login-input:focus {
  outline: dashed #0203F7;
}

.login-error{
  color: red;
  margin-top: 20px;
}

.signin-button {
  margin-top: 40px;
  height: 40px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: white;
  background-color: #0203F7;
  transition: 0.5s ease;
  text-align: center;
}

.signin-button:hover {
  background-color: #0303da;
}

.signup-link a{
  text-decoration: none;
  color: initial;
}

@media screen and (max-width:950px) {
    .login-right {
        width: 100%;
    }

    .login-form{
      width: 70%;
    }
}
</style>