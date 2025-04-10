const mongoose = require("mongoose");
const Usermodel = require("../model/usermodel");
const transporter = require("../config/mail")


exports.connectUser = async (req, res) => {
  try {
    const senderId = req.session.userId;
    let receiverId = req.body.receiverId;

    // Validate sender and receiver IDs
    if (!senderId || !receiverId || !mongoose.Types.ObjectId.isValid(receiverId)) {
      return res.status(400).send("Invalid request.");
    }

    console.log("receiverId from body:", receiverId);
    console.log("senderId from session:", senderId);

    receiverId = new mongoose.Types.ObjectId(receiverId);

    const sender = await Usermodel.findById(senderId);
    const receiver = await Usermodel.findById(receiverId);

    // Handle missing users
    if (!sender || !receiver) {
      return res.status(404).send("Sender or Receiver not found.");
    }

    // Prevent sending request to self
    if (sender._id.equals(receiver._id)) {
      return res.status(400).send("You cannot connect with yourself.");
    }

    // Optional: Prevent duplicate connection requests
    if (receiver.pendingRequests.includes(sender._id)) {
      return res.status(409).send("Connection request already sent.");
    }

    // Generate accept link
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const acceptLink = `${baseUrl}/accept-request?senderId=${sender._id}&receiverId=${receiver._id}`;

    // Email setup
    const mailOptions = {
      from: sender.email,
      to: receiver.email,
      subject: "New Connection Request",
      html: `
        <p><strong>${sender.username}</strong> wants to connect with you on Answerme.</p>
        <p>Click the button below to accept the request:</p>
        <a href="${acceptLink}" style="display:inline-block; padding:10px 20px; background-color:#007bff; color:#fff; border-radius:5px; text-decoration:none;">Accept Request</a>
        <p>If you did not expect this, you can ignore this email.</p>
        <p>requested user details:</p>
        <p>Username: ${sender.username}</p>
        <p>Email: ${sender.email}</p>
        <p>Branch: ${sender.branch}</p>
        <p>USN: ${sender.usn}</p>
        <p>Admission  Year: ${sender.graduate}</p>
      `,
    };

    transporter.sendMail(mailOptions, async (err, info) => {
      if (err) {
        console.error("Email error:", err);
        return res.status(500).send("Error sending connection email.");
      }

      // Save the pending request
      receiver.pendingRequests.push(sender._id);
      await receiver.save();

      res.redirect(req.get("Referer") || "/users");
    });

  } catch (err) {
    console.error("Connect User Error:", err);
    res.status(500).send("Server error.");
  }
};


exports.acceptRequest = async (req, res) => {
  try {
    const { senderId, receiverId } = req.query;

    if (!mongoose.Types.ObjectId.isValid(senderId) || !mongoose.Types.ObjectId.isValid(receiverId)) {
      return res.status(400).send("Invalid request.");
    }

    await Usermodel.findByIdAndUpdate(senderId, {
      $addToSet: { connections: receiverId },
      $inc: { connectionCount: 1 }
    });

    await Usermodel.findByIdAndUpdate(receiverId, {
      $addToSet: { connections: senderId },
      $inc: { connectionCount: 1 }
    });

    res.render("accepted", { message: "Request accepted successfully!" });

  } catch (err) {
    res.status(500).send("Server error.");
  }
};

exports.disconnectUser = async (req, res) => {
  try {
    let { receiverId } = req.body;
    let senderId = req.user?._id || req.session.userId;

    console.log("receiverId from body:", receiverId);
    console.log("senderId from session or req.user:", senderId);

    if (!receiverId || !senderId) {
      return res.status(400).send("Invalid request");
    }

    if (!mongoose.Types.ObjectId.isValid(receiverId)) {
      return res.status(400).send("Invalid receiver ID.");
    }

    if (!mongoose.Types.ObjectId.isValid(senderId)) {
      return res.status(400).send("Invalid sender ID.");
    }

    //  Convert to ObjectId
    receiverId = new mongoose.Types.ObjectId(receiverId);
    senderId = new mongoose.Types.ObjectId(senderId);

    await Usermodel.findByIdAndUpdate(senderId, {
      $pull: { connections: receiverId }
    });

    await Usermodel.findByIdAndUpdate(receiverId, {
      $pull: { connections: senderId }
    });

    res.redirect(req.get("Referrer") || "/");

  } catch (err) {
    console.error("Disconnect Error:", err);
    res.status(500).send("Error disconnecting users");
  }
};