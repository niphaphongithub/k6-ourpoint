import http from "k6/http";
import { sleep } from "k6";
import { stages, thresholds, thinktime2 } from "./common.js";
import { getTokenFromStaff , getTokenFromSignIn , getUID} from "../support/helperOwner.js";
import { envOwner, api_version } from "../config/alpha.js";
import { addPointdata } from "../fixture/data_test/addPointdata.js";

export let options = {
  stages: stages,
  thresholds: thresholds,
};

export let token = "";

export function getShopID() {
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
    // console.log(responseBody.data.item.staff.branch.shopId);
    return responseBody.data.item.staff.branch.shopId;
  } else {
    console.log(`Request failed with status code: ${res.status}`);
  }

  sleep(1);
}

export function getMemberID() {
let token = "";

let shopId = getShopID()

let position = Math.floor(Math.random() * 10);

let url =
  `${envOwner.baseURL}/${api_version.v4}/shops/${shopId}/actions/list-members`;

if (!token) {
  // get new token
  token = getTokenFromStaff();
}

let payload = {
  branchID: null,
  searchText: "",
  orderBy: "createdAt",
  isDesc: true,
  isActive: null,
  tierId: null,
  page: 1,
  limit: 15,
};

let headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

let res = http.post(url, JSON.stringify(payload), { headers: headers });

if (res.status === 200) {;
  const responseBody = JSON.parse(res.body);
  // console.log(responseBody.data.items.members[0].id);
  return responseBody.data.items.members[position].id;
} else if (res.status === 401) {
  // get new token
  token = getTokenFromStaff();
} else {
  console.log(`Request failed with status code: ${res.status}`);
}

sleep(1);
}

export default function () {
  let user_id = getMemberID()
  let shop_id =  getShopID()
  console.log("shop ID : " ,shop_id," and user ID : " ,user_id)
  let url = `${envOwner.baseURL}/${api_version.v4}/members/${user_id}/points/add`;

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
