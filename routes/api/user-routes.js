const router = require('express').Router();
const { User } = require('../../models');

router.get('/', async (req, res) => {
  // find all users
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find user
  try {
    const user = await User.findOne({ _id: req.params.id });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update user
  try {
    const user = await User.updateOne({ _id: req.params.id }, req.body);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete user
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.updateOne({
      _id: req.params.userId
    },{
      $push: {friends: req.params.friendId}
    });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.updateOne({
      _id: req.params.userId
    },{
      $pull: {friends: req.params.friendId}
    });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
