import Alert from 'react-popup-alert'
import {useState} from "react";

export const WarningAlert=() =>{
    const [alert, setAlert] = useState({
        type: 'warning',
        text: 'warning',
        show: false
    })

    const onCloseAlert=() =>{
        setAlert({
            type: '',
            text: '',
            show: false
        })
    }

     return (
         <div>
             <Alert
                 header={'Header'}
                 btnText={'Close'}
                 text={alert.text}
                 type={alert.type}
                 show={alert.show}
                 onClosePress={()=>onCloseAlert()}
                 pressCloseOnOutsideClick={true}
                 showBorderBottom={true}
             />
         </div>
     )
 }

