const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issueController');

// Get all issues
router.get('/', issueController.getAllIssues);

// Get issue by ticketId
router.get('/:ticketId', issueController.getIssueById);

// Update issue by ticketId
router.put('/:ticketId', issueController.updateIssue);

module.exports = router;
