import { getFirestore, doc, setDoc, getDoc, addDoc, collection} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable} from 'firebase/storage'
import React, { Component } from "react";
import { initialize } from './config'
import classes from './UploadForm.module.css'

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
            size:[]
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
        var track = 1;
        console.log(this.state.key)
        console.log(this.state.files)
        const db = getFirestore(initialize)
        const storage = getStorage()
        const newRef = doc(db, "key", this.state.key);
        const docSnap = getDoc(newRef);
        docSnap.then((docSnapshot) => {
            if(docSnapshot.data()) {
                alert("Please choose a different key :)")
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
                                this.state.urls[this.state.count] = downloadURL
                                this.setState(prevState => ({
                                    names: [...prevState.names, metadata.metadata.name],
                                    size: [...prevState.size, metadata.metadata.size]
                                }))
                                setDoc(newRef, {names:this.state.names, size:this.state.size, urls : this.state.urls})
                                this.setState({count:this.state.count+1});
                            })
                        })
                    }
                    );
                }
            }
        })
        .catch(error=>{
            console.log("catch"+error);
        });
    }

    componentDidMount(){
        console.log("didmount");
    }

    render(){
        return (
            <div className={classes.mainDiv}>
                <form onSubmit={this.submitHandler}>
                    <div className="row mx-2">
                        <input type="text" onChange={this.inputHandler} value={this.state.key} id="inputElement" className={"form-control col-lg-6 col-md-8 col-sm-10 col-xs-10 "+classes.formInput} placeholder="Type a key..."/>
                    </div>
                    <div className={""+classes.downMainDiv}>
                        <div className={"col-lg-6 col-md-8 col-sm-10 col-xs-12 "+classes.downDiv}>
                            <input type="file" multiple onChange={this.fileHandler} className={""+classes.inputFile}/>
                            <button type="submit" className={"btn "+classes.submit}>submit</button>
                        </div>
                    </div>
                </form>
                {
                this.state.show
                ?
                <>
                <div className={"row"} style={{width:"100%", justifyContent:"center", textAlign:"center", margin:"auto"}}>
                    <div className="progress mt-3 col-lg-6 col-md-8 col-sm-10 col-xs-12">
                        <div className="progress-bar" id="progressBar" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{this.state.progress}%</div>
                    </div>
                </div>
                <p>Files Uploaded : {this.state.count} / {this.state.files.length}</p>
                </>
                :
                null
                }
            </div>
        )
    }
}

export default UploadForm