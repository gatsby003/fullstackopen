import React, {useEffect, useState} from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { likeBlogAction, initStore } from "../reducers/blogReducer";



const CommentSection = ({blog}) => {
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState("")
    const id = blog.id
    const baseUrl = "http://localhost:3003/api/blogs/comments/"
    useEffect(async() => {
        const result = await axios.get(`${baseUrl}${id}`)
        setComments(result.data) 
    }, [comments])
    return (
        <div>
            <h2>Comments</h2>
            <form onSubmit={async (e) => {
                    e.preventDefault()
                    console.log("here")
                    await axios.post(`${baseUrl}${blog.id}`, {comment : newComment, blog : blog.id})
                    setComments(comments.concat({comment : newComment, blog : blog.id}))
                    setNewComment("")
                    }}>
                <input
                    id="Comment"
                    type="text"
                    value={newComment}
                    name="Comment"
                    onChange={({ target }) => setNewComment(target.value)}
                />
                <button type="submit">submit</button>
            </form>
           { comments.map(_ => <li key={_.id}>{_.comment}</li>)}
        </div>
    )
}

const BlogView = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initStore())
    },[])    
    const blogs = useSelector(state => state.blogs)
    console.log(blogs)
    const id = useParams().id
    const blog = blogs.find(blog => blog.id === id)

    if (blog == null){
        return (<></>)
    }
    else {
        return (
            <div>
               <h1>{blog.title}</h1>
               <a href={blog.url}>{blog.url}</a>
               <br/>
               {blog.likes} Likes <button onClick={() => dispatch(likeBlogAction(blog))}>
            Like
          </button>
               <br/>
               added by {blog.user.name}
               <CommentSection blog={blog}/>
            </div>
        )
    }


}

export default BlogView