import classes from './Home.module.css'

function Info(){
    return <>
        <div>
            <button type="button" className={"btn btn-primary animate__animated animate__bounce "+classes.infoIcon} data-bs-toggle="modal" data-bs-target="#exampleModal">
                <i className="fas fa-info" style={{fontSize:"30px"}}></i>
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
                        <p>Kaimshare is a free website which can be used to share files/link.</p>
                        <h5>How to use?</h5>
                        <ul>
                            <li> Share File
                                <ul>
                                    <li>
                                    To <b>download</b> a file or  simply click on Get Form button, 
                                write down the thought (unique ID) and click submit.
                                    </li>
                                    <li>
                                    To <b>upload</b> a file or files simply click on the Send Form button,
                                write down the thought (unique ID), click Share File and choose files you want to upload and click on Upload.
                                    </li>
                                </ul>
                            </li>
                            <li> Share Link
                                <ul>
                                    <li>
                                    To <b>get link</b> simply click on the Get Form button,
                                write down the thought (unique ID), and click submit. You'll be redirected to respective URL.
                                    </li>
                                    <li>
                                    To <b>share link</b> simply click on the Send Form button,
                                write down the thought (unique ID), click Share Link and paste link and click on Link it.
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <h5>Features</h5>
                        <ul>
                            <li>You can upload any size of file.</li>
                            <li>You can share URLs easily.</li>
                            <li>The files will be deleted automatically after one week of upload</li>
                            <li>You can't upload files on used thought (unique ID) (Please wait for a week to use it again)</li>
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
    </>
}

export default Info