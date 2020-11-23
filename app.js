const express = require("express");
const bodyParser = require("body-parser");
const app = require("express")();
const server = require("http").createServer(app);
const fs = require("fs");
const qrcode = require("qrcode");
const io = require("socket.io")(server);
const axios = require("axios");
const port = process.env.PORT || 5000;
const {
  WAConnection,
  MessageType,
  Presence,
  MessageOptions,
  Mimetype,
  WALocationMessage,
  WA_MESSAGE_STUB_TYPES,
  ReconnectMode,
  ProxyAgent,
  waChatKey,
} = require("@adiwajshing/baileys");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const conn = new WAConnection();
conn.autoReconnect = ReconnectMode.onConnectionLost;
// conn.connectOptions = { reconnectID: "reconnect" };

async function connect() {
  fs.existsSync("./auth_info.json") && conn.loadAuthInfo("./auth_info.json");
  await conn.connect({ timeoutMs: 30 * 1000 });

  console.log("oh hello " + conn.user.name + " (" + conn.user.jid + ")");
}

connect().catch((err) => {
  console.log(err);
});

io.on("connection", function (socket) {
  conn.on("qr", (qr) => {
    qrcode.toDataURL(qr, (err, url) => {
      console.log(qr);
      socket.emit("qr", url);
    });
  });
  conn.on("credentials-updated", () => {
    // save credentials whenever updated
    console.log(`credentials updated`);
    const authInfo = conn.base64EncodedAuthInfo(); // get all the auth info we need to restore this session
    fs.writeFileSync("./auth_info.json", JSON.stringify(authInfo, null, "\t")); // save this info to a file
  });

  conn.on("close", async ({ reason, isReconnecting }) => {
    console.log(
      "Disconnected because " + reason + ", reconnecting: " + isReconnecting
    );
    if (!isReconnecting) {
      if (fs.existsSync("./auth_info.json")) {
        fs.unlinkSync("./auth_info.json");
      }
      conn.clearAuthInfo();
      await conn.connect({ timeoutMs: 30 * 1000 });
    }
  });
});
app.get("/qr", (req, res) => {
  if (
    fs.existsSync("./auth_info.json") &&
    conn.loadAuthInfo("./auth_info.json")
  ) {
    res.send("Session Exist");
  } else {
    var page = `<html><head></head><body> <img src="" alt="QR Code" id="qrcode"></body> <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js" integrity="sha512-bLT0Qm9VnAYZDflyKcBaQ2gg0hSYNQrJ8RilYldYQ1FxQYoCLtUjuuRuZo+fjqhx/qtq/1itJ0C2ejDxltZVFg==" crossorigin="anonymous"></script> <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/3.0.1/socket.io.js" integrity="sha512-vGcPDqyonHb0c11UofnOKdSAt5zYRpKI4ow+v6hat4i96b7nHSn8PQyk0sT5L9RECyksp+SztCPP6bqeeGaRKg==" crossorigin="anonymous"></script> <script>$(document).ready(function(){var socket=io.connect({'transports':['websocket']});socket.on('qr',function(msg){$('#qrcode').attr('src',msg);});});</script> </html>`;
    res.write(page);
    res.end();
  }
});

app.post("/send-message", (req, res) => {
  let phone = req.body.number;
  let message = req.body.message;
  let firstnumber = phone.substr(0, 1);
  //   console.log(firstnumber);
  if (phone == undefined || message == undefined) {
    res.send({
      status: "error",
      message: "please enter valid phone and message",
    });
    console.log("number and message undefined");
  } else {
    if (firstnumber == "8") {
      phone = "62".concat(phone);
    } else if (firstnumber == "0") {
      phone = phone.replace("0", "62");
    }
    conn.isOnWhatsApp(phone + "@s.whatsapp.net").then((is) => {
      if (is) {
        conn
          .sendMessage(phone + "@s.whatsapp.net", message, MessageType.text)
          .then((response) => {
            res.send({
              status: "success",
              message: "Message successfully sent to " + phone,
            });
            console.log(`Message successfully sent to ${phone}`);
          });
      } else {
        res.send({
          status: "error",
          message: phone + " is not a whatsapp user",
        });
        console.log(`${phone} is not a whatsapp number`);
      }
    });
  }
});

// app.get("/get-chats", (req, res) => {
//   conn
//     .getChats()
//     .then((chats) => {
//       res.send({ status: "success", message: chats });
//     })
//     .catch(() => {
//       res.send({ status: "error", message: "getchatserror" });
//     });
// });

server.listen(port, () => {
  console.log("Server Running Live on Port : " + port);
});
