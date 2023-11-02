import React, {useState} from 'react'
import '../../assets/fonts/fontawesome-free-6.2.0-web/css/all.min.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const ForgotPass = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [error, setError] = useState(""); // Initialize navigate

    const handleVerify =  async () => {
        // Kiểm tra xem đã nhập đủ tên đăng nhập và mật khẩu chưa
        if (email.trim() === "") {
            setError("Vui lòng nhập email");
        } else {
            try {
                // Gọi API đăng ký người dùng
                const response = await axios.post('https://falth.vercel.app/api/auth/forgot-password', {email});
      
                // Xử lý phản hồi từ máy chủ, ví dụ: hiển thị thông báo thành công
                console.log('Nhập email thành công', response.data);
                navigate("/verify", { state: { action: "verifyToken", email: email } });
              } catch (error) {
                // Xử lý lỗi, ví dụ: hiển thị thông báo lỗi
                console.error('Lỗi', error);
              }
            
        }
    };

    return (
        <div class="now-login">
            <div class="content">
                <div class="title">Quên mật khẩu</div>
                <p>Điền email đăng ký của bạn, FALTH sẽ gửi cho bạn mã xác nhận để tạo mật khẩu mới.</p>
                <div class="form-login-input">
                    <div class="field-group">
                        <div class="input-group">
                            <i class="far fa-envelope"></i>
                            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>
                    {error && <div className="alert-danger">{error}</div>}
                    <button class="btn btn-block" onClick={handleVerify}>Tiếp theo</button>
                </div>
            </div>
        </div>
    )
}

export default ForgotPass;