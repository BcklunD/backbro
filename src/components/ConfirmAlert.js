import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const ConfirmAlert = ({ className, buttonText, title, message, confirmText, denyText, confirmFunction }) => {
    const submit = (e) => {
        e.preventDefault();
        confirmAlert({
            title: title,
            message: message,
            buttons: [
                {
                    label: confirmText,
                    onClick: confirmFunction
                },
                {
                    label: denyText
                    // onClick: () => alert('Click No')
                }
            ]
        });
    };

    return (
        <>
            <button className={className} onClick={submit}>{buttonText}</button>
        </>
    )
}

export default ConfirmAlert;