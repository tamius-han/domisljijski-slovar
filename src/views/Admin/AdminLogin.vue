<template>
  <div class="page">
    <div class="content">
      <div>
        <h1>
          Grajska vrata
        </h1>
        <p>
          Gospod Sauron bo preveril, če je dostop požegnan.
        </p>
        <div>
          <button @click="signIn()">Vstop</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import env from '../../../config/env';

export default defineComponent({
  name: 'AdminLogin',
  data() {
    return {
      auth2: undefined
    }
  },
  mounted() {
    (window as any).gapi.load("auth2", () => {
      this.auth2 = (window as any).gapi.auth2.init({ client_id: env.GOOGLE_CLIENT_ID, scope: 'email' });

      // auth2.attachClickHandler(
      //   this.$refs.signinBtn,
      //   {},
      //   googleUser => {
      //     this.$emit("success", googleUser);
      //   },
      //   error => {
      //     this.$emit("error", error);
      //     this.$emit("failure", error); // an alias
      //   }
      // );
    });
  },
  methods: {
    async signIn() {
      const googleUser = await (this.auth2 as any).signIn({
        scope: 'email'
      });
      // const googleUser = this.$gAuth.signIn();

      // if (!googleUser) {
        // return null;
      // }

      console.info('Got google user:', googleUser);
      console.info('Got google user:', googleUser.getBasicProfile());
      console.info('Got token:', googleUser.getAuthResponse().id_token);
      // console.info('Email:', googleUser.getBasicProfile().getEmail());
      // console.info('Auth response:', googleUser.getAuthResponse());
    }
  }
})
</script>

<style lang="scss" scoped>

</style>