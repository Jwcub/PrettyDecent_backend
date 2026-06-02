const express = require("express");
const router = express.Router();
const authToken = require("../middlewares/auth_token");

// Menu model
const Menu_item = require("../models/menu_item");

// Add menu item
router.post("/", authToken, async(req, res) => {
    try {
        let result = await Menu_item.create(req.body);
        return res.status(200).json(result);
    } catch(error) {
        return res.status(400).json({ error: error.message });
    }
});

// Get menu items
router.get("/", async(req, res) => {
    try {
        let result = await Menu_item.find({});
        return res.status(200).json(result);
    } catch(error) {
        return res.status(400).json({ error: error.message });
    }
});

// Edit menu item
router.put("/:id", authToken, async(req, res) => {
    try {
        const menuItemId = req.params.id;
        const newMenuData = req.body;

        // Uppdate menu item
        const updatedMenuItem = await Menu_item.findOneAndUpdate(
            { _id: menuItemId },
            newMenuData,
            {   
                new: true,
                runValidators: true
             }
        );

        // Does menu item exist?
        if(!updatedMenuItem) return res.status(404).json({ error: "Menyartikeln hittades inte" });

        res.status(200).json(updatedMenuItem);

    } catch(error) {
        res.status(500).json({ error: error.message })
    }
});

// Delete menu item
router.delete("/:id", authToken, async(req, res) => {
    try {
        const menuItemId = req.params.id;

        // Uppdate menu item and return uppdated
        const deletedMenuItem = await Menu_item.findOneAndDelete(
            { _id: menuItemId }
        );

        // Does menu item exist?
        if(!deletedMenuItem) return res.status(404).json({ error: "Menyartikeln hittades inte" });

        res.status(200).json({ message: "Menyartikeln raderad "});

    } catch(error) {
        res.status(500).json({ error: error.message })
    }
});

module.exports = router;
