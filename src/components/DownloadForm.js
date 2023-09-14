import { getDoc, getFirestore, doc, updateDoc } from "@firebase/firestore";
import React, { Component } from "react";
import classes from './DownloadForm.module.css'

class DownloadForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            key:'',
            urls:[],
            size:[],
            name:[],
            visible:true,
            isLink:false,
            link:''
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
                if(snap.data().isLink){
                    if(snap.data().oneTimeDownload && snap.data().visible){
                        updateDoc(newRef, {visible:false})
                        .then(()=>{
                            window.location.href=snap.data().link
                        })
                    }else{
                        window.location.href=snap.data().link
                    }
                }
                this.setState({urls:snap.data().urls, names:snap.data().names, size:snap.data().size, visible:snap.data().visible}, ()=>{
                    if(snap.data().oneTimeDownload && this.state.visible){
                        updateDoc(newRef, {visible:false})
                    }else{
                        if(snap.data().oneTimeDownload)
                            alert("Thought already has been stolen :(")
                    }
                })
            }else{
                alert("Doesn't Exist, Make It Your Thought Now :)")
            }
        })
    }

    inputHandler=(event)=>{
        this.setState({key:event.target.value})
    }

    render(){
        let files = []
        if(this.state.visible && !this.state.isLink)
            files = this.state.urls.map((url, index)=>{
                return(
                    <tr key={index}>
                        <td>{this.state.names[index]}</td>
                        <td>{Number.parseInt(this.state.size[index]/1024)}KB</td>
                        <td><a target="_blank" rel="noreferrer" href={this.state.urls[index]}>Download</a></td>
                    </tr>
                )
            })
        return (
                <div className={classes.mainDiv}>
                    <form onSubmit={this.submitHandler} className={classes.form}>
                        <div className={"col-lg-6 col-md-8 col-sm-10 col-xs-12 px-2 "+classes.innerDiv}>
                            <input className={"form-control "+classes.formInput} type="text" ref={this.textInput} onChange={this.inputHandler} value={this.state.key} placeholder="Forgot Your Thought ?"/>
                            <button type="submit" className={"btn "+classes.submit}>Submit</button>
                        </div>    
                    </form>
                    {
                    !this.state.isLink && this.state.urls.length>0 && this.state.visible &&
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