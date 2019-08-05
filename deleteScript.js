import http from "k6/http";
import { sleep } from "k6";
;
export default function() {
  http.del("http://127.0.0.1:3001/344/images");
};
