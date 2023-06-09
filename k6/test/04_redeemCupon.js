import http from "k6/http";
import { sleep } from "k6";
import { getTokenFromShopDetail } from "../support/helperCRM.js"
import { stages , thresholds , thinktime1 , thinktime2 } from "./common.js";
import { envCRM , api_version } from "../config/alpha.js";
import { redeemCupondata } from "../fixture/data_test/redeemCupondata.js";

export let options = {
  stages: stages,
  thresholds: thresholds,
};

export let token = ""

export default function () {
  let url = `${envCRM.baseURL}/${api_version.v5}/coupons`;
 
  if (!token) {
    // get new token
    token = getTokenFromShopDetail();
  }
  let payload = redeemCupondata

  let headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  sleep(thinktime2);

  let res = http.post(url, JSON.stringify(payload), { headers: headers });

  if (res.status === 200) {
    console.log("Request successful");
  } else if (res.status === 401) {
    // get new token
    token = getTokenFromShopDetail();
  }
  else {
    console.log(`Request failed with status code: ${res.status}`);
  }
  console.log("Response body:", res.body);

  sleep(thinktime2);
}
