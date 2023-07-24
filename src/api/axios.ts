import axios from "axios";

const AxiosClient = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
});

export default AxiosClient;
