import userContext from './userContext'
import { useState } from 'react';

const UserState = (props) => {

    /*All the useState hooks are here*/
    const [userblogs, setUserblogs] = useState([]);  //! for all user blogs

    const [blogwithid, setBlogwithid] = useState([]);

    // !for the loading bar progress
    const [progress, setprogress] = useState();

    // for the spinner progress
    const [loading, setLoading] = useState(null)




    const HandleLogin = async (userinfo) => {
        setLoading(true);
        const response = await fetch("http://localhost:1983/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: userinfo.email, password: userinfo.password })
        });

        const json = await response.json();

        // console.log(json)                 success + authtoken in response.

        if (json.success) {
            localStorage.setItem('token', json.authtoken);
        }

        setLoading(false);
        return json.success
    }


    const HandleSignup = async (newuserinfo) => {
        setLoading(true);
        console.log('the information about our new user is  ', newuserinfo);
        // setprogress(30)
        const response = await fetch("http://localhost:1983/api/auth/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: newuserinfo.username,
                email: newuserinfo.email,
                password: newuserinfo.password, displayname: newuserinfo.displayname
            })
        });

        // json contains success msg and auth-token
        // setprogress(80)
        const json = await response.json();

        // saving the authtoken
        if (json.success) {
            console.log("Signup successful");



            // giving some delay time as this function is not waiting for the token to get stored in localstorage and navigates to '/'.

            setTimeout(() => {
                localStorage.setItem('token', json.authtoken);
            }, 500);

        }
        // setprogress(100)
        setLoading(false);
        return json.success;
    }

    const GetUserInfo = async (authtoken) => {

        const response = await fetch("http://localhost:1983/api/auth/userinfo", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authtoken
            }
        });

        // json contains userinformation like _id,username,displayname,joinDate.
        const json = await response.json();

        console.log('the infomation about logged in user is', json);

        //! saving the userid into localstorage.
        if (json.success) {
            console.log("Found User successfully");

            localStorage.setItem('userID', json.user._id);
        }
        return json.success;
    }

    const GetUserBlogs = async (authtoken) => {
        const response = await fetch("http://localhost:1983/api/blog/fetchUserBlogs", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authtoken
            }
        }).then((response) => response.json())
            .then((data) => setUserblogs(data));;

        // json contains our logged in user blogs.
    }

    /* fetch api for obtaining id specific blog */
    const GetBlogwithID = async (id) => {
        setLoading(true);
        const response = await fetch("http://localhost:1983/api/blog/fetchBlogwithID", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ blogID: id })
        }).then((response) => response.json())
            .then((data) => setBlogwithid(data));

        setLoading(false);
    }



    return (
        <userContext.Provider value={{ HandleLogin, HandleSignup, GetUserInfo, GetUserBlogs, userblogs, setUserblogs, blogwithid, setBlogwithid, GetBlogwithID, progress, setprogress, loading, setLoading }}>
            {props.children}
        </userContext.Provider>
    )
}

export default UserState;