import http from "k6/http";
import { envCRM, api_version } from "../config/alpha.js";
import { loginCRMdata } from "../fixture/data_test/loginCRMdata.js";

export function getTokenFromLoginMember() {
  let url = `${envCRM.baseURL}/${api_version.v4}/member`;
  let payload = loginCRMdata;
  let headers = {
    "Content-Type": "application/json",
  };

  let res = http.post(url, JSON.stringify(payload), { headers: headers });

  if (res.status === 200) {
    const responseBody = JSON.parse(res.body);
    // console.log(responseBody.data.item.token);
    return responseBody.data.item.token;
  } else {
    console.log(`Request failed with status code: ${res.status}`);
  }
}

export function getTokenFromSigninCustomer() {
  let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${envCRM.key}`;
  let login_token = getTokenFromLoginMember();
  let payload = {
    returnSecureToken: true,
    token: login_token,
  };
  let headers = {
    "Content-Type": "application/json",
  };

  let res = http.post(url, JSON.stringify(payload), { headers: headers });

  if (res.status === 200) {
    const responseBody = JSON.parse(res.body);
    // console.log(responseBody);
    return responseBody.idToken;
  } else {
    console.log(`Request failed with status code: ${res.status}`);
  }
}

export function getUID() {
  let url = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${envCRM.key}`;
  let login_token = getTokenFromSigninCustomer();
  console.log(login_token)
  let payload = {
    idToken: login_token,
  };

  let headers = {
    "Content-Type": "application/json",
  };

  let res = http.post(url, JSON.stringify(payload), { headers: headers });
  if (res.status === 200) {
    const responseBody = JSON.parse(res.body);
    console.log(responseBody.users[0].localId);
    return responseBody.users[0].localId;
  } else {
    console.log(`Request failed with status code: ${res.status}`);
  }
}

export function getTokenFromShopDetail() {
  let user_uid = getUID();
  console.log(user_uid);
  let url = `${envCRM.baseURL}/member/${api_version.v3}/detail?shop_id=4196&uid=${user_uid}`;

  let token = getTokenFromSigninCustomer();
  let headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  let res = http.get(url, { headers: headers });

  if (res.status === 200) {
    const responseBody = JSON.parse(res.body);
    console.log(responseBody.data.item.access_token);
    return responseBody.data.item.access_token;
  } else {
    console.log(`Request failed with status code: ${res.status}`);
  }
}
