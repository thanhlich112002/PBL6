import React from "react";
import useLocationSelect from "./address";
import './signUp.css'
import { useNavigate } from "react-router-dom";


const SignUpOwner = () => {
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
      const handleSignUpStore = () => {
        navigate("/signUpStore")
      }
    return (
        <div>
            <div class="page-wrapper bg-color p-t-180 p-b-100 font-robo">
                <div class="wrapper_su wrapper--w960">
                    <div class="card_su card-2_su">
                        <div class="card-heading_cus"></div>
                        <div class="card-body_su">
                            <h2 class="title_su">Đăng ký chủ cửa hàng</h2>
                            <div>
                                <div class="container-navigate">
                                <button class="btn_su btn--radius btn--red" onClick={() => handleNav({ nav: "signUpCustomer" })}>Khách hàng</button>
                                    <button class="btn_su btn--radius btn--red" style={{marginLeft:'20px'}} onClick={() => handleNav({ nav: "signUpShipper" })}>Nhân viên giao hàng</button>
                                    <button class="btn_su btn--radius btn--red" style={{marginLeft:'20px'}} onClick={() => handleNav({ nav: "signUpOwner" })}>Chủ cửa hàng</button>
                                </div>
                            </div>
                            <form method="POST">
                                <div class="input-group_su">
                                    <input style={{border:'none'}}class="input--style-2" type="text" placeholder="Email" name="email" required />
                                </div>
                                <div class="input-group_su">
                                    <input style={{border:'none'}}class="input--style-2" type="text" placeholder="Mật khẩu" name="password" required />
                                </div>
                                <div class="row_su row-space">
                                    <div class="col-2_su">
                                        <div class="input-group_su">
                                            <input style={{border:'none'}}class="input--style-2" type="text" placeholder="Họ" name="firstname" required />
                                        </div>
                                    </div>
                                    <div class="col-2_su">
                                        <div class="input-group_su">
                                            <input style={{border:'none'}}class="input--style-2" type="text" placeholder="Tên" name="name" required />
                                        </div>
                                    </div>
                                </div>

                                <div class="input-group_su">
                                    <input style={{border:'none'}}class="input--style-2" type="text" placeholder="Số điện thoại" name="sdt" required />
                                </div>

                                <div class="row_su row-space">
                                    <div class="col-3_su">
                                        <div class="input-group_su">
                                            <div class="rs-select2 js-select-simple select--no-search">
                                                <select onChange={handleCityChange} name="city" class="form-select form-select-sm" id="city" aria-label=".form-select-sm" required>
                                                    <option disabled="disabled" selected="selected">Chọn tỉnh thành</option>
                                                    {cities.map((city) => (
                                                        <option key={city.Id} value={city.Id}>
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
                                                <select onChange={handleDistrictChange} name="district" class="form-select form-select-sm" id="district" aria-label=".form-select-sm" required>
                                                    <option disabled="disabled" selected="selected">Chọn quận huyện</option>
                                                    {districts.map((district) => (
                                                        <option key={district.Id} value={district.Id}>
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
                                                <select name="ward" class="form-select form-select-sm" id="ward" aria-label=".form-select-sm" required>
                                                    <option disabled="disabled" selected="selected">Chọn xã phường</option>
                                                    {wards.map((ward) => (
                                                        <option key={ward.Id} value={ward.Id}>
                                                            {ward.Name}
                                                        </option>
                                                    ))}
                                                </select>
                                                <div class="select-dropdown"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* <div class="input-group_su">
                                    <input style={{border:'none'}}class="input--style-2" type="text" placeholder="Địa chỉ cụ thể" name="Address" />
                                </div> */}


                                <div class="row_su row-space">
                                    <div class="col-2_su">
                                        <div class="input-group_su">
                                            <input style={{border:'none'}}class="input--style-2" type="text" name="image" accept="image/*" placeholder="Mặt trước CCCD: " readonly />
                                        </div>
                                    </div>
                                    <div class="col-2_su">
                                        <div class="input-group_su" >
                                            <input style={{border:'none'}}class="input--style-2" type="file" name="image" accept="image/*" />
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
                                            <input style={{border:'none'}}class="input--style-2" type="file" name="image" accept="image/*" />
                                        </div>
                                    </div>
                                </div>
                                <div class="p-t-30">
                                    <button class="btn_su btn--radius btn--red" type="submit" onClick={handleSignUpStore}>Đăng kí</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpOwner;