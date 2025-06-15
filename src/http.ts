import axios,{AxiosRequestConfig} from 'axios';
export const axiosBaseURL = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

/*
export const getConfig = (token:string) => {
  let config:AxiosRequestConfig
  if(token){
    return config = {
      headers: {
        'Authorization': `Token  ${token}`,
        'Content-Type': 'application/json',
      }
    }
  }
  return config = {}
}
*/