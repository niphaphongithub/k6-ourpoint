import http from "k6/http";
import { sleep } from "k6";
import { stages , thresholds , thinktime1 , thinktime2 } from "./common.js";
import { envCRM , api_version } from "../config/alpha.js";
import { getTokenFromLoginMember } from "../support/helperCRM.js";

export let options = {
  stages: stages,
  thresholds: thresholds,
};


export default function () {
    let url = `${envCRM.baseURL}/${api_version.v4}/member`;
    let payload = loginCRMdata
  
    let headers = {
      "Content-Type": "application/json",
    };
  
    let res = http.post(url, JSON.stringify(payload), { headers: headers });
  
    if (res.status === 200) {
      console.log("Request successful");
        // const responseBody = JSON.parse(res.body);
        // console.log(responseBody.data.item.token) ;
    } else {
      console.log(`Request failed with status code: ${res.status}`);
    }
  
    sleep(thinktime2);
  }