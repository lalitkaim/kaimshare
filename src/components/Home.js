import React, { Component } from "react";

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
                <p>Home Page</p>
                <div>
                    <button onClick={this.downloadHandler}>Download Form</button>
                    <button onClick={this.uploadHandler}>Upload Form</button>
                </div>
            </div>
        )
    }
}

export default Home