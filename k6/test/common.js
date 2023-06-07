export const stages = [
  // { duration: "1s", target: 1 },
  { duration: "1s", target: 1 },
  // { duration: "1m", target: 5 },
  // { duration: "1m", target: 2 },
  // { duration: "10s", target: 0 },
];

export const thresholds = {
  http_req_duration: ["avg<2000"],
};

export const thinktime1 = 2.0;
export const thinktime2 = 5.0;
