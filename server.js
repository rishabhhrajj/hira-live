require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { AccessToken } = require("livekit-server-sdk");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const ROOM_NAME = "hira";
const STREAM_PASSKEY = process.env.STREAM_PASSKEY;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// Viewer passkey verification
app.post("/api/verify-passkey", (req, res) => {
  const { passkey } = req.body;

  if (passkey === STREAM_PASSKEY) {
    return res.json({ success: true });
  }

  res.json({ success: false });
});

// Broadcaster admin login
app.post("/api/admin-login", (req, res) => {
  const { password } = req.body;

  if (password === ADMIN_PASSWORD) {
    return res.json({ success: true });
  }

  res.json({ success: false });
});

// Generate LiveKit token
app.post("/api/token", async (req, res) => {
  const { username, role } = req.body;

  try {
    const token = new AccessToken(
      process.env.LIVEKIT_API_KEY,
      process.env.LIVEKIT_API_SECRET,
      {
        identity: username,
      }
    );

    token.addGrant({
      roomJoin: true,
      room: ROOM_NAME,
      canPublish: role === "broadcaster",
      canSubscribe: true,
    });

    res.json({
      token: await token.toJwt(),
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Failed to generate token",
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});