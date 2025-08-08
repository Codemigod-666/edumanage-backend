// import app from "./app";
// import { config } from "./config";

// const port = parseInt(config.port, 10) || 3000;

// app.listen(port, () => {
//   console.log(
//     `${config.nodeEnv} - Server is running on http://localhost:${port}`
//   );
// });

import app from "./app";
import { config } from "./config";

// Prefer Railway-injected PORT, fallback to config
const port = parseInt(process.env.PORT || config.port || "3000", 10);

app.listen(port, () => {
  console.log(
    `${config.nodeEnv} - Server is running on http://localhost:${port}`
  );
});
