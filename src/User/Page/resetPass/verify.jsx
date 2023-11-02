import React, { useState } from 'react'
import '../../assets/fonts/fontawesome-free-6.2.0-web/css/all.min.css'
import { useNavigate, useLocation } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
const Verify = () => {
    const navigate = useNavigate();
    const [otp, setOTP] = useState("");
    const [error, seterror] = useState("");
    const location = useLocation();
    const action = location.state.action;
    const email = location.state.email;
    const isButtonDisabled = otp.length !== 6;
    const handleVerify = async () => {
        if (action === "verifyUser") {
            const verify = {
                signUpToken: otp
            };
            console.log(verify)
            try {
                // Gọi API đăng ký người dùng
                const response = await axios.post(`https://falth.vercel.app/api/user/${email}`, verify);
                handleShow()
            } catch (error) {
                seterror("Mã xác thực không hợp lệ hoặc đã hết hạn")
            }
        } else if (action === "verifyToken") {
            try {
                const response = await axios.post(`https://falth.vercel.app/api/auth/verify-token/${email}`, {token: otp});    
                console.log('Đăng ký thành công', response.data);
                navigate("/resetPass", {state: {email: email}})
            } catch (error) {
                seterror("Mã xác thực không hợp lệ hoặc đã hết hạn")
            }
        }
        
    };
    const [show, setShow] = useState(false)
    const handleClose = () => {
        setShow(false)
        navigate("/")
    }
    const handleShow = () => {
        setShow(true)
    }
    const handleNavSignin = () => {
        navigate("/signin")
    }
    return (
        <div>

            <div class="now-login">
                <div class="content">
                    <div class="title">Mã xác thực đã được gửi đến email của bạn</div>
                    {error && <div className="alert-danger">{error}</div>}
                    <div class="form-login-input">
                        <div class="field-group">
                            <div class="input-group">
                                <i class="far fa-solid fa-lock"></i>
                                <input type="text" placeholder="Nhập mã xác thực" value={otp} onChange={(e) => setOTP(e.target.value)} maxLength={6} />
                            </div>
                        </div>
                        <button class="btn btn-block" onClick={handleVerify} disabled={isButtonDisabled}>Tiếp tục</button>
                    </div>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>FALTH thông báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Đăng kí tài khoản thành công! Mời bạn đăng nhập lại tài khoản.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="danger" onClick={handleNavSignin}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Verify;