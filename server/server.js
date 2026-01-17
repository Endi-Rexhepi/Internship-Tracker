const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express(); 

app.use(cors());
app.use(express.json());

require("./config/mongoose.config");


require("./routes/auth.routes")(app);
require("./routes/application.routes")(app);

app.get("/", (req, res) => res.json({ message: "Internship Tracker API running" }));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
