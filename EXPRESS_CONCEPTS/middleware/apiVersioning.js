const urlVersioning = (version) => (req, res, next) => {
  if (req.path.startsWith(`/api/${version}`)) {
    next();
  } else {
    return res.status(404).json({
      status: "error",
      success: false,
      error: "Invalid API version",
    });
  }
};

const headerVersioning = (version) => (req, res, next) => {
  if (req.get("Accept-Version") === version) {
    next();
  } else {
    return res.status(404).json({
      status: "error",
      success: false,
      error: "Invalid API version",
    });
  }
};
// ->  application/json  -> application/vnd.api+json
const contentTypeVersioning = (version) => (req, res, next) => {
  const contentType = req.get("Content-Type");

  if (
    contentType &&
    contentType.includes(`application/vnd.api${version}+json`)
  ) {
    next();
  } else {
    return res.status(404).json({
      status: "error",
      success: false,
      error: "Invalid API version",
    });
  }
};

module.exports = { urlVersioning, headerVersioning, contentTypeVersioning };
