import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import "./BlogForm.css"
import { useNavigate } from "react-router-dom";
import {Multiselect} from "multiselect-react-dropdown";

const BlogForm = () => {
const user = useSelector(state => state.user);
const home = useSelector(state => state.home);
const dispatch = useDispatch()
const [title, settitle] = useState(home.selectedArticle.title || "");
const [url, seturl] = useState(home.selectedArticle.url || "");
const [data, setdata] = useState(home.selectedArticle.data || "");
const [category, setCategory] = useState([]);
let navigate = useNavigate();

const handleBlog = (e)=>{
e.preventDefault();
if(home.selectedArticle.title){
axios.post('http://localhost:5000/blogs/update', { user, title, url, data, article: home.selectedArticle, category}, {headers:
{'x-auth-token': user.token }})
.then(res => {console.log(res.data)
navigate("/oldblog");})
.catch(err => console.log(err))
}
else{
axios.post('http://localhost:5000/blogs/create', { user, title, url, data, category}, {headers: {'x-auth-token': user.token }})
.then(res => {console.log(res.data)
navigate("/oldblog");})
.catch(err => console.log(err))
}
}

const handleSelect = (selectedList) => {
  console.log(selectedList);
  setCategory(selectedList.map(item => item.key.toLowerCase()));
}

useEffect(() => {
return ()=>{
dispatch({ type: 'UPDATE_SELECTED_ARTICLE_DATA', payload: {}})
}
},[])

return (
<div className="container">
  <div className="row">
    <div className="col-md-12 border-dark">
      <h1 className='text-center mb-3 mt-3'>{home.selectedArticle.title ? "Update Blog" : "Create New Blog"}</h1>
      <form onSubmit={handleBlog}>
        <div className="form-group">
          <label> Blog Title</label>
          <input type="text" className="form-control mb-3" name="title" placeholder="Insert Title..." value={title}
            required onChange={(e)=> settitle(e.target.value)}/>
        </div>
        <div className="form-group">
          <label> Image </label>
          <div className="input-group">
            <input type="text" className="form-control mb-4" readonly placeholder="Paste URL ..." value={url} required
              onChange={(e)=> seturl(e.target.value)}/>
          </div>
        </div>
        <label> Categories </label>
        <Multiselect  className="mb-4"
            displayValue="key"
            onSelect={handleSelect}
            options={[
              {
                key: 'Economy'
              },
              {
                key: 'Sports'
              },
              {
                key: 'Politics'
              },
              {
                key: 'Science'
              },
              {
                key: 'History'
              },
              {
                key: 'Movies'
              },
              {
                key: 'others'
              }
            ]}
          />
        <div className="form-group">
          <label> Blog Data</label>
          <textarea className="form-control bcontent area" name="content" placeholder="Type Here ..." value={data}
            required onChange={(e)=> setdata(e.target.value)}></textarea>
        </div>
        <div className="form-group mt-3">
          <input type="submit" name="Submit" value="Publish" className="btn btn-primary form-control" />
        </div>
      </form>
    </div>
  </div>
  <script></script>
</div>
)
}

export default BlogForm