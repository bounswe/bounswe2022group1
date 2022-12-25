import axios from "axios";

/** Backend tarafında CORS yapılandırması yapıldıktan sonra
 * headers ayarı kaldırılabilir ...
 */
export default axios.create({
  baseURL: process.env.API_URL,
  headers: {
    "Content-Type": "text/plain",
  },
});
