const router = require('express').Router();
const { Thought } = require('../../models');

router.get('/', async (req, res) => {
  // find all thoughts
  try {
    const thoughts = await Thought.find();
    res.status(200).json(thoughts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const thought = new Thought(req.body);
    await thought.save();
    res.status(200).json(thought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find thought
  try {
    const thought = await Thought.findOne({ _id: req.params.id });
    res.status(200).json(thought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update thought
  try {
    const thought = await Thought.updateOne({ _id: req.params.id }, req.body);
    res.status(200).json(thought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete thought
  try {
    const thought = await Thought.findOneAndDelete({ _id: req.params.id });
    res.status(200).json(thought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/:thoughtId/reactions', async (req, res) => {
  try {
    const thought = await Thought.updateOne({
      _id: req.params.thoughtId
    },{
      $push: {reactions: req.body}
    });
    res.status(200).json(thought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
    const thought = await Thought.updateOne({
      _id: req.params.thoughtId
    },{
      $pull: {reactions: {reactionId:req.params.reactionId}}
    });
    res.status(200).json(thought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
