import React, { Component } from "react";
import classes from './Home.module.css'
import { doc, getFirestore, collection, query, where, getDocs, deleteDoc } from "firebase/firestore";
import { getStorage, ref, deleteObject, listAll } from "firebase/storage";
import 'animate.css';

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

    componentDidMount(){
        const db = getFirestore()
        const storage = getStorage();
        const q = query(collection(db, "key"), where("created", "<", Date.now()-604800000));
        const querySnapshot =  getDocs(q);
        querySnapshot.then((docs)=>{
            docs.forEach(mydoc=>{
                const desertRef = ref(storage, mydoc.id);
                listAll(desertRef)
                .then((res) => {
                    res.items.forEach((itemRef) => {
                        deleteObject(itemRef).then(()=>{
                        })
                    });
                })
                .then(()=>{
                    deleteDoc(doc(db, "key", mydoc.id));
                })
                .catch((error) => {
                    console.log("we have error");
                });
            })
        })

    }

    render(){
        return (
            <div>
                <div>
                <button type="button" className={"btn btn-primary animate__animated animate__bounce "+classes.infoIcon} data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <i class="fas fa-info" style={{fontSize:"30px"}}></i>
                </button>
                </div>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Kaimshare :)</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <h5>What is it?</h5>
                                <p>Kaimshare is a free website which can be used to share files.</p>
                                <h5>How to use?</h5>
                                <ul>
                                    <li>
                                        To <b>download</b> a file or files simply click on Download Form button, 
                                        write down the Kaim ID and click on Get Files.
                                    </li>
                                    <li>
                                        To <b>upload</b> a file or files simply click on the Upload Form button,
                                        write down the Kaim ID and choose files you wanna upload and click on Upload.
                                    </li>
                                </ul>
                                <h5>Features</h5>
                                <ul>
                                    <li>You can upload any size of file.</li>
                                    <li>The files will be deleted automatically after one week of upload</li>
                                    <li>You can't upload files on used Kaim ID (Please wait for a week to use it again)</li>
                                </ul>
                                <h5>How to contribute?</h5>
                                <ul>
                                    <li>Fork the repo <a href="https://github.com/lalit-kaim/kaimshare">kaimshare</a></li>
                                    <li>Do the changes</li>
                                    <li>Create a pull request</li>
                                </ul>
                            </div>
                            <div className="modal-footer" style={{display:"block"}}>
                                <p className="text-center">For any query reach out @ <a href="mailto:kaim.lalit1234@gmail.com">kaim.lalit1234@gmail.com</a></p>
                                <p className="text-center" style={{fontSize:"14px"}}>© 2021-Present Lalit, All rights reserved</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.buttonDiv}>
                    <button onClick={this.downloadHandler} className={"btn "+classes.button1}>Download Form</button>
                    <button onClick={this.uploadHandler} className={"btn "+classes.button2}>Upload Form</button>
                </div>
            </div>
        )
    }
}

export default Home