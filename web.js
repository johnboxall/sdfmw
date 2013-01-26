/**
 * A server used for demoing "Sane Defaults for Optimizing Mobile Web Performance".
 */
var express = require("express");

var app = express();
var staticPath = __dirname + "/public"
var staticMiddleware = express.static(staticPath);
var cachedStaticMiddleware = express.static(staticPath, {maxAge: 86400000});

app.engine(".html", require("ejs").__express);
app.set("view engine", "html");

app.use("/static", staticMiddleware);

var delay = function(middleware) {
    return function(req, res, next) {
        var delay = parseInt(req.params.delay) || 1;
        var path = req.params.path || "index.html";

        req.url = path;

        setTimeout(function() {
            middleware(req, res, next);
        }, delay);
    };
};

var render = function(req, res) {
    res.render(req.params.viewname || "index.html", {
        now: +new Date,
        title: "Safe Defaults for Optimizing Mobile Web Performance"
    });
};

app.get("/cached-delay/:delay/:path", delay(cachedStaticMiddleware));
app.get("/delay/:delay/:path", delay(staticMiddleware));
app.get("/:viewname/", render);
app.get("/", render);
app.listen("3000");
console.log("SDFMW: 127.0.0.1:3000");
























/*

HOW TO JS AT BOTTOM

HOW TO TEST CACHING
(what is caching)
(how to set the caching)

HOW TO TIME STAMP


HOW TO CDN?

HOW TO MINIMIZE?
- CSS
- JS

HOW TO SET BOUNDRAIRES?


YSLOW:

1. make fewer HTTP requests
2. use a content delivery network (CDN)
3. avoid empty src or href?
4. add expires headers
5. compress components with gzip
6. put css at top
7 put javascript at bottom
8. avoid css expressions
9. make js/css external
10. reduce dns lookups
11. avoid url redirects
12. remove duplicate js and css
13. configure etags
14. make ajax cacheable
15. use get for ajax
16. reduce the # of dom
17. avoid 404
18. reduce cookie size
19. use cookie free domains
20. avoid alphaimageloader filter
21. od not scale images in html
22. favicon small and cacheable

PAGESPEED:

record the things from pagespeed



BASICS:
resolving DNS names
setting up TCP connections
transmitting HTTP requests
downloading resources
fetching resources from cache
prasing and executing scripts
rendering objects on the page


# Optimizing Caching
- Leverage browser caching

--> Setting an expiry date or a maximum age in the HTTP headers for static resources instructs the browser to load previously downloaded resources from local disk rather than over the network.

- Leverage proxy caching

"Cacheable resources include JS and CSS files, image files, and other binary object files (media files, PDFs, Flash files, etc.). In general, HTML is not static, and shouldn't be considered cacheable. "

Caching Headers:
- Expires & Cache-Control: max-age
- These are the two!
- Last-Modified & ETag: more complicated, lets skip them.


Set caching headers aggressively for all static resources.

Use fingerprinting to dynamically enable caching.


Resources:


* Caching BPs: https://developers.google.com/speed/docs/best-practices/caching




TODO:

* ETags for our image serving? Eg. NetDNA? BTR does, they use S3+Akami
* Should we be checking our clients for Etags?

*/

