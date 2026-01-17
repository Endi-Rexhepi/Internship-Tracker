const controller = require("../controllers/application.controller");
const auth = require("../middleware/auth.middleware");

module.exports = (app) => {
  app.post("/api/applications", auth, controller.create);
  app.get("/api/applications", auth, controller.getAll);
  app.get("/api/applications/:id", auth, controller.getOne); // optional: you can also enforce ownership in getOne
  app.put("/api/applications/:id", auth, controller.update);
  app.delete("/api/applications/:id", auth, controller.remove);
};
