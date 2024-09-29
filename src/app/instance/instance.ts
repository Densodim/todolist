import axios from "axios";

export const settings = {
  withCredentials: true,
  headers: {
    "API-KEY": "069a78c4-b7e6-41b2-8e8a-e17cd72d1c52",
  },
};

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  ...settings,
});
