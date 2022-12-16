import documentContext from './documentContext';
import { useState, useRef, useContext } from 'react';

import userContext from '../Users/userContext';

const DocumentState = (props) => {
    const [check2, setCheck2] = useState("Hello check2");

    const blogcardmodalref = useRef(null);

    const [allcards, setAllcards] = useState([]);

    const [usercards, setUsercards] = useState([]);


    const context = useContext(userContext);
    const { loading, setLoading } = context;

    const giveid = (link) => {
        let id = '';
        for (let i = 0; i < link.length; i++) {
            const element = link[i];
            if (element == 'd') {
                if (link[i + 1] == '/') {
                    for (let j = i + 2; j < link.length; j++) {
                        if (link[j] == '/') {
                            break;
                        }
                        id = id + link[j];
                    }
                }
            }
        }
        return id;
    }

    // ! For saving newly created blog's card.
    const SaveBlogCard = async (blogcardinfo) => {
        setLoading(true);
        console.log('the information about our new user is  ', blogcardinfo);
        // setprogress(30)
        const response = await fetch("http://localhost:1983/api/blog/saveblogcard", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                userID: blogcardinfo.userID,
                blogID: blogcardinfo.blogID,
                title: blogcardinfo.title,
                description: blogcardinfo.description,
                thumbnailurl: blogcardinfo.thumbnailurl,
                tag: blogcardinfo.tag
            })
        });

        // setprogress(80)
        const json = await response.json();

        setLoading(false);

        return json;
    }

    //! for fetching all the cards present in the collection.
    const GetAllCards = async () => {
        setLoading(true);
        const response = await fetch("http://localhost:1983/api/blog/fetchAllCards", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
            .then((data) => setAllcards(data));
        setLoading(false);
    }

    // !Fetching only user cards
    const GetUserCards = async (authtoken) => {
        setLoading(true);
        const response = await fetch("http://localhost:1983/api/blog/fetchUserBlogsCards", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authtoken
            }
        }).then((response) => response.json())
            .then((data) => setUsercards(data));
        setLoading(false);
    }

    return (
        <documentContext.Provider value={{ check2, blogcardmodalref, SaveBlogCard, GetAllCards, allcards, usercards, setUsercards, GetUserCards, giveid ,loading, setLoading}}>
            {props.children}
        </documentContext.Provider>
    )
}

export default DocumentState;