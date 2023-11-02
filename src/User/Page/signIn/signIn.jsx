import React, { useState, useEffect } from "react";
// import  styles from './signIn.module.css'
import '../../assets/fonts/fontawesome-free-6.2.0-web/css/all.min.css'
import '../../assets/fonts/fontawesome-free-6.2.0-web/css/fontawesome.min.css'
import { useNavigate } from "react-router-dom";
import { loginAPI } from "../../services/userServices";
import { useAuth } from "../../services/authContext";
const Signin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // Initialize navigate
    const { setIsLoggedIn } = useAuth();
    const [loadingAPI, setLoadingAPI] = useState(false);
    const { setUserName } = useAuth()
    const { setImg } = useAuth()
    const handleLogin = async () => {
        if (email.trim() === "") {
            setError("Vui lòng nhập email");
        } else if (password.trim() === "") {
            setError("Vui lòng nhập mật khẩu");
        } else {
            try {
                setLoadingAPI(true)
                let res = await loginAPI(email, password);
                localStorage.setItem("token", res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.data.user));
                setIsLoggedIn(true);
                console.log(res.data.data.user.firstName + res.data.data.user.lastName)
                setUserName(res.data.data.user.firstName + res.data.data.user.lastName)
                setImg(res.data.data.user.photo)
                navigate("/");
                // window.location.reload()
            } catch (error) {
                setError("Mật khẩu không hợp lệ");
            }
            setLoadingAPI(false)
        }
    };
    const handleCreateAccount = () => {
        navigate("/signUpCustomer");
    }
    const handleForgotPass = () => {
        navigate("/forgotPass");
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            handleLogin();
        }
    };
    return (
        <div class="now-login" onKeyDown={handleKeyDown}>
            <div class="content">
                <div class="title">Đăng nhập</div>
                <div class="login-via">
                    {/* <div class="item phone">
                        <span class="fas fa-mobile-alt"></span>Số điện thoại
                    </div> */}
                    <div class="item fb">
                        <span class="fab fa-facebook-f"></span>Facebook
                    </div>
                    <form
                        id="google-login-form"
                        action="https://accounts.google.com/o/oauth2/v2/auth"
                        method="GET"
                    >
                        <input
                            type="hidden"
                            name="client_id"
                            value="229327170580-69v69v4s94p2tvf4qi3g0qb901b2pg99.apps.googleusercontent.com"
                        /><input
                            type="hidden"
                            name="redirect_uri"
                            value="https://shopeefood.vn/account/login"
                        /><input
                            type="hidden"
                            name="scope"
                            value="email profile openid"
                        /><input type="hidden" name="state" value="/" /><input
                            type="hidden"
                            name="response_type"
                            value="permission id_token"
                        /><input
                            type="hidden"
                            name="fetch_basic_profile"
                            value="true"
                        /><input
                            type="hidden"
                            name="nonce"
                            value="0N98K3CIH5RrCIJU4vmoBiSqmi9ptirz"
                        />
                        <div class="item plus">
                            <i class="fab fa-brands fa-google-plus-g"></i>Google
                        </div>
                    </form>
                </div>
                <div class="login-mess-policy">
                    Bạn chưa có tài khoản?
                    <button
                        style={{
                            color: '#0495ba',
                            borderBottom: '2px solid',
                        }}
                        onClick={handleCreateAccount}
                    >Tạo tài khoản của bạn</button>
                </div>
                {error && <div className="alert-danger">{error}</div>}
                <p class="text">Hoặc đăng nhập bằng tài khoản của bạn</p>
                <div class="form-login-input">
                    <div class="field-group">
                        <div class="input-group">
                            <i class="far fa-envelope"></i><input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div class="input-group">
                            <i class="fas fa-lock"></i><input type="password" placeholder="Mật khẩu" value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <div class="form-group clearfix">
                        <div class="float-left">
                            <input type="checkbox" id="RememberMe" checked="" /><label
                                for="RememberMe"
                            >Lưu thông tin đăng nhập</label>
                        </div>
                        <span class="float-right"
                        ><button onClick={handleForgotPass} style={{
                            color: '#0495ba',
                            borderBottom: '2px solid',
                        }}>Quên mật khẩu?</button></span>
                    </div>
                    <button class="btn btn-block btn-submit" onClick={handleLogin} style={{ flexDirection: 'row' }}>
                        {loadingAPI && <i class="fas fa-spinner fa-spin" style={{ color: 'white', position: 'inherit', marginRight: '10px' }}></i>}
                        Đăng nhập
                    </button>
                </div>
                <br />
                <div class="login-mess-policy">
                    Bằng cách đăng nhập hoặc đăng ký, bạn đồng ý với
                    <a
                        style={{
                            color: '#0495ba',
                            borderBottom: '2px solid',
                            textDecoration: 'none !important'
                        }}
                        target="_blank"
                        href="https://shopeefood.vn/gioi-thieu#footer-bottom"
                    > Chính sách quy định của FALTH</a>
                </div>
            </div>
        </div>
    )
}

export default Signin;