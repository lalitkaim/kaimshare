import React, { Component } from "react";
import { getFirestore, doc, setDoc, getDoc} from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytesResumable} from 'firebase/storage'
import { initialize } from './config'
import classes from './Hit.module.css'

class Hit extends Component{
    constructor(props){
        super(props)
        this.state={
            hit:null
        }
    }

    componentDidMount(){
        console.log("component did mount")
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

    componentDidUpdate(){
        console.log("component did upadate")
    }

    render(){
        return <>
            {
            this.state.hit ?
            <>
                Total Hits : {this.state.hit} 
            </>
            : null
            }
        </>
    }
}

export default Hit