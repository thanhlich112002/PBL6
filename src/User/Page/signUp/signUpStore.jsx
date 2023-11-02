import React from "react";
import useLocationSelect from "./address";
import './signUp.css'



const SignUpStore = () => {
    const {
        cities,
        districts,
        wards,
        handleCityChange,
        handleDistrictChange,
    } = useLocationSelect();
    return (
        <div>
            <div class="page-wrapper bg-color p-t-180 p-b-100 font-robo">
                <div class="wrapper_su wrapper--w960">
                    <div class="card_su card-2_su">
                        <div class="card-heading_store"></div>
                        <div class="card-body_su">
                            <h2 class="title_su">Đăng ký cửa hàng</h2>
                            {/* <h4 style={{ color: '#46f040', fontWeight: '500', marginBottom: '30px', fontSize: '16px' }}>Đăng ký chủ cửa hàng thành công! Mời bạn đăng ký thông tin cửa hàng.</h4> */}
                            <div class="alert-success">Đăng ký chủ cửa hàng thành công! Mời bạn đăng ký thông tin cửa hàng.</div>
                            <form method="POST">
                            <div class="input-group_su">
                                            <input style={{border:'none'}}class="input--style-2" type="text" placeholder="Tên quán" name="nameStore" required />
                                        </div>
                                <div class="row_su row-space">
                                    <div class="col-2_su">
                                        <div class="input-group_su">
                                            <input style={{border:'none'}}class="input--style-2" type="text" placeholder="Giờ mở cửa" name="openTime" required />
                                        </div>
                                    </div>
                                    <div class="col-2_su">
                                        <div class="input-group_su" >
                                            <input style={{border:'none'}}class="input--style-2" type="text" placeholder="Giờ đóng cửa" name="closeTime" required />
                                        </div>
                                    </div>
                                </div>
                                <div class="input-group_su">
                                            <input style={{border:'none'}}class="input--style-2" type="text" placeholder="Mô tả về quán" name="nameStore" required />
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

                                <div class="input-group_su">
                                    <input style={{border:'none'}}class="input--style-2" type="text" placeholder="Địa chỉ cụ thể" name="Address" />
                                </div>


                                <div class="row_su row-space">
                                    <div class="col-2_su">
                                        <div class="input-group_su">
                                            <input style={{border:'none'}}class="input--style-2" type="text" name="image" accept="image/*" placeholder="Giấy phép kinh doanh:" readonly />
                                        </div>
                                    </div>
                                    <div class="col-2_su">
                                        <div class="input-group_su" >
                                            <input style={{border:'none'}}class="input--style-2" type="file" name="licence" accept="image/*" />
                                        </div>
                                    </div>
                                </div>
                                <div class="row_su row-space">
                                    <div class="col-2_su">
                                        <div class="input-group_su">
                                            <input style={{border:'none'}}class="input--style-2" type="text" name="image" accept="image/*" placeholder="Hình ảnh của quán: " readonly />
                                        </div>
                                    </div>
                                    <div class="col-2_su">
                                        <div class="input-group_su" >
                                            <input style={{border:'none'}}class="input--style-2" type="file" name="avata" accept="image/*" />
                                        </div>
                                    </div>
                                </div>


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

export default SignUpStore;