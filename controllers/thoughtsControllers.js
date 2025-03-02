const { Thought, User } = require("../models");

module.exports = {
  async getAllThoughts(req, res) {
    try {
      // Find all thoughts
      const thought = await Thought.find();
      // Display thought and status
      res.status(200).json(thought);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },
  async createThought(req, res) {
    try {
      // Create a Thought from request body
      const newThought = await Thought.create(req.body);
      console.log(newThought);

      res
        .status(201)
        .json({
          message: "Thought created and added to user successfully",
          thought: newThought,
        });
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },
  async getThoughtById(req, res) {
    try {
      // Locate thought using id provided
      const thought = await Thought.findById(req.params.id);

      res.status(200).json(thought);
    } catch (error) {
      console.error(error);
      res.setatus(500).json(error);
    }
  },
  async updateThoughtById(req, res) {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          runValidators: true,
          new: true,
        }
      );

      res.status(200).json(updatedThought);
    } catch (error) {
      console.error(error);
      res.setatus(500).json(error);
    }
  },
  async deleteThoughtById(req, res) {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.id); 

      // Verify user exists in database or wrong id entered
      if (!thought) {
        return res
          .status(404)
          .json({ error: "Thought not found with ID provided" });
      }
      res.status(200).json(thought);
    } catch (error) {
      console.error(error);
      res.setatus(500).json(error);
    }
  },
  async createReaction(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $addToSet: { reactions: req.body } },
        {
          new: true,
        }
      );

      res.status(200).json({ thought, message: "Reaction added successfully" });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async deleteReactionById(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "Cannot find thought" });
      }

      res
        .status(200)
        .json({ thought, message: "Reaction successfuly removed" });
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },
};
