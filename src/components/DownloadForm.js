import { getDoc, getFirestore, doc } from "@firebase/firestore";
// import { getStorage } from "@firebase/storage";
import React, { Component } from "react";
import classes from './DownloadForm.module.css'

class DownloadForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            key:'',
            urls:[],
            size:[],
            name:[]
        }
        this.textInput = React.createRef();
    }

    componentDidMount(){
        this.textInput.current.focus();
    }

    submitHandler=(event)=>{
        event.preventDefault()
        const db = getFirestore()
        const newRef = doc(db, "key", this.state.key)
        const docSnap = getDoc(newRef)
        docSnap.then(snap=>{
            if(snap.data()){
                this.setState({urls:snap.data().urls, names:snap.data().names, size:snap.data().size})
            }else{
                alert("This Kaim ID doesn't exist :(")
            }
        })
    }

    inputHandler=(event)=>{
        this.setState({key:event.target.value})
    }

    render(){
        let files = []
        files = this.state.urls.map((url, index)=>{
            return(
                <tr key={index}>
                    <td>{this.state.names[index]}</td>
                    <td>{Number.parseInt(this.state.size[index]/1024)}KB</td>
                    <td><a target="_blank" href={this.state.urls[index]}>Download</a></td>
                </tr>
            )
        })
        return (
            <div className={classes.mainDiv}>
                <form onSubmit={this.submitHandler} className={classes.form}>
                    <div className={"col-lg-6 col-md-8 col-sm-10 col-xs-12 px-2 "+classes.innerDiv}>
                        <input className={"form-control "+classes.formInput} type="text" ref={this.textInput} onChange={this.inputHandler} value={this.state.key} placeholder="Enter Your Pointer . . . "/>
                        <button type="submit" className={"btn "+classes.submit}>Get Files</button>
                    </div>    
                </form>
                {
                this.state.urls.length>0 &&    
                <table className="table table-hover table-striped table-sm mt-3">
                    <thead className="thead">
                        <tr>
                            <th>File Name</th>
                            <th>File Size</th>
                            <th>Download</th>
                        </tr>
                    </thead>
                    <tbody>
                        {files ? files : null}
                    </tbody>
                </table>
                }
            </div>
        )
    }
}

export default DownloadForm