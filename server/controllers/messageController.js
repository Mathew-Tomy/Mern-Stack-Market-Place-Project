const router = require('express').Router();
const ChatRoom = require('../models/ChatRoom')
const User = require('../models/User');
const messageService = require('../services/messageService')
const Message=require('../models/message')
// router.post('/createChatRoom', async (req, res) => {
//     const { message, receiver } = req.body;
//     try {
//         let chatRoom = await messageService.createChatRoom(req.user._id, receiver)
//         await ChatRoom.updateOne({ _id: chatRoom._id }, { $push: { conversation: { senderId: req.user._id, message } } })
//         res.status(200).json({ messageId: chatRoom._id })
//     } catch (error) {
//         res.status(500).json(error)
//     }
// })
// router.post('/createChatRoom', async (req, res) => {
//     const { message, receiver } = req.body;
//     try {
//         let chatRoom = await messageService.createChatRoom(req.user._id, receiver);
//         await ChatRoom.updateOne({ _id: chatRoom._id }, { $push: { conversation: { senderId: req.user._id, message } } });

//         // Emit event to update connected clients
//         req.app.get('io').emit('newMessage', { chatId: chatRoom._id, message, senderId: req.user._id });

//         res.status(200).json({ messageId: chatRoom._id });
//     } catch (error) {
//         res.status(500).json(error);
//     }
// });
router.post('/createChatRoom', async (req, res) => {
    const { message, receiver } = req.body;
    try {
        // Check if a chat room already exists between the users
        let chatRoom = await ChatRoom.findOne({
            $or: [
                { buyer: req.user._id, seller: receiver },
                { buyer: receiver, seller: req.user._id }
            ]
        });

        if (!chatRoom) {
            // If no chat room exists, create a new one
            chatRoom = await messageService.createChatRoom(req.user._id, receiver);
        }

        // Add the message to the conversation of the chat room
        await ChatRoom.updateOne({ _id: chatRoom._id }, { $push: { conversation: { senderId: req.user._id, message } } });

        // Emit event to update connected clients
        req.app.get('io').emit('newMessage', { chatId: chatRoom._id, message, senderId: req.user._id });

        res.status(200).json({ messageId: chatRoom._id });
    } catch (error) {
        res.status(500).json(error);
    }
});


// router.get('/getUserConversations', async (req, res) => {
//     let allChats = await ChatRoom.find().populate("buyer").populate("seller");
//     let userChats = allChats.filter(x => x.buyer._id == req.user._id || x.seller._id == req.user._id)
//     let checkedChats = userChats.map(x => ({ chats: x, isBuyer: (x.buyer._id == req.user._id), myId: req.user._id }))
//     res.status(200).json(checkedChats)
// })
router.get('/getUserConversations', async (req, res) => {
    try {
        let allChats = await ChatRoom.find().populate("buyer").populate("seller");
        let userChats = allChats.filter(x => x.buyer && x.seller && (x.buyer._id == req.user._id || x.seller._id == req.user._id));
        let checkedChats = userChats.map(x => ({ chats: x, isBuyer: (x.buyer._id == req.user._id), myId: req.user._id }));
        res.status(200).json(checkedChats);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


router.post('/sendMessage', async (req, res) => {
    const { chatId, message } = req.body;
    let chat = await ChatRoom.updateOne({ _id: chatId }, { $push: { conversation: { senderId: req.user._id, message } } })

    console.log(chat)
    res.status(200).json({ sender: req.user._id })
})

// Get chat messages with a specific user
router.get('/messages/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const messages = await Message.find({
            $or: [{ senderId: userId }, { recipientId: userId }]
        });
        res.json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Send message to a user
router.post('/messages/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { message } = req.body;
        const senderId = req.user.userId; // Assuming you have user authentication middleware
        const newMessage = new Message({ senderId, recipientId: userId, message });
        await newMessage.save();
        res.status(201).json({ message: 'Message sent' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});
module.exports = router;