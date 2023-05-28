import { reactive, watch } from "vue";
import router from "@/router";

const authorization = reactive({
  isAllowed: false,
  redirectedName: "Home",
  userName: "",
});

export const isAuthorized = () => {
  return authorization.isAllowed;
};

export const setAuthenticated = (value: boolean) => {
  authorization.isAllowed = value;
};

export const setRedirectedName = (value: string) => {
  authorization.redirectedName = value;
};

export const getRedirectedName = () => {
  return authorization.redirectedName;
};

export const setUserName = (value: string) => {
  authorization.userName = value;
};

export const getUserName = () => {
  return authorization.userName;
};

watch(
  () => isAuthorized(),
  (newVal, _oldVal) => {
    console.log("watch isAuthorized:" + newVal);
    if (newVal) {
      router.push({ name: getRedirectedName() });
    } else {
      router.push({ name: "Login" });
    }
  }
);
