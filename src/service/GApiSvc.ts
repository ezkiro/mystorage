import { onMounted, onUnmounted, readonly, ref, watch, watchEffect } from "vue";

const loaded = ref(false);
const isLoading = ref(false);
const error = ref(false);
const subscriberCount = ref(0);

const createScriptTag = () => {
  const scriptTag2 = document.createElement("script");
  scriptTag2.src = "https://apis.google.com/js/api.js";
  scriptTag2.async = true;
  scriptTag2.defer = true;
  return scriptTag2;
};

const initialize = () => {
  console.log("initialize");

  isLoading.value = true;
  const scriptTag = createScriptTag();
  document.head.appendChild(scriptTag);
  scriptTag.onload = () => {
    isLoading.value = false;
    loaded.value = true;
  };
  scriptTag.onerror = () => {
    isLoading.value = false;
    error.value = true;
  };
};

watch(
  () => subscriberCount.value,
  (newCount, _oldCount) => {
    if (newCount > 0 && !loaded.value && !isLoading.value) {
      initialize();
    }
  }
);

export function useGapi() {
  onMounted(() => {
    subscriberCount.value++;
  });
  onUnmounted(() => {
    subscriberCount.value--;
  });
  return {
    scriptLoaded: readonly(loaded),
    scriptLoadError: readonly(error),
  };
}

export class GApiSvc {
  private static API_KEY: string = import.meta.env.VITE_API_KEY as string;

  static init() {
    const { scriptLoaded } = useGapi();
    console.log("init scriptLoaded:" + scriptLoaded.value);

    return new Promise<void>((resolve, reject) => {
      watchEffect(async () => {
        if (!scriptLoaded.value) {
          resolve();
          return;
        }
        gapi.load("client", async () => {
          await gapi.client.init({
            apiKey: this.API_KEY,
            discoveryDocs: [
              "https://www.googleapis.com/discovery/v1/apis/people/v1/rest",
              "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
            ],
          });
          resolve();
        });
      });
    });
  }

  static async getProfile() {
    console.log("getProfile");
    let response;
    try {
      response = await gapi.client.people.people.get({
        resourceName: "people/me",
        personFields: "names,emailAddresses",
      });
    } catch (err) {
      alert(err.message);
      return {};
    }

    const result = response.result;
    if (!result || !result.emailAddresses || !result.names) {
      alert("No profile found.");
      return {};
    }
    const name = result.names[0].displayName;
    const email = result.emailAddresses[0].value;
    return { name, email };
  }

  static async listFiles() {
    console.log("listFiles");
    let response;
    try {
      response = await gapi.client.drive.files.list({
        pageSize: 10,
        fields: "nextPageToken, files(id, name)",
      });
    } catch (err) {
      alert(err.message);
      return [];
    }

    const files = response.result.files;
    if (!files || files.length === 0) {
      alert("No files found.");
      return [];
    }
    return files;
  }
}
