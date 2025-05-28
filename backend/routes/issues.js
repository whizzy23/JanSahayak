const express = require('express');
const router = express.Router();

const { getAllIssues, getIssueById, getIssueStats, updateIssue } = require('../controllers/issueController');

// Get all issues
router.get('/', getAllIssues);

// Get issue statistics
router.get('/stats', getIssueStats);

// Get issue by ticketId
router.get('/:ticketId', getIssueById);

// Update issue by ticketId
router.patch('/:ticketId', updateIssue);

module.exports = router;
