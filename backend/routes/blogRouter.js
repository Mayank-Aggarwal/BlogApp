const blogModel = require("../models/blogModel");
const auth = require("../middleware/auth");

const router = require("express").Router();

router.post("/create", auth, async(req,res) =>{
    try {
        let {user,title,url,data,category} = req.body;
        console.log(req.body, req.user)
        console.log(category)
        if (!title || !data || !url|| !user || !category.length)
          return res.status(400).json({ msg: "Not all fields have been entered." });
        const newBlog = new blogModel({
            user,
            title,
            url,
            data,
            userId: req.user,
            category
        });
        const savedBlog = await newBlog.save();
        return res.status(200).json(savedBlog);
      } catch (err) {
        return res.status(500).json({ error: err.message });
      }
})

router.get("/fetch", auth, async(req,res) =>{
  try {
      const savedBlog = await blogModel.find({ userId: req.user });
      return res.status(200).json(savedBlog);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
})

router.get("/fetch_all", async(req,res) =>{
  try {
      const savedBlog = await blogModel.find({})
      if (req.query.category==="undefined"){
        return res.status(200).json(savedBlog);
      }
      else{
        return res.status(200).json(savedBlog.filter(item => item.category.includes(req.query.category)));
      }
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
})

router.post("/update", auth, async(req,res) =>{
  try {
      let {user,title,url,data,article,category} = req.body;
      console.log(req.body, req.user)
      if (!title || !data || !url|| !user || !article ||!category.length)
        return res.status(400).json({ msg: "Not all fields have been entered." });
      const query = { userId: req.user, _id: article._id };
      const savedBlog = await blogModel.findOneAndUpdate(query, { title,url,data,category })
      return res.status(200).json(savedBlog);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
})

router.delete("/delete/:id", auth, async(req,res) =>{
  try {
      console.log(req.params)
      const savedBlog = await blogModel.deleteOne({_id: req.params.id})
      return res.status(200).json(savedBlog);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
})

module.exports = router ;