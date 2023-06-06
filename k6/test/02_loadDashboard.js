import http from "k6/http";
import { sleep } from "k6";
import { getTokenFromStaff } from "../support/helperOwner.js";
import { stages , thresholds , thinktime1 , thinktime2 } from "./common.js";
import { envOwner , api_version } from "../config/alpha.js";
import { loadDashboarddata } from "../fixture/loadDashboarddata.js";

export let options = {
  stages: stages,
  thresholds: thresholds,
};

export default function () {
  let ecom_report_url =
    `${envOwner.baseURL}/${api_version.v5}/shop/dashboard/online/sale-rate`;
  let member_sum_url =
    `${envOwner.baseURL}/${api_version.v5}/shop/dashboard/member-info`;
  let total_member_url =
    `${envOwner.baseURL}/${api_version.v5}/shop/dashboard/total-member`;

  let token = getTokenFromStaff();

  let payload = loadDashboarddata

  let headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  let ecom_report_res = http.post(ecom_report_url, JSON.stringify(payload), {
    headers: headers,
  });
  if (ecom_report_res.status === 200) {
    console.log("Request successful");
  } else {
    console.log(`Request failed with status code: ${ecom_report_res.status}`);
  }

  let member_sum_res = http.post(member_sum_url, JSON.stringify(payload), {
    headers: headers,
  });
  if (member_sum_res.status === 200) {
    console.log("Request successful");
  } else {
    console.log(`Request failed with status code: ${member_sum_res.status}`);
  }

  let total_member_res = http.post(total_member_url, JSON.stringify(payload), {
    headers: headers,
  });
  if (total_member_res.status === 200) {
    console.log("Request successful");
  } else {
    console.log(`Request failed with status code: ${total_member_res.status}`);
  }

  sleep(thinktime2);
}
