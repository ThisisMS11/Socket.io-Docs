import React, { useCallback } from 'react'
import Quill from 'quill'
import "quill/dist/quill.snow.css"
import "./styles.css"
import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ImageResize from 'quill-image-resize-module-react';
import BlogCardModal from './BlogCardModal'
import Navbar from '../Navbar'


const TextEditor = () => {

    // here we are renaming the id to documentId 
    // * Our params contains the id of our document.
    const { id: documentId } = useParams();
    const [socket, setSocket] = useState();
    const [quill, setQuill] = useState();

    // console.log(documentId);

    useEffect(() => {
        const s = io("http://localhost:3002");
        setSocket(s);

        return () => {
            s.disconnect();
        }
    }, [])

    useEffect(() => {
        if (socket == null || quill == null) return

        socket.once("load-document", documents => {
            quill.setContents(documents)
            quill.enable();
        })

        socket.emit('get-document', documentId, localStorage.getItem('userID'))
    }, [socket, quill, documentId])

    useEffect(() => {
        if (socket == null || quill == null) return

        const handler = (delta, oldDelta, source) => {
            if (source !== 'user') return
            socket.emit("send-changes", delta)
        }

        quill.on('text-change', handler)

        return () => {
            quill.off('text-change', handler)
        }
    }, [socket, quill])


    // ? This one to receive and update the changes done to the system
    useEffect(() => {
        if (socket == null || quill == null) return

        const handler = (delta) => {
            quill.updateContents(delta)
        }

        socket.on('receive-changes', handler)

        return () => {
            quill.off('receive-changes', handler)
        }
    }, [socket, quill])

    // !for saving and updating the document
    useEffect(() => {
        if (socket == null || quill == null) return;

        const interval = setInterval(() => {
            socket.emit('save-document', quill.getContents())
        }, 2000);

        return () => {
            clearInterval(interval)
        }
    }, [socket, quill])


    //!the problem with this type of useeffect calls is that every time any changes are made to our react app it will re-render our toolbar without cleaning up the already present toolbar resulting in multiple toolbars appearing on our main screen.
    // useEffect(() => {
    //     new Quill("#container", { theme: "snow" })
    // }, [])

    // ?so as a solution we must wrap up all the multiple toolbars and textarea within a single div and clean up the entire div before every re-render. 

    // we can't use useEffect because it sometimes gets run even before all the ref are properly set so instead we can use useCallback

    const wrapperRef = useCallback(wrapper => {
        if (wrapper == null) return;
        wrapper.innerHTML = ''
        const editor = document.createElement("div");
        // console.log(editor)

        // this will put our toolbar as well as textarea inside the container div so that we would be able to clean it up at once.

        wrapper.append(editor)


        Quill.register('modules/imageResize', ImageResize);

        const q = new Quill(editor, {
            theme: "snow", modules: {
                imageResize: {
                    parchment: Quill.import('parchment'),
                    modules: ['Resize', 'DisplaySize']
                },
                toolbar: Toolbar_options
            }
        })

        q.disable()
        q.setText('Loading...')


        setQuill(q)

    }, [])



    // for adding more options in our toolbar we can do that using the modules prop

    const Toolbar_options = [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }, { 'font': [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'align': [] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'direction': 'rtl' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        ['clean']
    ]

    return (
        <>
            <Navbar disaddblog='none'/>

            <div className='container' ref={wrapperRef}></div>


            <BlogCardModal />
        </>
    )
}

export default TextEditor;