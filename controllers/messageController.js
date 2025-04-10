const Message = require("../model/message");
const Usermodel = require("../model/usermodel");

exports.getMessages = async (req, res) => {
  try {
    const senderId = req.session.userId;
    const receiverId = req.params.id;

    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId }
      ]
    }).sort({ timestamp: 1 });

    const receiver = await Usermodel.findById(receiverId);
    if (!receiver) {
      return res.status(404).send("Receiver not found");
    }

    res.render('message', { messages, receiver, sessionUserId: senderId });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).send('Server Error');
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { receiverId, content } = req.body;
    const senderId = req.session.userId;

    if (!content.trim()) {
      return res.redirect(`/messages/${receiverId}`);
    }

    const newMessage = new Message({ senderId, receiverId, content });
    await newMessage.save();

    res.redirect(`/messages/${receiverId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};
