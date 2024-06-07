const express = require('express');
const { auth } = require('../middleware/auth');
const router = express.Router();
import * as contactController from '../controllers/contact';

router.post('/list', auth, contactController.getContacts);

export default router;
