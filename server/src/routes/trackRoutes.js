const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Track = mongoose.model('Track');

const router = express.Router();
router.use(requireAuth);

router.get('/tracks', async (req, res) => {
  const userId = req.user._id;
  const tracks = await Track.find({ userId });

  res.send(tracks);
});

router.post('/tracks', async (req, res) => {
  const { name, locations } = req.body;
  if (!name || !locations) {
    return res.status(422).send({error: 'You must provide a name and locations'});
  }

  const userId = req.user._id;
  try {
    const track = new Track({ name, locations, userId });
    await track.save();
    res.send(track);
  } catch (error) {
    res.status(422).send({error});
  }
});

module.exports = router;