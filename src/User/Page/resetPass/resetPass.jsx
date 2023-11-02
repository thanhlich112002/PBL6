import React, {useState} from 'react'
import '../../assets/fonts/fontawesome-free-6.2.0-web/css/all.min.css'
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

const ResetPass = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [newPass, setNewPass] = useState(""); 
    const [confirm, setConfirm] = useState(""); 
    const [error, setError] = useState("");
    const email = location.state.email;
    const handleResetPass = async () => {
        if(!/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(newPass.trim())) {
            setError("Mật khẩu phải có ít nhật 8 kí tự gồm cả chữ và số")
        }else if(newPass.trim() !== confirm.trim()) {
            setError("Mật khẩu và xác nhận mật khẩu không trùng khớp");
        } else {
            try {
                // const response = await axios.post(`https://falth.vercel.app/api/auth/reset-password/${email}`, {password: newPass, passwordConfirm: confirm});
      
                // console.log('Đăng ký thành công', response.data);
                console.log(newPass, confirm, email)
                alert('Đổi mật khẩu thành công mời bạn đăng nhập lại')
                navigate("/signin")
              } catch (error) {
                setError('Đổi mật khẩu thất bại');
              }
        }
    }
    return (
        <div class="now-login">
            <div class="content">
                <div class="title">Đổi mật khẩu</div>
                <p>Nhập lại mật khẩu mới mà bạn muốn</p>
                <div class="form-login-input">
                    <div class="field-group">
                        <div class="input-group">
                            <i class="far fa-solid fa-lock"></i>
                            <input type="password" placeholder="Mật khẩu mới" value={newPass} onChange={(e) => setNewPass(e.target.value)} />
                        </div>
                        <div class="input-group">
                            <i class="far fa-solid fa-lock"></i>
                            <input type="password" placeholder="Xác nhận mật khẩu mới" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
                        </div>
                    </div>
                    {error && <div className="alert-danger">{error}</div>}
                    <button class="btn btn-block" onClick={handleResetPass}>Đổi mật khẩu</button>
                </div>
            </div>
        </div>
    )
}

export default ResetPass;