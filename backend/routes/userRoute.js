const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const User = require("../models/User");
const verifyToken = require("../middleware/verifyToken")

router.post("/user/register", async (req, res) => {
  try {
    const { username, useremail, userpassword } = req.body;

    const user = await User.findOne({ useremail: useremail });
    if (user) return res.status(409).send({ msg: "Email already exist" });

    const salt = await bcrypt.genSalt(Number(10));
    const hashedPassword = await bcrypt.hash(userpassword, salt);

    await User.create({ username, useremail, userpassword: hashedPassword });
    res.status(201).send({ msg: "User created" });
  } catch (error) {
    res.status(500).send({msg: "Internal server error"})
  }
});

router.post("/user/login", async(req, res) => {
  try {
    const {useremail, userpassword}  = req.body;

    const user = await User.findOne({useremail: useremail})
    if (!user) return res.status(400).send({msg: "Email not found"})

    const validPassword = await bcrypt.compare(userpassword, user.userpassword)
    if (!validPassword) return res.status(401).send({msg: "Invalid password"})

    const token = jwt.sign({_id: user._id}, process.env.JWTPRIVATEKEY, {expiresIn: '7d'})
    res.status(200).send({token: token, msg: "Success"})

  } catch (error) {
    res.status(500).send({msg: "Internal server error"})
  }
})

router.get("/user/profile", verifyToken, async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ name: user.username, email: user.useremail, id: user._id });
});



module.exports = router
