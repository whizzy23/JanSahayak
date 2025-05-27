import { get, patch } from '../api/apiService';

export const fetchIssues = () => get('/');
export const fetchIssueById = (ticketId) => get(`/issues/${ticketId}`);
export const updateIssue = (ticketId, updateData) => patch(`/issues/${ticketId}`, updateData);
