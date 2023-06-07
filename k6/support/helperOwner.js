import http from "k6/http";
import { sleep } from "k6";
import { envOwner , api_version } from "../config/alpha.js";
import { loginOwnerdata } from "../fixture/data_test/loginOwnerdata.js";

export function getTokenFromSignIn() {
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${envOwner.key}`
    let payload = loginOwnerdata

    let headers = {
        "Content-Type": "application/json",
      };
    
      let res = http.post(url, JSON.stringify(payload), { headers: headers });

      if (res.status === 200) {
        const responseBody = JSON.parse(res.body);
        console.log(responseBody.idToken);
        return responseBody.idToken;
        
      } else {
        console.log(`Request failed with status code: ${res.status}`);
      }

      sleep(1);
}

export function getTokenFromStaff() {
    let url = `${envOwner.baseURL}/${api_version.v4}/staff-auth?uid=${envOwner.uid}`
    let token = getTokenFromSignIn()

    let headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
    
      let res = http.get(url, { headers: headers });

      if (res.status === 200) {
        const responseBody = JSON.parse(res.body);
        console.log(responseBody.data.item.jwt.accessToken);
        return responseBody.data.item.jwt.accessToken
      } else {
        console.log(`Request failed with status code: ${res.status}`);
      }

      sleep(1);
}