import AccessControl from "accesscontrol";
const ac = new AccessControl();

exports.roles = (function() {
  ac.grant("student")
    .readOwn("profile")
    .updateOwn("profile");

  ac.grant("mentor")
    .extend("student")
    .readOwn("request");

  ac.grant("manager")
    .createOwn("mentor")
    .createOwn("level")
    .createOwn("skill")
    .readAny("level")
    .readAny("skill")
    .readAny("mentor")
    .readAny("student")
    .updateAny("mentor")
    .updateAny("skill")
    .updateAny("level")
    .deleteAny("mentor")
    .deleteAny("level")
    .deleteAny("skill");

  ac.grant("admin")
    .createAny("manager")
    .readAny("manager")
    .deleteAny("manager");

  return ac;
})();
