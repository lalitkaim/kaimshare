import { getDoc, getFirestore, doc } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";
import React, { Component } from "react";

class DownloadForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            key:'',
            urls:[],
            size:[],
            name:[]
        }
    }

    componentDidMount(){

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
                console.log("data not exist");
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
                    <td>{this.state.size[index]}</td>
                    <td><a target="_blank" href={this.state.urls[index]}>Download</a></td>
                </tr>
            )
        })
        return (
            <>
                <p>Download Files Page</p>
                <form onSubmit={this.submitHandler}>
                    <input type="text" onChange={this.inputHandler} value={this.state.key} id="inputElement" className="form-control" placeholder="Type a key..."/>
                    <button type="submit">submit</button>
                </form>
                <div>
                    <table>
                        <thead>
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
                </div>
            </>
        )
    }
}

export default DownloadForm