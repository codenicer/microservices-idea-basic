import React from 'react'


export default ({comments})=>{
    let content ;

    comments.map(comment=>{
      
        if(comment.status === "approved"){
            content = comment.content;
        }
        if(comment.status === "pending"){
            content = 'This comment is awaiting moderation'
        }
        if(comment.status === "approved"){
            content = 'this comment has been rejected'
        }

        return <li key={comment.id}>
            {comment.content}
        </li>
    })
    
    
    return(
        <ul>
            {content}
        </ul>
    )
}