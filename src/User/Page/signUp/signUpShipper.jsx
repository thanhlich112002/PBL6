import React, { useState } from 'react';
import axios from 'axios';
import useLocationSelect from "./address";
import './signUp.css'
import { useNavigate } from "react-router-dom";

const SignUpShipper = () => {
    const navigate = useNavigate();
    const {
        cities,
        districts,
        wards,
        handleCityChange,
        handleDistrictChange,
      } = useLocationSelect();
      const handleNav = ({ nav }) => {
        navigate(`/${nav}`);
      };
      const [formData, setFormData] = useState({
        email: '',
        password: '',
        passwordConfirm: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        city: '',
        district: '',
        ward: '',
        detailAddress: '',
        frontImageCCCD: null,
        behindImageCCCD: null,
        licenseId: '',
        licenseImage: null,
        vehicleNumber:'',
        vehicleType:'',
        licenseNumber:'',
    });

    const handleChangeCity = (e) => {
        handleCityChange(e);
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
          });
    }
    const handleChangeDictrict = (e) => {
        handleDistrictChange(e);
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
          });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
            setFormData({
              ...formData,
              [name]: value,
            });
    };

    const handleChangeImg = (e) => {
        const { name, files } = e.target;
        if (files.length > 0) {
          setFormData({
            ...formData,
            [name]: files[0],
          });
        }
      };
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault();
        const address = `${formData.detailAddress}, ${formData.ward}, ${formData.district}, ${formData.city}`;
        const registrationData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            passwordConfirm: formData.passwordConfirm,
            address: address,
            phoneNumber: formData.phoneNumber,
            frontImageCCCD: formData.frontImageCCCD,
            behindImageCCCD: formData.behindImageCCCD,
            licenseId: formData.licenseId,
            licenseImage: formData.licenseImage,
            vehicleNumber:formData.vehicleNumber,
            vehicleType:formData.vehicleType,
            licenseNumber:formData.licenseNumber,
        };
        if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(registrationData.email)) {
            setError("Email không hợp lệ")
        } else if(!/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(registrationData.password)) {
            setError("Mật khẩu phải có ít nhật 8 kí tự gồm cả chữ và số")
        }else if(registrationData.password !== registrationData.passwordConfirm) {
            setError("Mật khẩu và xác nhận mật khẩu không khớp")
        } else if (!/^\d{10}$/.test(registrationData.phoneNumber)) {
            setError("Số điện thoại không hợp lệ")
        } else {
            try {
                console.log(registrationData)

            //   const response = await axios.post('https://falth.vercel.app/api/shipper', registrationData);
            //   console.log('Đăng ký thành công', response.data);
            //   setError('')
            //   setSuccess('Đã nhận được thông tin! Mời bạn xác nhận email')
            //     navigate("/verify", { state: { action: "verifyUser", email: registrationData.email } });
            } catch (error) {
              setError('Địa chỉ email đã tồn tại');
            }

        }
    };
    return (
        <div>
            <div class="page-wrapper bg-color p-t-180 p-b-100 font-robo">
                <div class="wrapper_su wrapper--w960">
                    <div class="card_su card-2_su">
                        <div class="card-heading_ship"></div>
                        <div class="card-body_su">
                            <h2 class="title_su">Đăng ký nhân viên giao hàng</h2>
                            <div>
                            <div class="container-navigate">
                                <button class="btn_su btn--radius btn--red" onClick={() => handleNav({ nav: "signUpCustomer" })}>Khách hàng</button>
                                    <button class="btn_su btn--radius btn--red" style={{marginLeft:'20px'}} onClick={() => handleNav({ nav: "signUpShipper" })}>Nhân viên giao hàng</button>
                                    <button class="btn_su btn--radius btn--red" style={{marginLeft:'20px'}} onClick={() => handleNav({ nav: "signUpOwner" })}>Chủ cửa hàng</button>
                                </div>
                            </div>
                            <form method="POST" onSubmit={handleSubmit}>
                                <div class="input-group_su">
                                    <input style={{border:'none'}}class="input--style-2" type="text" placeholder="Email" name="email" required value={formData.email} onChange={handleChange}/>
                                </div>
                                <div class="input-group_su">
                                    <input style={{border:'none'}}class="input--style-2" type="password" placeholder="Mật khẩu (có ít nhất 8 kí tự bao gồm cả chữ và số)" name="password" required value={formData.password} onChange={handleChange}/>
                                </div>
                                <div class="input-group_su">
                                    <input style={{border:'none'}}class="input--style-2" type="password" placeholder="Xác nhận mật khẩu" name="passwordConfirm" required value={formData.passwordConfirm} onChange={handleChange}/>
                                </div>
                                <div class="row_su row-space">
                                    <div class="col-2_su">
                                        <div class="input-group_su">
                                            <input style={{border:'none'}}class="input--style-2" type="text" placeholder="Họ" name="firstName" required value={formData.firstName} onChange={handleChange}/>
                                        </div>
                                    </div>
                                    <div class="col-2_su">
                                        <div class="input-group_su">
                                            <input style={{border:'none'}}class="input--style-2" type="text" placeholder="Tên" name="lastName" required value={formData.lastName} onChange={handleChange}/>
                                        </div>
                                    </div>
                                </div>
                                <div class="input-group_su">
                                    <input style={{border:'none'}}class="input--style-2" type="text" placeholder="Số điện thoại" name="phoneNumber" required value={formData.phoneNumber} onChange={handleChange} maxLength={10}/>
                                </div>

                                <div class="row_su row-space">
                                    <div class="col-3_su">
                                        <div class="input-group_su">
                                            <div class="rs-select2 js-select-simple select--no-search">
                                                <select onChange={handleChangeCity} name="city" class="form-select form-select-sm" id="city" aria-label=".form-select-sm" required value={formData.city}>
                                                    <option disabled="disabled" selected="selected">Chọn tỉnh thành</option>
                                                    {cities.map((city) => (
                                                        <option key={city.Id} value={city.Name}>
                                                            {city.Name}
                                                        </option>
                                                    ))}
                                                </select>
                                                <div class="select-dropdown"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-3_su">
                                        <div class="input-group_su">
                                            <div class="rs-select2 js-select-simple select--no-search">
                                                <select onChange={handleChangeDictrict} name="district" class="form-select form-select-sm " id="district" aria-label=".form-select-sm" required value={formData.district}>
                                                    <option disabled="disabled" selected="selected">Chọn quận huyện</option>
                                                    {districts.map((district) => (
                                                        <option key={district.Id} value={district.Name}>
                                                            {district.Name}
                                                        </option>
                                                    ))}
                                                </select>
                                                <div class="select-dropdown"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-3_su">
                                        <div class="input-group_su">
                                            <div class="rs-select2 js-select-simple select--no-search">
                                                <select name="ward" class="form-select form-select-sm" id="ward" aria-label=".form-select-sm" required value={formData.ward} onChange={handleChange}>
                                                    <option disabled="disabled" selected="selected">Chọn xã phường</option>
                                                    {wards.map((ward) => (
                                                        <option key={ward.Id} value={ward.Name}>
                                                            {ward.Name}
                                                        </option>
                                                    ))}
                                                </select>
                                                <div class="select-dropdown"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="input-group_su">
                                    <input style={{border:'none'}}class="input--style-2" type="text" placeholder="Địa chỉ cụ thể" name="detailAddress" value={formData.detailAddress} onChange={handleChange}/>
                                </div>
                                <div class="row_su row-space">
                                    <div class="col-3_su">
                                        <div class="input-group_su">
                                            <input style={{border:'none'}}class="input--style-2" type="text" placeholder="Mã GPLX" name="licenseId" value={formData.licenseId} onChange={handleChange}/>
                                        </div>
                                    </div>
                                    <div class="col-3_su">
                                        <div class="input-group_su">
                                            <input style={{border:'none'}}class="input--style-2" type="text" placeholder="Biển số xe" name="vehicleNumber" value={formData.vehicleNumber} onChange={handleChange}/>
                                        </div>
                                    </div>
                                    <div class="col-3_su">
                                        <div class="input-group_su">
                                            <input style={{border:'none'}}class="input--style-2" type="text" placeholder="Loại xe" name="vehicleType" value={formData.vehicleType} onChange={handleChange}/>
                                        </div>
                                    </div>
                                </div>

                                <div class="row_su row-space">
                                    <div class="col-2_su">
                                        <div class="input-group_su">
                                            <input style={{border:'none'}}class="input--style-2" type="text" name="class" accept="image/*" placeholder="Mặt trước CCCD: " readonly/>
                                        </div>
                                    </div>
                                    <div class="col-2_su">
                                        <div class="input-group_su" >
                                            <input style={{border:'none'}}class="input--style-2" type="file" name="frontImageCCCD" accept="image/*" value={formData.frontImageCCCD} onChange={handleChangeImg}/>
                                        </div>
                                    </div>
                                </div>

                                <div class="row_su row-space">
                                    <div class="col-2_su">
                                        <div class="input-group_su">
                                            <input style={{border:'none'}}class="input--style-2" type="text" name="image" accept="image/*" placeholder="Mặt sau CCCD: " readonly />
                                        </div>
                                    </div>
                                    <div class="col-2_su">
                                        <div class="input-group_su" >
                                            <input style={{border:'none'}}class="input--style-2" type="file" name="behindImageCCCD" accept="image/*" value={formData.behindImageCCCD} onChange={handleChangeImg}/>
                                        </div>
                                    </div>
                                </div>
                                <div class="row_su row-space">
                                    <div class="col-2_su">
                                        <div class="input-group_su">
                                            <input style={{border:'none'}}class="input--style-2" type="text" name="image" accept="image/*" placeholder="Mặt trước GPLX:" readonly />
                                        </div>
                                    </div>
                                    <div class="col-2_su">
                                        <div class="input-group_su" >
                                            <input style={{border:'none'}}class="input--style-2" type="file" name="licenseImage" accept="image/*" value={formData.licenseImage} onChange={handleChangeImg}/>
                                        </div>
                                    </div>
                                </div>
                                {/* <div class="row_su row-space">
                                    <div class="col-2_su">
                                        <div class="input-groupv">
                                            <input style={{border:'none'}}class="input--style-2" type="text" name="image" accept="image/*" placeholder="Mặt trước giấy đăng kí xe: " readonly />
                                        </div>
                                    </div>
                                    <div class="col-2_su">
                                        <div class="input-group_su" >
                                            <input style={{border:'none'}}class="input--style-2" type="file" name="vehicle_reg" accept="image/*" />
                                        </div>
                                    </div>
                                </div> */}
                                {error && <div className="alert-danger">{error}</div>}
                                {success && <div className="alert-success">{success}</div>}
                                <div class="p-t-30">
                                    <button class="btn_su btn--radius btn--red" type="submit">Đăng kí</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SignUpShipper;