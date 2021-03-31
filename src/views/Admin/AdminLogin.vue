<template>
  <div class="root flex flex-column">
    <div class="page flex-grow flex-noshrink">
      <div class="content h100">
        <div class="flex flex-column h100">
          <div class="flex-nogrow flex-noshrink">
            <h1>
              Temna stran knjižnice
            </h1>
            <p>
              Tod mimo se lahko sprehodijo le skrbniki. Kakšnih velikonočnih jajčk pa tukaj ne boste našli.
            </p>
          </div>
          <div class="flex flex-grow w100">
            <div class="login-button" @click="signIn()">Vstop</div>
          </div>
        </div>
      </div>
    </div>

    <div class="page flex-nogrow">
      <div class="content">
        <small>
          <p>
            Zmajski Vek: Nikoli Pričakovan (Dragon Age: Inquisition), samo tko ob potki. Relativno ok špil. Plusi: za razliko od nekaterih (khm Neborob, Prestololomec, Vladavina ognja, itd.) vejo, kaj je zmaj in kaj ni. Ampak točke za nepravilno izgovorjavo 'wyvern'. Ft. DAI Cinematic Tools & noVideo freestyle thing.
          </p>
          <p>
            Presenečeni nad žajfoškatlanjem v nogi strani? Ne poznate me dovolj dolgo + kot pravijo čivkarji: ne me afnat. Sem pa jaz bolj presenečen, da tole berete. Kdo sploh še bere malo besedilo na koncu strani? Zmajem s svojo glavo.
          </p>
        </small>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import env from '../../../config/env';
import axios from 'axios';

export default defineComponent({
  name: 'AdminLogin',
  data() {
    return {
      auth2: undefined
    }
  },
  async mounted() {
    (window as any).gapi.load("auth2", () => {
      this.auth2 = (window as any).gapi.auth2.init({ client_id: env.GOOGLE_CLIENT_ID, scope: 'email' });
    });

    if (window.localStorage.getItem('userToken')) {
      let token = this.parseJwt(window.localStorage.getItem('userToken'));

      if (token.exp * 1000 < Date.now()) {
        return;
      }
      if (token.exp * 1000 < (Date.now() - 72 * 3600000)) {
        const res = await axios.get(
          `${env.ADMIN_API_BASE}/auth/refresh`
        )

        token = res.data;
        window.localStorage.setItem('userToken', token);
      }

      this.$router.push('/durin/words');
    }
  },
  methods: {
    parseJwt (token: any) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    },
    async signIn() {
      const googleUser = await (this.auth2 as any).signIn({
        scope: 'email'
      });

      if (!googleUser) {
        return null;
      }

      try {
        const res = await axios.post(
          `${env.ADMIN_API_BASE}/auth/login/`,
          {
            idToken: googleUser.getAuthResponse().id_token
          }
        );

        window.localStorage.setItem('userToken', res.data);
        this.$router.push('/durin/words');
      } catch (e) {
        console.log('Error while logging in:', e);
      }

    }
  }
})
</script>

<style lang="scss" scoped>
.root {
  height: 100%;
  width: 100%;
  background-image: url('/img/backgrounds/keeper-login.webp');
  background-position: center;
  background-size: cover;
}
p {
  color: #eee;
}

.login-button {
  justify-self: center;
  align-self: center;
}

.login-button {
  cursor: pointer;
  margin: 0 auto;
  width: 16rem;
  text-align: center;
  border: 1px solid #ffbc8f;
  color: #ffbc8f;
  padding: 1.5rem 0;
  font-size: 2rem;

  background-color: #241b14c5;
}
.login-button:hover {
  background-color: #ffbc8fde;
  color: #382a1e;

  transition: background-color 0.25s ease, color 0.25s ease;
}
</style>