/****************************************************************************************
 * COOKIES IN EXPRESS.JS - COMPLETE EXAMPLE
 *
 * What you will learn:
 * 1. Setting Cookies
 * 2. Reading Cookies
 * 3. Updating Cookies
 * 4. Deleting Cookies
 * 5. Signed Cookies
 * 6. Secure Cookies
 * 7. HttpOnly Cookies
 * 8. SameSite Cookies
 * 9. JWT Authentication with Cookies
 * 10. Cookie Expiration
 *
 * Install:
 * npm install express cookie-parser jsonwebtoken
 *
 ****************************************************************************************/

import express from "express";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

const app = express();

app.use(express.json());

/*
|--------------------------------------------------------------------------
| COOKIE PARSER MIDDLEWARE
|--------------------------------------------------------------------------
|
| cookie-parser reads cookies from incoming requests
| and makes them available inside req.cookies.
|
| Secret key is used for Signed Cookies.
|
*/
app.use(cookieParser("super-secret-cookie-key"));

const PORT = 3000;
const JWT_SECRET = "my-jwt-secret";

/*
|--------------------------------------------------------------------------
| HOME ROUTE
|--------------------------------------------------------------------------
*/
app.get("/", (req, res) => {
  res.send("Cookie Tutorial Server Running...");
});

/*
|--------------------------------------------------------------------------
| 1. SETTING A BASIC COOKIE
|--------------------------------------------------------------------------
|
| Browser will store:
| username=amit
|
*/
app.get("/set-cookie", (req, res) => {
  res.cookie("username", "amit");

  res.send("Basic Cookie Set Successfully");
});

/*
|--------------------------------------------------------------------------
| 2. READING COOKIES
|--------------------------------------------------------------------------
|
| Browser automatically sends cookies with every request.
|
*/
app.get("/read-cookie", (req, res) => {
  console.log(req.cookies);

  res.json({
    message: "Cookies Received",
    cookies: req.cookies,
  });
});

/*
|--------------------------------------------------------------------------
| 3. SETTING COOKIE WITH OPTIONS
|--------------------------------------------------------------------------
|
| Common Production Settings:
|
| httpOnly  -> Prevent JS access
| secure    -> HTTPS only
| sameSite  -> CSRF protection
| maxAge    -> Expiration time
|
*/
app.get("/set-secure-cookie", (req, res) => {
  res.cookie("userRole", "admin", {
    httpOnly: true, // Not accessible by JS
    secure: false, // true in production (HTTPS)
    sameSite: "strict", // CSRF protection
    maxAge: 24 * 60 * 60 * 1000, // 1 Day
  });

  res.send("Secure Cookie Created");
});

/*
|--------------------------------------------------------------------------
| 4. COOKIE WITH EXPIRATION DATE
|--------------------------------------------------------------------------
|
| Expires after specific date.
|
*/
app.get("/expiry-cookie", (req, res) => {
  res.cookie("theme", "dark", {
    expires: new Date(Date.now() + 3600000), // 1 Hour
  });

  res.send("Expiry Cookie Set");
});

/*
|--------------------------------------------------------------------------
| 5. SIGNED COOKIE
|--------------------------------------------------------------------------
|
| Signed cookies detect tampering.
|
| Browser:
| token=something
|
| Server:
| verifies signature before reading.
|
*/
app.get("/signed-cookie", (req, res) => {
  res.cookie("premiumUser", "true", {
    signed: true,
  });

  res.send("Signed Cookie Set");
});

/*
|--------------------------------------------------------------------------
| READ SIGNED COOKIE
|--------------------------------------------------------------------------
*/
app.get("/read-signed-cookie", (req, res) => {
  res.json({
    signedCookies: req.signedCookies,
  });
});

/*
|--------------------------------------------------------------------------
| 6. UPDATE COOKIE
|--------------------------------------------------------------------------
|
| Simply set the same cookie name again.
|
*/
app.get("/update-cookie", (req, res) => {
  res.cookie("username", "amit-prasad");

  res.send("Cookie Updated");
});

/*
|--------------------------------------------------------------------------
| 7. DELETE COOKIE
|--------------------------------------------------------------------------
|
| clearCookie() removes cookie from browser.
|
*/
app.get("/delete-cookie", (req, res) => {
  res.clearCookie("username");

  res.send("Cookie Deleted");
});

/*
|--------------------------------------------------------------------------
| 8. LOGIN ROUTE USING JWT COOKIE
|--------------------------------------------------------------------------
|
| User logs in
| Backend creates JWT
| JWT stored in HttpOnly Cookie
|
*/
app.post("/login", (req, res) => {
  const user = {
    id: 1,
    name: "Amit",
    email: "amit@gmail.com",
  };

  // Create JWT Token
  const token = jwt.sign(user, JWT_SECRET, {
    expiresIn: "1d",
  });

  // Store token in cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: false, // true in production
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.json({
    success: true,
    message: "Login Successful",
  });
});

/*
|--------------------------------------------------------------------------
| AUTH MIDDLEWARE
|--------------------------------------------------------------------------
|
| Reads token from cookie
| Verifies JWT
| Attaches user to request
|
*/
const authMiddleware = (req, res, next) => {
  try {
    // Read token from cookie
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No Token Found",
      });
    }

    // Verify JWT
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach user
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

/*
|--------------------------------------------------------------------------
| PROTECTED ROUTE
|--------------------------------------------------------------------------
|
| Only logged-in users can access.
|
*/
app.get("/profile", authMiddleware, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

/*
|--------------------------------------------------------------------------
| LOGOUT ROUTE
|--------------------------------------------------------------------------
|
| Remove JWT cookie.
|
*/
app.post("/logout", (req, res) => {
  res.clearCookie("token");

  res.json({
    success: true,
    message: "Logged Out Successfully",
  });
});

/*
|--------------------------------------------------------------------------
| COOKIE FLOW
|--------------------------------------------------------------------------
|
| Login Request
|      ↓
| Backend Creates JWT
|      ↓
| Set-Cookie Header Sent
|      ↓
| Browser Stores Cookie
|      ↓
| Browser Sends Cookie Automatically
|      ↓
| Backend Verifies JWT
|      ↓
| User Authenticated
|
|--------------------------------------------------------------------------
|
| REQUEST:
|
| POST /login
|
|--------------------------------------------------------------------------
|
| RESPONSE HEADER:
|
| Set-Cookie:
| token=eyJhbGciOiJIUzI1Ni...
|
|--------------------------------------------------------------------------
|
| NEXT REQUEST:
|
| GET /profile
|
| Cookie:
| token=eyJhbGciOiJIUzI1Ni...
|
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| START SERVER
|--------------------------------------------------------------------------
*/
app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});