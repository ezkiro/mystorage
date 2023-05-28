<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <v-img height="300" src="@/assets/logo.svg" />

      <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>

      <h1 class="text-h2 font-weight-bold">My Storage</h1>

      <div class="py-14" />

      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-btn
            color="primary"
            min-width="228"
            rel="noopener noreferrer"
            size="x-large"
            variant="flat"
            @click="login"
            :disabled="!isReady || !isGapiReady"
          >
            <v-icon icon="mdi-account" size="large" start />

            Google Sign In
          </v-btn>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script lang="ts" setup>
import {
  useTokenClient,
  type AuthCodeFlowSuccessResponse,
  type AuthCodeFlowErrorResponse,
} from "vue3-google-signin";

import { setAuthenticated, isAuthorized, setUserName } from "@/service/auth";
import { GApiSvc } from "@/service/GApiSvc";
import { ref } from "vue";

const isGapiReady = ref(false);
GApiSvc.init().then(() => {
  isGapiReady.value = true;
});

const handleOnSuccess = async (response: AuthCodeFlowSuccessResponse) => {
  console.log("Access Token: ", response.access_token);

  const { name, email } = await GApiSvc.getProfile();
  if (!name || !email) {
    alert("No profile found.");
    return;
  }

  console.log("Name: ", name);
  console.log("Email: ", email);
  setUserName(name);
  setAuthenticated(true);
};

const handleOnError = (errorResponse: AuthCodeFlowErrorResponse) => {
  console.log("Error: ", errorResponse);
};

const { isReady, login } = useTokenClient({
  scope: "https://www.googleapis.com/auth/drive",
  onSuccess: handleOnSuccess,
  onError: handleOnError,
  // other options
});

const loginDummy = () => {
  setAuthenticated(true);
  console.log("loginDummy isAuthorized: ", isAuthorized());
};
</script>
