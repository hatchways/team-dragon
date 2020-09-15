import React from "react";
import  { useAxios }   from "../../../hooks/useAxios";
import { useEmails } from "../../../DataContext"

const StepTwo = () => {
    const emailsContext = useEmails();
    const [emails, setEmails] = emailsContext;

    useAxios("url here", "post", emails);

    return ( <h2>step2</h2> );
}
 
export default StepTwo;
