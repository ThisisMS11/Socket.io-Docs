import * as React from 'react';
import { useEffect, useState, useContext } from 'react'
import { useParams } from "react-router-dom";
import Button from '@mui/joy/Button';
import TextField from '@mui/joy/TextField';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { CssVarsProvider } from '@mui/joy/styles';  //! experience 😂
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import Typography from '@mui/joy/Typography';
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

import documentContext from '../context/documents/documentContext';
import useDrivePicker from 'react-google-drive-picker';



export default function BlogCardModal() {
    const [open, setOpen] = useState(false);

    const docContext = useContext(documentContext);
    let { blogcardmodalref,SaveBlogCard } = docContext;


    const [blogcardinfo, setBlogcardinfo] = useState({userID:"", blogID: "", title: "", description: "", thumbnailurl: "", tag: "" })


    //? code for uploading image to my google Drive
    const [openPicker, authResponse] = useDrivePicker();


    const [modaldis, setModaldis] = useState('block');

    const { id } = useParams();



    const imageupload = () => {

        // for closing the modal
        setModaldis('none')

        openPicker({
            clientId: "177356393773-nl4q6rhgd65f6049oh5q8enmsqoqecqm.apps.googleusercontent.com",
            developerKey: "AIzaSyDKH9fgVU2p26eabmHdJffvi1hjkeL2Ad4",
            token:  "ya29.a0AeTM1ifY9JApkv3yYupaoxLPN8m4BzcxIgHiB3Q2NVUIefCTzSmlv7Yv62jeVqZGPMzT9XkJYnlajX1W4V55u7NnvPChhdPuj46fpJ7KNbho-9LLtAtOyKUMEQQhRlM5I8uxysqMYsS2hzMLuyvxrADwue0TaCgYKAYoSARISFQHWtWOmaun86Y-srn97XlNuATYt2A0163"    ,
            viewId: "DOCS",
            showUploadView: true,
            showUploadFolders: true,
            setParentFolder: "1-CFP7V3F65CuZg2UhQsLs37oTObtGXv5",
            disableDefaultView: true,
            supportDrives: true,
            multiselect: false,
            callbackFunction: (data) => {
                if (data.action === 'cancel') {
                    console.log('User clicked cancel/close button')
                }
                console.log('Data About uploaded Image : ', data)
                
                setBlogcardinfo({ ...blogcardinfo, thumbnailurl: data.docs[0].url })
                setModaldis('block')
            },

        })
    }

    const handleonchange = (e) => {
        setBlogcardinfo({ ...blogcardinfo, [e.target.name]: e.target.value })
    }

    const handlesubmit =async  () => {
        console.log(blogcardinfo);

        const json= await SaveBlogCard(blogcardinfo);
        console.log('response after saving blogcard : ', json);
        if (json.success) {
            console.log("Card saving successful");
        }
    }

    useEffect(() => {
        setBlogcardinfo({ ...blogcardinfo,userID: localStorage.getItem('userID'),blogID: id})
    }, [])
    



    return (
        <CssVarsProvider>


            <Button
                variant="outlined"
                color="neutral"
                startDecorator={<Add />}
                onClick={() => setOpen(true)}
                ref={blogcardmodalref}
                sx={{ display: 'none' }}
            >
                New project
            </Button>

            <Modal open={open} onClose={() => setOpen(false)} sx={{ display: modaldis }}>
                <ModalDialog
                    aria-labelledby="basic-modal-dialog-title"
                    aria-describedby="basic-modal-dialog-description"
                    sx={{
                        maxWidth: 500,
                        borderRadius: 'md',
                        p: 3,
                        boxShadow: 'lg',
                    }}
                    size='md'
                >
                    <Typography
                        id="basic-modal-dialog-title"
                        component="h2"
                        level="inherit"
                        fontSize="1.25em"
                        mb="0.25em"
                    >
                        Create Blog card
                    </Typography>
                    <Typography
                        id="basic-modal-dialog-description"
                        mt={0.5}
                        mb={2}
                        textColor="text.tertiary"
                    >
                        Fill in the information of the blog.
                    </Typography>
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            setOpen(false);
                        }}
                    >
                        <Stack spacing={2}>

                            <TextField label="Title" autoFocus required name="title" value={blogcardinfo.title} onChange={handleonchange} />

                            <TextField label="Description" required name="description" value={blogcardinfo.description} onChange={handleonchange} />

                            <Select
                                placeholder="Select Tag"
                                indicator={<KeyboardArrowDown />}
                                sx={{
                                    width: 240,
                                    [`& .${selectClasses.indicator}`]: {
                                        transition: '0.2s',
                                        [`&.${selectClasses.expanded}`]: {
                                            transform: 'rotate(-180deg)',
                                        },
                                    },
                                }}
                                value={blogcardinfo.tag}
                                onChange={(e, newValue) => setBlogcardinfo({ ...blogcardinfo, tag: newValue })}
                            >
                                <Option value="ClubEvent" label="ClubEvent">Club Event</Option>
                                <Option value="Festive" label="Festive">Festive</Option>
                                <Option value="Informative" label="Informative">Informative</Option>
                            </Select>


                            <div>
                                <TextField label="Google Drive URL" required sx={{ marginBottom: '7px' }} value={blogcardinfo.thumbnailurl} />
                                <Button onClick={imageupload} >Upload Now</Button>
                            </div>
                            <Button type="submit" onClick={handlesubmit}>Submit Blog</Button>
                        </Stack>
                    </form>
                </ModalDialog>
            </Modal>
        </CssVarsProvider>
    );
}
