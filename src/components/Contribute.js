import { Component } from "react"
import classes from './Contribute.module.css'
import icici from '../icici.svg'


class Contribute extends Component{

    goToHome=(event)=>{
        window.location="/"
    }

    render(){
        return <>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title m-auto" id="exampleModalLabel" style={{color:"#03a9f4"}}>Thank You for using Kaimshare</h5>
                            <button type="button" className={"btn-close "+classes.closeButton} data-bs-dismiss="modal" aria-label="Close" onClick={this.goToHome}></button>
                        </div>
                        <div className="modal-body text-center">
                            <p>Contribute or Use it again</p>
                            <p>Scan the QR code</p>
                            <img src={icici} className={"img-fluid "+classes.qrCode} alt="QR Code"/>
                            <hr className={classes.hr_text} data-content="OR"/>
                            <p>UPI ID : lalitkaim@icici</p>
                        </div>
                        <div className="modal-footer" style={{display:"block"}}>
                            <p className="text-center">For any query reach out @ <a href="mailto:kaim.lalit1234@gmail.com">kaim.lalit1234@gmail.com</a></p>
                            <p className="text-center" style={{fontSize:"14px"}}>© 2021-Present Lalit, All rights reserved</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    }
}

export default Contribute