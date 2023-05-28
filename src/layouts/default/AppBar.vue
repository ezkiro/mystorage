<template>
  <v-app-bar flat :elevation="2">
    <v-app-bar-title>
      <v-icon icon="mdi-account" />
      {{ getUserName() }}
    </v-app-bar-title>
    <template v-slot:append>
      <v-btn icon="mdi-heart"></v-btn>

      <v-btn icon="mdi-magnify"></v-btn>

      <v-btn v-if="isAuthorized()" icon="mdi-logout" @click="logout"></v-btn>
    </template>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { setAuthenticated, isAuthorized, getUserName } from "@/service/auth";

const logout = () => {
  setAuthenticated(false);
};
</script>
