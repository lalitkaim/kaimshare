import React, { Component } from "react";
import {initialize} from './config'

class DownloadForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            key : '',
            files : []
        }
    }

    inputHandler=(event)=>{  
        this.setState({key:event.target.value})
    }

    fileHandler=(event)=>{
        this.setState({files:event.target.files})
        console.log(this.state.files)
    }

    submitHandler=(event)=>{
        event.preventDefault()
        const db = initialize.firestore();
        console.log(this.state.key)
        console.log(this.state.files)
        db.collection("key").doc(this.state.key).add({files:this.state.files})
    }

    render(){
        return (
            <div>
                <p>Download Form</p>
                <form onSubmit={this.submitHandler}>
                    <input type="text" onChange={this.inputHandler} value={this.state.key} id="inputElement" className="form-control" placeholder="Type a key..."/>
                    <input type="file" multiple onChange={this.fileHandler}/>
                    <button type="submit">submit</button>
                </form>
            </div>
        )
    }
}

export default DownloadForm