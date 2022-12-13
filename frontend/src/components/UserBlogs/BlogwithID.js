import React, { useEffect, useContext, useCallback, useState } from 'react'
import userContext from '../context/Users/userContext'
// quill imports
import Quill from 'quill'
import "quill/dist/quill.snow.css"
import "./styles.css"

import { eventWrapper } from '@testing-library/user-event/dist/utils'
import Navbar from '../Navbar'

const BlogwithID = () => {

    const context = useContext(userContext);
    let { userblogs, blogwithid } = context;


    useEffect(() => {
        console.log('id specific blog is here :- ', blogwithid)
    }, [blogwithid])


    const wrapperRef = useCallback(wrapper => {

        /*Every item of our map is referenced individually using the same useCallback*/

        // console.log('our wrapper ',wrapper);
        // console.log('our wrapper id ',wrapper.id);

        if (wrapper == null) return;
        wrapper.innerHTML = ''

        // editor is our dom element within which we have our quill editor along with the toolbar though our toolbar display is made none.

        const editor = document.createElement("div");

        // this will put our toolbar as well as textarea inside the container div so that we would be able to clean it up at once.

        wrapper.append(editor)

        // console.log("userblogs inside the wrapper ref are :- ", userblogs)

        // Creating a new Quill editor for each map item which will be readOnly.

        var q = new Quill(editor, {
            theme: "snow", readOnly: true,
            modules: {
                toolbar: null   //Experience 2.0
            }
        })

        console.log("q  = ", q);


        // Setting the contents of the quill here.
        q.setContents(blogwithid[0].data.ops)

    }, [])


    return (
        <>
            <Navbar dissavedocument='none' />

            <div className="flex justify-center w-full align-">
                {/* <div id="popularblogs">
                    Hello these are some popularblogs
                </div> */}

                {blogwithid.map((e, index) => {
                    return (<div className='container  border-red-500 w-fit' ref={wrapperRef} id={index} key={index}></div>)
                })}
            </div>



        </>
    )
}


export default BlogwithID