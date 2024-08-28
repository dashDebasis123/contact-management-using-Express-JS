const express = require('express');
const router = express.Router();
const { getAllContacts, getContact, createContact, updateContact, deleteContact } = require("../conttroller/contactController");
const validateToken = require("../middleware/validateTokenHandler");
router.use(validateToken);
router.route("/").get(getAllContacts).post(createContact);
router.route("/:id").put(updateContact).delete(deleteContact).get(getContact);

module.exports = router;

