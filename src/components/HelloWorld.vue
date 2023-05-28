<template>
  <v-card class="mx-auto">
    <v-list :items="items"></v-list>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { GApiSvc } from "@/service/GApiSvc";

const loadFiles = async () => {
  const files = await GApiSvc.listFiles();
  console.log("Files: ", files);

  return files;
};

export default defineComponent({
  data() {
    return {
      items: [] as Array<{ title: string; value: string }>,
    };
  },
  mounted() {
    loadFiles().then((files) => {
      files.forEach((file) => {
        this.items.push({
          title: file.name,
          value: file.id,
        });
      });
    });
  },
});
</script>
