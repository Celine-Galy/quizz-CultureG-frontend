import { environment } from "../environments/environment.development";
import { environment as environmentProd } from "../environments/environment";

let BASE_URL: string;

if (environmentProd.production === true) {
    BASE_URL = environmentProd.base_url;
}
else {
    BASE_URL = environment.base_url;
}

export { BASE_URL };