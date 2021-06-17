const dummy = (blogs) => {
    return 1;
    // ...
}




const totalLikes = (blogs) => {
    let totalLikes = 0;
    blogs.forEach(blog => {
        totalLikes += blog.likes;
    });
    return totalLikes;
}

const favoriteBlog = (blogs) => {
    var topBlog = null;
    blogs.forEach((blog) => {
        if (topBlog == null){
            topBlog = blog;
            return;
        }
        else if(topBlog.likes < blog.likes){
            topBlog = blog;
            return;
        }
    })
    return topBlog;
}

const checkId = (blogs) => {
    blogs.forEach(blog => {
        if (!blog.hasOwnProperty("id")){
            return false
        }
    })
    return true;
}
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    checkId,
  }

