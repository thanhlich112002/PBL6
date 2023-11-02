import React, { useState } from 'react';
import nocart from '../../assets/img/no_cart.png'
import CartItem from '../Item/cartItem';
import AddDish from './addDish';
import { useNavigate } from "react-router-dom";
const CartModal = ({ show, handleClose }) => {
    const [total, setTotal] = useState(0); // Số tiền tổng ban đầu là 0

    // Hàm này được gọi từ mỗi CartItem để cập nhật tổng tiền
    const updateTotalPrice = (id, totalPrice) => {

        setTotal((prevTotal) => prevTotal + totalPrice);
    };
    const navigate = useNavigate();

    const handleOrder = () => {
        navigate("/user/order")
    }
    return (
        <div>
            {/* {showModal && ( */}
            <div className={`ant-drawer ant-drawer-right ant-drawer-open DrawerWrapper___3chn_ DrawerWrapper--custom`}>
                <div className="ant-drawer-mask" onClick={handleClose}></div>

                <div className="ant-drawer-content-wrapper" style={{ width: '256px' }}>
                    <div className="ant-drawer-content">
                        <div className="ant-drawer-wrapper-body" style={{ overflow: 'auto', height: '100%' }}>
                            {/* empty cart */}
                            {/* <div className="ant-drawer-body">
                                <div className="CartClose___2qcP9">
                                    <div role="button" tabIndex="0" style={{ fontSize: '25px', fontWeight: '300', color: 'black', cursor: 'pointer' }} onClick={handleClose}>x</div>
                                </div>
                                <div className="Container___2ODfk">
                                    <div className="InnerContainer___127AT">
                                        <div className="Ilus___1VMHi">
                                            <img src={nocart} alt="" />
                                        </div>
                                        <h5 className="Title___ELm2y">Start Ordering Food!</h5>
                                        <div className="Caption___2tnhx">Add items to your cart and place order here.</div>
                                        <div className="">
                                            <button type="button" className="ant-btn textButton___2wwqU Button___2IyZ2" onClick={handleClose}>
                                                <span>Continue browsing</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                
                            </div> */}
                            <div class="ant-drawer-body">
                                <div class="Container___3hdF4">
                                    <div class="Header___1IY4t">
                                        <div class="Close___3j6yl" role="button" tabindex="0"
                                        ><div role="button" tabIndex="0" style={{ fontSize: '25px', fontWeight: '300', color: 'black', cursor: 'pointer' }} onClick={handleClose}>x</div></div>
                                        <div class="BlockTitle___2pGA_">
                                            <div class="title___3Sq4y">Giỏ đồ ăn</div>
                                            <div class="subtitle___1Stq2">
                                                <div class="small___1YhlN CartHeader-Caption-Clock___cBpaH"><i class="fa-regular fa-clock"></i></div>
                                                <span>Thời gian giao: 15 phút (Cách bạn 1,2 km)</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="BodyWrapper___31bjI">
                                        <div class="BodyScroller___2bUgC">
                                            <div class="Body___20FKF CartBody___3v3rN">
                                                <div class="CartMerchantList___3GwGF">
                                                    <div class="CartMerchant CartMerchantList-Item___3mF14">
                                                        <a
                                                            role="button"
                                                            tabindex="0"
                                                            href="/vn/vi/restaurant/c%C6%A1m-t%E1%BA%A5m-mi%E1%BB%81n-t%C3%A2y-2-hai-b%C3%A0-tr%C6%B0ng-delivery/5-CYUUNFJYBELDRX?"
                                                            style={{ color: 'inherit', textDecoration: 'none' }}
                                                        ><h5>Cơm Tấm Miền Tây 2 - Hai Bà Trưng</h5></a>
                                                        <div class="CartItemList___1cspW">
                                                            <CartItem
                                                                inputQuantity={1}
                                                                linkImage="https://d1sag4ddilekf6.cloudfront.net/compressed_webp/items/VNITE2022021502371836854/photo/510aaca140ea42a68dd18bb1c3545718_1664440232034477138.webp"
                                                                dishName="Mì xào hải sản"
                                                                specialRequest="Không bỏ hành"
                                                                price={25000}
                                                                updateTotalPrice={updateTotalPrice}
                                                                id={1}
                                                            />
                                                            <CartItem
                                                                inputQuantity={1}
                                                                linkImage="https://d1sag4ddilekf6.cloudfront.net/compressed_webp/items/VNITE2022021502371836854/photo/510aaca140ea42a68dd18bb1c3545718_1664440232034477138.webp"
                                                                dishName="Mì xào bò"
                                                                specialRequest="Không bỏ ớt"
                                                                price={30000}
                                                                updateTotalPrice={updateTotalPrice}
                                                                id={2}
                                                            />
                                                            <CartItem
                                                                inputQuantity={1}
                                                                linkImage="https://d1sag4ddilekf6.cloudfront.net/compressed_webp/items/VNITE2022021502371836854/photo/510aaca140ea42a68dd18bb1c3545718_1664440232034477138.webp"
                                                                dishName="Mì xào bò"
                                                                specialRequest=""
                                                                price={40000}
                                                                updateTotalPrice={updateTotalPrice}
                                                                id={2}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="Summary___xAbzz">
                                                    <div class="feeDetail___UmhH4">
                                                        <div class="flexSpaceBetween___J6Lln">
                                                            <div class="subTotal___1rSTB">
                                                                <span>Tổng</span>
                                                            </div>
                                                            <h6>{total} ₫</h6>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        Delivery Fee will be shown after you review order
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="Footer___MhWOA">
                                        <div class="ant-row-flex CartFooter-PriceInfo___1UEeS">
                                            <div class="ant-col-8">Tổng cộng</div>
                                            <div class="ant-col-16 CartFooter-Price___1jcoa">
                                                40.000 ₫
                                            </div>
                                        </div>
                                        <div>
                                            <a onClick={handleOrder}
                                            ><button
                                                type="button"
                                                class="ant-btn ant-btn-primary ant-btn-block"
                                            >
                                                    <span>Đăng nhập để đặt đơn</span>
                                                </button></a>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CartModal;
