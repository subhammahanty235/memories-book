import postContext from "./postContext";
import React, { useState } from "react";

const Poststate = (props)=>{
    const url = 'http://localhost:5000/posts/'
    const initialp = [];
    const [Posts ,setPosts] = useState(initialp);
    const getPosts = async()=>{
        const responce = await fetch(url,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
            }
        })
        const jsonres = await responce.json()
        setPosts(jsonres);
    }
    const Addpost = async(creator , title , message , tags ,selectedFile)=>{
        const responce = await fetch(url , {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({creator,title , message , tags, selectedFile})
        })
        const newpost =await responce.json()
        setPosts(Posts.concat(newpost))
        console.log(responce.json);
    }
    const DeletePost =async (id)=>{
        try {
            const responce = await fetch(`${url}/${id}`,{
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json"
                },
            })
            const responcej =await responce.json();
            const newposts = Posts.filter((post)=>{return post._id !== id});
            setPosts(newposts);
            console.log("deleted successfully")
        } catch (error) {
            console.log("Error deletiong")
        }
        
        
    }
    return(
        <postContext.Provider value={{Posts , getPosts , Addpost , DeletePost}}>
            {props.children}
        </postContext.Provider>
    )
}
export default Poststate