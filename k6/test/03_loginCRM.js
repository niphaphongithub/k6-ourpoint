import http from "k6/http";
import { sleep } from "k6";
import { stages , thresholds , thinktime1 , thinktime2 } from "./common.js";
import { envCRM , api_version } from "../config/alpha.js";
import { SharedArray } from 'k6/data';

export let options = {
  stages: stages,
  thresholds: thresholds,
};

const payloads = JSON.parse(open('../fixture/userCRM.json'));


export default function () {
    let url = `${envCRM.baseURL}/${api_version.v4}/member`;
    const payload = payloads[__VU % payloads.length];
    // console.log(payload)
    let headers = {
      "Content-Type": "application/json",
    };
  
    let res = http.post(url, JSON.stringify(payload), { headers: headers });
  
    if (res.status === 200) {
      console.log("Request successful");
        const responseBody = JSON.parse(res.body);
        console.log(responseBody) ;
    } else {
      console.log(`Request failed with status code: ${res.status}`);
    }
  
    sleep(thinktime2);
  }