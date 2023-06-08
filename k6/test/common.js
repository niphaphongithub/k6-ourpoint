export const stages = [
  // { duration: "10s", target: 10 },
  { duration: "1m", target: 30 },
  // { duration: "2m", target: 100 },
  // { duration: "1m", target: 20 },
  // { duration: "30s", target: 0 },
];

export const thresholds = {
  http_req_duration: ["avg<1000"],
};

export const thinktime1 = 2.0;
export const thinktime2 = 5.0;
