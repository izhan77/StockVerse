const express = require("express"); // imports express library
const cors = require("cors"); // imports cors middleware
const pool = require("./database/db"); // imports database configuration
const bcrypt = require("bcrypt"); // imports bcrypt lib
const jwt = require("jsonwebtoken"); // imports jwt lib
const cookieParser = require("cookie-parser");
require("dotenv").config(); // loads environment variables from a .env file into process.env

//starting server
const app = express();

//middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json()); // req.body
app.use(cookieParser());

//////////////////////////////////////////////////////////////////

// ROUTES

// Fetching Countries
app.get("/countries", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT country_id, country_name FROM countries ORDER BY country_name ASC"
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching countries:", error);
    res.status(500).json({
      error: "Failed to fetch countries",
    });
  }
});

// Sign Up User
app.post("/users", async (req, res) => {
  try {
    console.log("Received registration request:", req.body);

    // Destructuring request object -> extraction
    const {
      first_name,
      last_name,
      email,
      password,
      phone_number,
      address,
      postal_code,
      city,
      state,
      country_id,
      salary = 0,
      role_id,
      store_id = null,
    } = req.body;

    // Validate required fields
    if (
      !first_name ||
      !last_name ||
      !email ||
      !password ||
      !phone_number ||
      !address ||
      !postal_code ||
      !city ||
      !state ||
      !country_id
    ) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }

    const existingUser = await pool.query(
      "SELECT email FROM users WHERE email = $1",
      [email.trim().toLowerCase()]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        error: "User with this email already exists!",
      });
    }

    // Validate country exists
    const countryCheck = await pool.query(
      "SELECT country_id FROM countries WHERE country_id = $1",
      [country_id]
    );

    if (countryCheck.rows.length === 0) {
      return res.status(400).json({
        error: "Invalid country selected",
      });
    }

    let location_id = null;

    // Check for existing location
    const locationResult = await pool.query(
      `SELECT location_id FROM locations 
       WHERE LOWER(city) = LOWER($1) 
       AND LOWER(state_province) = LOWER($2)
       AND postal_code = $3`,
      [city.trim(), state.trim(), postal_code.trim()]
    );

    if (locationResult.rows.length > 0) {
      location_id = locationResult.rows[0].location_id;
    } else {
      // Create new location
      const newLocation = await pool.query(
        `INSERT INTO locations 
         (street_address, postal_code, city, state_province, country_id) 
         VALUES ($1, $2, $3, $4, $5) RETURNING location_id`,
        [
          address.trim(),
          postal_code.trim(),
          city.trim(),
          state.trim(),
          country_id,
        ]
      );
      location_id = newLocation.rows[0].location_id;
    }

    // Password Hashing - Bcrypt
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    console.log("Password successfully hashed");

    // Create the user with the location_id
    const result = await pool.query(
      `INSERT INTO users 
       (first_name, last_name, email, password, salary, phone_number, location_id, role_id, store_id) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
       RETURNING user_id, first_name, last_name, email`,
      [
        first_name.trim(),
        last_name.trim(),
        email.toLowerCase().trim(),
        hashedPassword,
        salary,
        phone_number.trim(),
        location_id,
        role_id,
        store_id,
      ]
    );

    console.log("User created successfully:", result.rows[0]);

    res.status(201).json({
      message: "User registered successfully!",
      user: {
        user_id: result.rows[0].user_id,
        first_name: result.rows[0].first_name,
        last_name: result.rows[0].last_name,
        email: result.rows[0].email,
        salary: result.rows[0].salary,
        phone_number: result.rows[0].phone_number,
        location_id: location_id,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

    res.status(500).json({
      error: "Registration failed. Please try again.",
    });
  }
});

// Login User
app.post("/login", async (req, res) => {
  try {
    console.log("Received login request:", { email: req.body.email });

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and Password are required!",
      });
    }

    const userQuery = await pool.query(
      "select user_id, first_name, last_name,email,password from users where email = $1",
      [email.trim().toLowerCase()]
    );

    if (userQuery.rows.length === 0) {
      return res.status(400).json({
        error: "Invalid email or password!!!",
      });
    }

    const user = userQuery.rows[0];

    let isPasswordValid = false;

    // Checking if this is a sample/test password
    if (user.password.startsWith("hashed_pw_")) {
      isPasswordValid = password === user.password;
    } else {
      // Normal bcrypt comparison for real users
      isPasswordValid = await bcrypt.compare(password, user.password);
    }

    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    // Generated JWT Token

    const token = jwt.sign(
      {
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    console.log("Login successful for user:", user.email);

    res.cookie("token", token);

    // Returning success response
    res.status(200).json({
      message: "Login successful!",
      token: token,
      user: {
        user_id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      error: "Login failed. Please try again.",
    });
  }
});

// Fetching User Credentials -> Dashboard Overview
app.get("/dashboard/:userID", async (req, res) => {
  try {
    const userId = req.params.userID;

    // Validate user ID
    if (!userId || isNaN(userId)) {
      return res.status(400).json({
        error: "Invalid user ID provided",
      });
    }

    const [userResult, statsResult, activityResult] = await Promise.all([
      pool.query("SELECT * FROM get_user_dashboard_data($1)", [userId]),
      pool.query("SELECT * FROM get_user_stats($1)", [userId]),
      pool.query(
        `
        SELECT log_id, log_action, log_time, log_details
        FROM activity_logs 
        WHERE user_id = $1 
        ORDER BY log_time DESC 
        LIMIT 10
      `,
        [userId]
      ),
    ]);

    if (userResult.rows.length === 0) {
      return res.status(400).json({
        error: "User not found!",
      });
    }

    const user = userResult.rows[0];
    const stats = statsResult.rows[0] || {};
    const activities = activityResult.rows || [];

    const dashboardData = {
      user: {
        id: user.user_id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        salary: parseFloat(user.salary) || 0,
        phoneNumber: user.phone_number,
        role: user.role_name || "Not Assigned",
      },
      store: {
        id: user.store_id,
        name: user.store_name || "No Store Assigned",
        location: {
          address: user.street_address || "",
          city: user.city || "",
          state: user.state_province || "",
          postalCode: user.postal_code || "",
          country: user.country_name || "",
          region: user.region_name || "",
        },
      },
      stats: {
        totalSales: parseInt(stats.total_sales) || 0,
        todaySales: parseInt(stats.today_sales) || 0,
        totalRevenue: parseFloat(stats.total_revenue) || 0,
        totalPurchaseOrders: parseInt(stats.total_purchase_orders) || 0,
        unreadNotifications: parseInt(stats.unread_notifications) || 0,
      },
      recentActivity: activities.map((activity) => ({
        id: activity.log_id,
        action: activity.log_action,
        time: activity.log_time,
        details: activity.log_details,
      })),
    };

    console.log("Dashboard data fetched successfully for user:", userId);
    res.json(dashboardData);
  } catch (error) {
    console.error("Dashboard error:", error.message);
    res.status(500).json({
      error: "Failed to fetch dashboard data",
    });
  }
});

// Fetching Inventory Data
app.get("/inventory/:store_id", async (req, res) => {
  try {
    const storeID = req.params.store_id;
    const result = await pool.query("SELECT * FROM get_store_inventory($1)", [
      storeID,
    ]);

    const data = result.rows;

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching store inventory:", error);
    res.send(400).send("Error fetching store inventory:", error);
  }
});

// Fetching Store Sales Data
app.get("/storesales/:store_id", async (req, res) => {
  try {
    const storeID = req.params.store_id;
    const result = await pool.query(
      "SELECT * FROM get_store_sales_summary($1)",
      [storeID]
    );

    const data = result.rows[0];

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching store inventory:", error);
    res.send(400).send("Error fetching store inventory:", error);
  }
});

// Fetching Employee->Sales Data
app.get("/employeesales/:user_id", async (req, res) => {
  try {
    const userID = req.params.user_id;
    const result = await pool.query(
      "SELECT * FROM get_employee_sales_performance($1)",
      [userID]
    );

    if (result.rows.length === 0) {
      return res.status(200).json({
        employee_id: userID,
        total_sales_amount: "0",
        total_transactions: 0,
        average_transaction_value: "0",
        best_day_amount: "0",
        best_sales_day: "",
        days_active: 1,
      });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({
      error: "Failed to fetch sales data",
      details: error.message,
    });
  }
});

// Fetching Activity Logs Data
app.get("/activity/:user_id", async (req, res) => {
  try {
    const userID = req.params.user_id;
    if (!userID) {
      res.status(400).json({
        sucess: "false",
        error: "Invalid user id",
      });
    }
    const result = await pool.query(
      "SELECT * FROM activity_logs where user_id = $1",
      [userID]
    );

    if (result.rows.length === 0) {
      res.status(200).json({
        message: "No Activity Log!",
      });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Fetching Purchase Orders Data
app.get("/purchaseorder/:store_id/:user_id", async (req, res) => {
  try {
    const userID = req.params.user_id;
    const storeID = req.params.store_id;

    if (!userID)
      return res.status(400).json({
        error: "Invalid UserID or StoreID",
      });

    const result = await pool.query(
      `select * from get_purchase_orders_by_store_and_user($1, $2)`,
      [storeID, userID]
    );

    if (result.rows.length === 0) {
      return res.status(200).json({ message: "No Purchase Orders!" });
    }

    console.log(result.rows);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//////////////////////////////////////////////////////////////////

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}......`);
});
