const express = require("express");
const dotenv = require("dotenv");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const hpp = require("hpp");
const cors = require("cors");
const connectDB = require("./config/db");
// const errorHandler = require("./middleware/error");

dotenv.config({ path: "./.env" });

connectDB();

const auth = require("./routes/auth");
const user = require("./routes/user");
const property = require("./routes/property");
const buysell = require("./routes/buysell");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
// }

app.use(mongoSanitize());
app.use(helmet());
app.use(hpp());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Aconomy Real-estate application." });
});

app.use("/api/v1/auth", auth);
app.use("/api/v1/property", property);
app.use("/api/v1/user", user);
app.use("/api/v1/buysell",buysell);

// app.use(errorHandler);

const PORT = process.env.PORT || 8080;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
