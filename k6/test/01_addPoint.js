import http from "k6/http";
import { sleep } from "k6";
import { getTokenFromStaff } from "../support/helperOwner.js";
import { stages, thresholds, thinktime1, thinktime2 } from "./common.js";
import { envOwner, api_version } from "../config/alpha.js";
import { addPointdata } from "../fixture/data_test/addPointdata.js";

export let options = {
  stages: stages,
  thresholds: thresholds,
};

export let token = "";

export default function () {
  let url = `${envOwner.baseURL}/${api_version.v4}/members/85043/points/add`;

  if (!token) {
    // get new token
    token = getTokenFromStaff();
  }

  let payload = addPointdata;

  let headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  let res = http.post(url, JSON.stringify(payload), { headers: headers });

  if (res.status === 200) {
    console.log("Request successful");
  } else if (res.status === 401) {
    // get new token
    token = getTokenFromStaff();
  } else {
    console.log(`Request failed with status code: ${res.status}`);
  }
  console.log("Response body:", res.body);

  sleep(thinktime2);
}
