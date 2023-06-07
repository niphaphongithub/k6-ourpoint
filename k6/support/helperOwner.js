import http from "k6/http";
import { sleep } from "k6";
import { envOwner, api_version } from "../config/alpha.js";

const payloads = JSON.parse(open("../fixture/shop.json"));

export function getTokenFromSignIn() {
  let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${envOwner.key}`;
  const payload = payloads[__VU % payloads.length];
  // console.log(payload);
  let headers = {
    "Content-Type": "application/json",
  };

  let res = http.post(url, JSON.stringify(payload), { headers: headers });

  if (res.status === 200) {
    const responseBody = JSON.parse(res.body);
    // console.log(responseBody.idToken);
    return responseBody.idToken;
  } else {
    console.log(`Request failed with status code: ${res.status}`);
  }

  sleep(1);
}

export function getUID() {
  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyC19yGUE7LxaSLOHUXwNRNwXtRh6wFkhvQ";
  let login_token = getTokenFromSignIn();

  let payload = {
    idToken: login_token,
  };

  let headers = {
    "Content-Type": "application/json",
  };

  let res = http.post(url, JSON.stringify(payload), { headers: headers });
  if (res.status === 200) {
    const responseBody = JSON.parse(res.body);
    // console.log(responseBody.users[0].localId);
    return responseBody.users[0].localId;
  } else {
    console.log(`Request failed with status code: ${res.status}`);
  }
}

export function getTokenFromStaff() {
  let user_uid = getUID();
  // console.log(user_uid);
  let url = `${envOwner.baseURL}/${api_version.v4}/staff-auth?uid=${user_uid}`;
  let token = getTokenFromSignIn();

  let headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  let res = http.get(url, { headers: headers });

  if (res.status === 200) {
    const responseBody = JSON.parse(res.body);
    // console.log(responseBody.data.item.jwt.accessToken);
    return responseBody.data.item.jwt.accessToken;
  } else {
    console.log(`Request failed with status code: ${res.status}`);
  }

  sleep(1);
}




