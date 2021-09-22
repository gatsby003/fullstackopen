import blogService from '../services/blogs'

const blogReducer = (state=[], action) => {
    switch(action.type){
        case 'INIT':
            return action.data
        case 'NEW':
            const newBlog = action.data
            return [...state, newBlog] 
        case 'DELETE':
            const id = action.data.id
            const newState = state.filter(n => n.id != id)
            return newState
        case 'LIKE':
            const blog = action.data
            const toUpdate = state.find(b => b.id === blog.id)
            const likedObject = {
                ...toUpdate,
                likes : toUpdate.likes + 1
            }
            return state.map(_ => _.id !== blog.id ? _ : likedObject)
        default:
            return state
    }


}


export const initStore = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT',
            data: blogs
        })
    }
}

export const deleteBlogAction = (id) => {
    return async dispatch => {
        const result = await blogService.deleteBlog(id)
        dispatch({
            type: 'DELETE',
            data: {
                id
            }
        })
    }
}

export const likeBlogAction = (blog) => {
    return async dispatch => {
        await blogService.likeBlog(blog)
        dispatch({
            type: 'LIKE',
            data: blog,
        })
    }
}

export const createBlogAction = (title, author, url) => {
    return async dispatch => {
        const result = await blogService.newBlog(title, author, url)
        dispatch({
            type: 'NEW',
            data: result,
        })
    }
}

export default blogReducer