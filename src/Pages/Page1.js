import React from "react";
import Switch from "../Components/Switch";
import "./Page1.css"
function Page1(){
    return(
        <div className="switches">
            <div>
                <Switch switchName="Light1"/>
            </div>
            <div>
                <Switch switchName="Light2"/>
            </div>
        </div>
        )
}

export default Page1;