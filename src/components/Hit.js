import React, { Component } from "react";
import { getFirestore, doc, getDoc} from "firebase/firestore";
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
        const db = getFirestore(initialize)
        const newRef = doc(db, "hit", "hit")
        const docSnap = getDoc(newRef)
        docSnap.then(snap=>{
            if(snap.data()){
                this.setState({hit:snap.data().hit})
            }else{
                alert("Unable to fetch hit count")
            }
        })
    }

    render(){
        return <>
            {
            this.state.hit ?
            <>
                <section>
                    <div className={classes.content}>
                        <p>Total Hits : {this.state.hit} </p>
                        <p>Total Hits : {this.state.hit} </p>
                    </div>
                </section>
            </>
            : null
            }
        </>
    }
}

export default Hit