<template>
  <div class="signup-container">
    <PokemonSide />
    <div class="signup-right">
      <h3 class="signup-header">Sign up</h3>
      <form class="signup-form" @submit.prevent="handleSubmit">
        <label class="signup-label-email" for="email">Email:</label>
        <input class="signup-input" type="email" name="email" v-model="email" required>

        <label class="signup-label-password" for="password">Password:</label>
        <input class="signup-input" type="password" name="password" v-model="password" required>

        <div class="signup-error" v-if="error">{{ error }}</div>

        <button class="signup-button">Sign up</button>
      </form>

      <div class="signin-link">
        <router-link to="/login">If you have a account, you can login here.</router-link>
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
        await store.dispatch('signup', {
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
.signup-container {
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

.signup-right {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 50%;
}

.signup-header {
  margin-bottom: 20px;
}

.signup-form {
  display: flex;
  flex-direction: column;
  padding: 20px 0px;
  width: 400px;
  border-top: 1px solid #F3F3F4;
}

.signup-label-email {
  margin-bottom: 10px;
}

.signup-label-password {
  margin-bottom: 10px;
  margin-top: 30px;
}

.signup-input {
  height: 40px;
  border: none;
  background-color: #F3F3F4;
  border-radius: 8px;
  padding: 0 10px;
}

.signup-input:focus {
  outline: dashed #0203F7;
}

.signup-error{
  color: red;
  margin-top: 20px;
}

.signup-button {
  margin-top: 40px;
  height: 40px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: white;
  background-color: #0203F7;
  transition: 0.5s ease;
}

.signin-button:hover {
  background-color: #0303da;
}

.signin-link a {
  text-decoration: none;
  color: initial;
}

@media screen and (max-width:950px) {
    .signup-right {
        width: 100%;
    }

    .signup-form{
      width: 70%;
    }
}
</style>