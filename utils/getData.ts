import axios from "axios";

export const getData = (url: string) => {
  return axios.get(url).then((res) => res.data);
};
