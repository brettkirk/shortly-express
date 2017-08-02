const parseCookies = (req, res, next) => {
  var header = req.headers.cookie;
  
  if (header) {
    var cookies = header.split('; ');
    cookies.forEach ( function (cookie) {
      var crumbs = cookie.split('=');
      var key = crumbs[0];
      var value = crumbs[1];

      req.cookies[key] = value;
    });
  } 
  next();
};

module.exports = parseCookies;