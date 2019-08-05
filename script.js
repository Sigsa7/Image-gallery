import http from "k6/http";
import { sleep } from "k6";

export default function() {
  function rando(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
  http.get(`http://127.0.0.1:3000/${rando(0,50000)}/images`);
  
};

