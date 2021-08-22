import axios from "axios";

axios.defaults.headers.common["Content-Type"] = "application/vnd.api+json";

axios.interceptors.request.use(config => {
  config.headers.Authorization = `${localStorage.getItem(
    "access_token"
  )}`;

  return config;
});

axios.interceptors.response.use(
  res => res,
  err => {
    switch (err.response.status) {
      case 401:
        localStorage.clear();
        window.location.reload();
        break;

      //Server errors
      case 500:
      case 501:
      case 502:
      case 503:
      case 504:
      case 505:
      case 506:
      case 507:
      case 508:
      case 509:
      case 510:
      case 511:
        console.log("Ocurrió un error, por favor comuníquese con su proveedor");
        break;
    }

    return Promise.reject(err.response);
  }
);

export default axios;