import React, { useEffect, useState } from 'react'
import useDrivePicker from 'react-google-drive-picker';

const ImageUpload = () => {
    const [openPicker, authResponse] = useDrivePicker();

    const [mydata, setMydata] = useState(null);

    const handleOpenPicker = () => {
        openPicker({
            clientId: "177356393773-nl4q6rhgd65f6049oh5q8enmsqoqecqm.apps.googleusercontent.com",
            developerKey: "AIzaSyDKH9fgVU2p26eabmHdJffvi1hjkeL2Ad4",
            token:"ya29.a0AeTM1idW_nGQkpewQqDNKh41DJ4IbPDG8Ll2RhDBmL5WoI33ozrnVoajhEc692wToO78ov0XzH_r4Xkzqamp_DQphZIbmRspHrz2-8FQbsp37p4az76RWX9smytWSbYT24AA7GwvoGBQEgWwKwJhgEuMzYZoaCgYKARASARISFQHWtWOmHRnWJpNtth0um-Pc4P7VEA0163",
            viewId: "DOCS",
            showUploadView: true,
            showUploadFolders: true,
            setParentFolder:"1-CFP7V3F65CuZg2UhQsLs37oTObtGXv5",
            disableDefaultView:true,
            supportDrives: true,
            multiselect: true,
            callbackFunction: (data) => {
                if (data.action === 'cancel') {
                    console.log('User clicked cancel/close button')
                }
                console.log('mydata 0', data)
                setMydata(data);
            },
        })
    }




    return (
        <>
            <div className="border-2 border-black m-4" onClick={() => handleOpenPicker()}>
                open picker
            </div>

        </>
    )
}

export default ImageUpload
