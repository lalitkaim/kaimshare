import React, { Component } from "react";
import classes from './Home.module.css'

class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            key : ''
        }
    }

    downloadHandler = (event)=>{
        window.location.href="/downloadform"
    }

    uploadHandler = (event)=>{
        window.location.href="/uploadform"
    }

    render(){
        return (
            <div>
                <div className={classes.buttonDiv}>
                    <button onClick={this.downloadHandler} className={"btn "+classes.button1}>Download Form</button>
                    <button onClick={this.uploadHandler} className={"btn "+classes.button2}>Upload Form</button>
                </div>
            </div>
        )
    }
}

export default Home