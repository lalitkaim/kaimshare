import { getFirestore, doc, setDoc, getDoc} from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytesResumable} from 'firebase/storage'
import React, { Component } from "react";
import { initialize } from './config'
import classes from './UploadForm.module.css'
import 'animate.css';
import Contribute from "./Contribute";

class UploadForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            key : '',
            count : 0,
            files : [],
            show : false,
            progres:0,
            urls:[],
            names:[],
            size:[],
            hit:0,
            oneTimeDownload:false
        }
        this.textInput = React.createRef()
    }

    inputHandler=(event)=>{  
        this.setState({key:event.target.value})
    }

    fileHandler=(event)=>{
        this.setState({files:event.target.files})
    }

    oneTimeHandler=(event)=>{
        this.setState({oneTimeDownload:!this.state.oneTimeDownload})
    }

    submitHandler=(event)=>{
        event.preventDefault()
        const db = getFirestore(initialize)
        const storage = getStorage()
        const newRef = doc(db, "key", this.state.key);
        const docSnap = getDoc(newRef);
        docSnap.then((docSnapshot) => {
            if(docSnapshot.data()) {
                alert("Please Choose A Different Thought")
            } else {
                for(var i=0;i<this.state.files.length;i++){
                    const storageRef = ref(storage, this.state.key+"/"+this.state.files[i].name)
                    const uploadTask = uploadBytesResumable(storageRef, this.state.files[i])
                    uploadTask.on('state_changed', (snapshot)=>{
                        this.setState({show:true})
                        const progress = Number.parseInt((snapshot.bytesTransferred / snapshot.totalBytes)*100)
                        document.getElementById("progressBar").style.width = progress+"%"
                        this.setState({progress:progress});
                    },
                    (error)=>{
                        console.log(error.code);
                    },
                    ()=>{
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                            uploadTask.then(metadata=>{
                                const newRef = doc(db, "key", this.state.key)
                                this.setState(prevState => ({
                                    names: [...prevState.names, metadata.metadata.name],
                                    size: [...prevState.size, metadata.metadata.size],
                                    urls : [...prevState.urls, downloadURL]
                                }))
                                this.setState({count:this.state.count+1});
                                if(this.state.count==this.state.files.length){
                                    setDoc(newRef, {names:this.state.names, size:this.state.size, urls : this.state.urls, created : Date.now() , oneTimeDownload:this.state.oneTimeDownload, visible:true})
                                    .then(()=>{ 
                                        const hitRef = doc(db, "hit", "hit")
                                        setDoc(hitRef, {hit:this.state.hit+1})
                                        document.getElementById("contributeButton").click()
                                        setTimeout(()=>{
                                            window.location="/"                                    
                                        }, 60000)
                                    }).catch(error=>{
                                        console.log("catch "+error);
                                    })
                                }
                            })
                        })
                    }
                    );
                }
            }
        })
        .catch(error=>{
            console.log("catch "+error);
        });
    }

    uploadedHandler = ()=>{
        window.location="/"                                    
    }

    componentDidMount(){
        this.textInput.current.focus();
        const db = getFirestore(initialize)
        const newRef = doc(db, "hit", "hit")
        const docSnap = getDoc(newRef)
        docSnap.then(snap=>{
            if(snap.data()){
                this.setState({hit:snap.data().hit})
            }else{
                alert("Unable to fetch total hit count")
            }
        })
    }

    render(){
        return (
            <>  
                <div>
                    <button id="contributeButton" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{display:"none"}}>
                    </button>
                </div>
                <Contribute/>
                <div className={classes.mainDiv}>
                    <form onSubmit={this.submitHandler}>
                        <input type="checkbox" id="oneTime" name="oneTime" value="oneTime" onClick={this.oneTimeHandler}/>
                        <label htmlFor="oneTime"> &nbsp;One Time Download</label>
                        <div className="mx-2">
                            <input type="text" ref={this.textInput} onChange={this.inputHandler} value={this.state.key} id="inputElement" className={"form-control col-lg-6 col-md-8 col-sm-10 col-xs-10 "+classes.formInput} placeholder="Enter Your Currect Thought . . . "/>
                        </div>
                        <div className={"row mx-0 "+classes.downMainDiv}>
                            <div className={"col-lg-6 col-md-8 col-sm-10 col-xs-12 "+classes.downDiv}>
                                <input type="file" multiple onChange={this.fileHandler} className={classes.inputFile}/>
                                <button type="submit" className={"btn "+classes.submit}>Upload</button>
                            </div>
                        </div>
                    </form>
                    {
                    this.state.show
                    ?
                    <>
                        <div className={"row"} style={{width:"100%", justifyContent:"center", textAlign:"center", margin:"auto"}}>
                            <div className="progress mt-3 col-lg-6 col-md-8 col-sm-10 col-xs-12 p-0">
                                <div className="progress-bar" id="progressBar" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{this.state.progress}%</div>
                            </div>
                        </div>
                        <p>Files Uploaded : {this.state.count} / {this.state.files.length}</p>
                    </>
                    :
                    null
                    }
                    {
                        this.state.count>0 &&   this.state.count==this.state.files.length
                        ?
                        <div className={classes.uploaded} onClick={this.uploadedHandler}>
                            <div>
                                <h3 className="animate__animated animate__fadeOutUp">Successfully Uploaded</h3>
                            </div>
                        </div>
                        :
                        null
                    }
                </div>
            </>
        )
    }
}

export default UploadForm