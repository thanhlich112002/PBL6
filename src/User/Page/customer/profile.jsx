import React, { useState, useEffect } from 'react';
// import './customer.css'
import ava from '../../assets/img/images.jpg'
import '../../assets/fonts/fontawesome-free-6.2.0-web/css/all.min.css'
import { useNavigate } from "react-router-dom";
import { getUserInfo, getDefaultContact } from '../../services/userServices';
import { useLogout } from '../../services/authContext';
import axios from 'axios';
const Profile = () => {
    const logout = useLogout();
    function handleLogout() {
        logout();
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate("/")
    }
    const [showChangePassword, setShowChangePassword] = useState(false);

    const handleToggleChangePassword = () => {
        setShowChangePassword(!showChangePassword);
    };
    const navigate = useNavigate();
    const handleNav = ({ nav }) => {
        navigate(`/${nav}`);
    };
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [img, setImg] = useState("")
    const [address, setAddress] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    useEffect(() => {
        // const token = localStorage.getItem("token");
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    const userData = await getUserInfo(token);
                    const defaultContact = await getDefaultContact(token)
                    setUserName(userData.firstName + " " + userData.lastName)
                    setEmail(userData.email)
                    setImg(userData.photo)
                    setAddress(defaultContact.address)
                    setPhoneNumber(defaultContact.phoneNumber)
                } else {
                    console.error("Token không tồn tại trong local storage");
                }
            } catch (error) {
                console.error("Lỗi khi lấy thông tin người dùng:", error);
            }
        }
        fetchData();
    }, []);

    const [formData, setFormData] = useState({
        oldPass: '',
        newPass: '',
        confirmedPass: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const  [error, setError] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(formData.newPass.trim())) {
            setError("Mật khẩu phải có ít nhật 8 kí tự gồm cả chữ và số")
        }else if(formData.newPass === formData.confirmedPass) {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    const changePasswordData = {
                        oldPass: formData.oldPass,
                        newPass: formData.newPass,
                        confirmedPass: formData.confirmedPass
                    };
                    console.log(changePasswordData)
                    const decodedToken = JSON.parse(atob(token.split(".")[1]));
                    // const response = await axios.post(`https://falth.vercel.app/api/user/${decodedToken.id}`, changePasswordData);
                    console.log(decodedToken.id)
                    const response = await axios.post(`https://falth.vercel.app/api/user/change-pass/${decodedToken.id}`, changePasswordData, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    logout();
                    localStorage.removeItem('token')
                    alert('Đổi mật khẩu thành công mời bạn đăng nhập lại')
                    navigate("/signin")
                    // console.log('Đổi mật khẩu thành công', response.data);
                } else {
                    console.error("Token không tồn tại trong local storage");
                }
            } catch (error) {
                // Xử lý lỗi, ví dụ: hiển thị thông báo lỗi
                // console.error('Lỗi đổi mật khẩu', error);
                setError('Đổi mật khẩu thất bại')
            }
        } else {
            setError('Mật khẩu mới và xác nhận mật khẩu không đúng')
        }
    };
    return (
        <div class="container">
            <div class="now-navigation-profile">
                <div class="header-profile">
                    <div class="row align-items-center">
                        <div class="col-auto">
                            <img
                                class="avatar-circle"
                                src={img}
                                alt={userName}
                            />
                        </div>
                        <div class="col txt-bold font15">{userName}</div>
                    </div>
                </div>
                <div class="navigation-profile">
                    <a
                        class="item-navigation active"
                        title="Cập nhật tài khoản"
                        onClick={() => handleNav({ nav: "user/profile" })}
                    >
                        <div class="row">
                            <div class="col-auto"><i class="fas fa-user"></i></div>
                            <div class="col">Quản lý tài khoản</div>
                            <div class="col-auto">
                                <i class="icon-arrow-thin right"></i>
                            </div></div>
                    </a>
                    <div class="item-navigation">
                        <a class="item-navigation" title="orderInfo" style={{ cursor: 'pointer' }} onClick={() => handleNav({ nav: "user/updateAddress" })}
                        ><div class="row">
                                <div class="col-auto"><i class="fas fa-shopping-cart"></i></div>
                                <div class="col">Quản lý đơn hàng</div>
                                <div class="col-auto">
                                    <i class="icon-arrow-thin right"></i>
                                </div></div></a>
                    </div>
                    <div class="item-navigation">
                        <a
                            class="item-navigation"
                            title="Đăng xuất"
                            onClick={handleLogout}
                            style={{ cursor: 'pointer' }}
                        >
                            <div class="row">
                                <div class="col-auto">
                                    <i class="fas fa-solid fa-right-from-bracket"></i>
                                </div>
                                <div class="col">Đăng xuất</div>
                                <div class="col-auto"></div>
                            </div>
                        </a>
                    </div>
                </div>


            </div>
            <div class="now-detail-profile">
                <div class="header-user-profile">Thông tin người dùng</div>
                <div class="content-user-profile">
                    <div class="user-profile-update">
                        <div class="title-user">Tải ảnh đại diện</div>
                        <div class="row">
                            <div class="col-3">
                                <div class="user-avatar-image">
                                    <img
                                        src={img}
                                        alt=""
                                        id="avatar_user"
                                    />
                                </div>
                            </div>
                            <div class="col-9">
                                <div class="form-group">
                                    <span>Tải lên từ</span>
                                    <div class="custom-file-image">
                                        <input
                                            type="file"
                                            id="validatedCustomFile"
                                            class="input-custom"
                                            required=""
                                            style={{ display: 'none' }}
                                            accept="image/*"
                                        />
                                        <label class="label-custom" for="validatedCustomFile">Chọn</label>
                                        <span class="font-italic font13">Chấp nhận GIF, JPEG, PNG, BMP với kích thước tối đa 5.0MB</span>
                                    </div>
                                </div>
                                <button class="btn btn-blue-4" type="button">Cập nhật</button>
                            </div>
                        </div>
                    </div>
                    <div class="user-profile-update">
                        <form>
                            <div class="title-user">Thay đổi thông tin</div>
                            <div class="row form-group align-items-center">
                                <div class="col-3 txt-bold">Tên</div>
                                <div class="col-4">
                                    <div class="input-group">
                                        <input
                                            name="name"
                                            placeholder={userName}
                                            type="text"
                                            class="form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="row form-group align-items-center">
                                <div class="col-3 txt-bold">Email</div>
                                <div class="col-8">
                                    <div class="input-group">
                                        <div class="show-email">{email}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="row form-group align-items-center">
                                <div class="col-3 txt-bold">Địa chỉ</div>
                                <div class="col-4">
                                    <div class="input-group">
                                        <textarea
                                            name="name"
                                            placeholder={address}
                                            type="text"
                                            class="form-control"
                                            style={{ wordWrap: "break-word", resize: "vertical" }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="row form-group align-items-center">
                                <div class="col-3 txt-bold">Số điện thoại</div>
                                <div class="col-4">
                                    <div class="input-group">
                                        <input
                                            name="name"
                                            placeholder={phoneNumber}
                                            type="text"
                                            class="form-control"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="row form-group align-items-center">
                                    <div className="col-3 txt-bold">Mật khẩu</div>
                                    <div className="col-8">
                                        <div className="input-group">
                                            <span className="show-pass">********</span>
                                            <button
                                                type="button"
                                                className="change-pass"
                                                id="change-pass"
                                                onClick={handleToggleChangePassword}
                                            >
                                                Đổi mật khẩu
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {showChangePassword && (
                                    <div className="form-group verify-pass">
                                        <div className="row align-items-center mar-bottom5">
                                            <div className="col-3 txt-bold">Mật khẩu cũ</div>
                                            <div className="col-4">
                                                <div className="input-group validate-pass">
                                                    <input
                                                        name="oldPass"
                                                        placeholder="Mật khẩu cũ"
                                                        type="password"
                                                        className="form-control"
                                                        value={formData.oldPass}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row align-items-center mar-bottom5">
                                            <div className="col-3 txt-bold">Mật khẩu mới</div>
                                            <div className="col-4">
                                                <div className="input-group validate-pass">
                                                    <input
                                                        name="newPass"
                                                        placeholder="Mật khẩu mới"
                                                        type="password"
                                                        className="form-control"
                                                        value={formData.newPass}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row align-items-center">
                                            <div className="col-3 txt-bold">Nhập lại mật khẩu mới</div>
                                            <div className="col-4">
                                                <div className="input-group validate-pass">
                                                    <input
                                                        name="confirmedPass"
                                                        placeholder="Nhập lại mật khẩu mới"
                                                        type="password"
                                                        className="form-control"
                                                        value={formData.confirmedPass}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            {error && <div class="row form-group align-items-center"><div className="alert-danger">{error}</div></div>}
                            <div class="row">
                                <div class="col-3">
                                    <button type="submit" class="btn btn-blue-4 btn-block" onClick={handleSubmit}>
                                        Lưu thay đổi
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default Profile;