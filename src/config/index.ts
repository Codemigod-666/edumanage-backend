// import { getEnvVar } from "./env";

// export type NodeEnvOptions = "production" | "development";

// export type Config = {
//   nodeEnv: NodeEnvOptions;
//   port: string;
//   healthSecret: string;
//   logSecret: string;
// };

// // Export configurations
// export const config: Config = {
//   nodeEnv: getEnvVar("NODE_ENV") as NodeEnvOptions,
//   port: process.env.PORT || "3000",
//   healthSecret: getEnvVar("HEALTH_SECRET"),
//   logSecret: getEnvVar("LOGS_SECRET"),
// };

import { getEnvVar } from "./env";

export type NodeEnvOptions = "production" | "development";

export type Config = {
  nodeEnv: NodeEnvOptions;
  port: string;
  healthSecret: string;
  logSecret: string;
};

export const config: Config = {
  nodeEnv: getEnvVar("NODE_ENV", "development") as NodeEnvOptions,
  port: getEnvVar("PORT", "3000"),
  healthSecret: getEnvVar("HEALTH_SECRET", "default-health"),
  logSecret: getEnvVar("LOGS_SECRET", "default-logs"),
};
