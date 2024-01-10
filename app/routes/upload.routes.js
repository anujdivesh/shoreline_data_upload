const { authJwt } = require("../middleware");
const controller = require("../controllers/file.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/files", controller.getListFiles);
  app.get("/api/files/:name", controller.download);

  app.post("/api/upload",[authJwt.verifyToken, authJwt.isAdmin],controller.upload);

  app.delete("/api/files/:name", [authJwt.verifyToken, authJwt.isAdmin],controller.removeSync);

};
