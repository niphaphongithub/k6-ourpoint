export const stages = [
  // { duration: "1s", target: 1 },
  { duration: "10s", target: 5 },
  // { duration: "2m", target: 200 },
  // { duration: "2m", target: 100 },
  // { duration: "30s", target: 0 },
];

export const thresholds = {
  http_req_duration: ["avg<1000"],
};

export const thinktime1 = 2.0;
export const thinktime2 = 5.0;
