const express = require('express');
  const router = express.Router();
  const authMiddleware = require('../middleware/auth');
  const Comment = require('../models/Comment');

  router.post('/create', authMiddleware, async (req, res) => {
    console.log('Comment create route hit:', req.body);
    const { projectId, content } = req.body;
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const comment = new Comment({ userId: req.user.userId, projectId, content });
      await comment.save();
      const populatedComment = await Comment.findById(comment._id).populate('userId', 'username');
      res.json(populatedComment);
    } catch (err) {
      console.error('Comment creation error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });

  router.get('/project/:projectId', async (req, res) => {
    console.log('Fetch comments for project:', req.params.projectId);
    try {
      const comments = await Comment.find({ projectId: req.params.projectId }).populate('userId', 'username');
      res.json(comments);
    } catch (err) {
      console.error('Comment fetch error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });

  router.put('/:id', authMiddleware, async (req, res) => {
    console.log('Comment update route hit:', req.params.id);
    try {
      const { content } = req.body;
      const comment = await Comment.findById(req.params.id);
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      if (comment.userId.toString() !== req.user.userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      comment.content = content || comment.content;
      await comment.save();
      const populatedComment = await Comment.findById(comment._id).populate('userId', 'username');
      res.json(populatedComment);
    } catch (err) {
      console.error('Comment update error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });

  router.delete('/:id', authMiddleware, async (req, res) => {
    console.log('Comment delete route hit:', req.params.id);
    try {
      const comment = await Comment.findById(req.params.id);
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      if (comment.userId.toString() !== req.user.userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      await comment.remove();
      res.json({ message: 'Comment deleted' });
    } catch (err) {
      console.error('Comment delete error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });

  module.exports = router;