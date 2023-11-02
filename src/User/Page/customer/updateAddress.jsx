import React, { useState, useEffect } from 'react';
import DeleteConfirmationModal from '../../Components/Modal/deleteDanger';
import ModalUpdateAddress from '../../Components/Modal/modalUpdateAddress';
import { useNavigate } from "react-router-dom";
import { getUserInfo } from '../../services/userServices';
import { useLogout } from '../../services/authContext';
const UpdateAddress = () => {
    const logout = useLogout();
    function handleLogout() {
        logout();
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate("/")
    }

    const [showModal, setShowModal] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [action, setAction] = useState('');

    const handleShowModal = (address1, phoneNumber1, action1) => {
        setAddress(address1)
        setPhoneNumber(phoneNumber1)
        setAction(action1)
        console.log(phoneNumber, address)
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setAddress('')
        setPhoneNumber('')
    };

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState('');

    const handleShowDeleteModal = (id) => {
        // console.log(id)
        setItemToDelete(id);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setItemToDelete('');

    };



    const navigate = useNavigate();
    const handleNav = ({ nav }) => {
        navigate(`/${nav}`);
    };

    const [contacts, setContacts] = useState([]);
    const [userName, setUserName] = useState("");
    const [img, setImg] = useState("")
    useEffect(() => {;
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    const userData = await getUserInfo(token);
                    setUserName(userData.firstName + " " + userData.lastName)
                    setImg(userData.photo)
                    setContacts(userData.contact)
                } else {
                    console.error("Token không tồn tại trong local storage");
                }
            } catch (error) {
                console.error("Lỗi khi lấy thông tin người dùng:", error);
            }
        }
        fetchData();
    }, []);
    return (
        <div>
            <div class="container" style={{ zIndex: '100' }}>
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
                            class="item-navigation"
                            title="Cập nhật tài khoản"
                            onClick={() => handleNav({ nav: "user/profile" })}
                            style={{ cursor: 'pointer' }}
                        ><div class="row">
                                <div class="col-auto"><i class="fas fa-user"></i></div>
                                <div class="col">Quản lý tài khoản</div>
                                <div class="col-auto">
                                    <i class="icon-arrow-thin right"></i>
                                </div></div></a>
                        <div class="item-navigation">
                            <a title="orderInfo" style={{ cursor: 'pointer' }} class="active" onClick={() => handleNav({ nav: "user/updateAddress" })}
                            ><div class="row">
                                    <div class="col-auto">
                                        <i class="fas fa-shopping-cart"></i>
                                    </div>
                                    <div class="col">Quản lý đơn hàng</div>
                                    <div class="col-auto">
                                        <i class="icon-arrow-thin down"></i>
                                    </div></div></a>
                            <div class="sub-navigation">
                                <a
                                    class="item-navigation active"
                                    title="Cập nhật địa chỉ"
                                    onClick={() => handleNav({ nav: "user/updateAddress" })}
                                    style={{ cursor: 'pointer' }}
                                ><div class="row">
                                        <div class="col-auto">
                                            <i class="fas fa-map-marker-alt"></i>
                                        </div>
                                        <div class="col">Cập nhật địa chỉ</div>
                                        <div class="col-auto">
                                            <i class="icon-arrow-thin right"></i>
                                        </div></div></a>
                                <a
                                    class="item-navigation"
                                    title="Thông tin đơn hàng"
                                    onClick={() => handleNav({ nav: "user/orderHistory" })}
                                    style={{ cursor: 'pointer' }}
                                ><div class="row">
                                        <div class="col-auto"><i class="fas fa-file-alt"></i></div>
                                        <div class="col">Thông tin đơn hàng</div>
                                        <div class="col-auto">
                                            <i class="icon-arrow-thin right"></i>
                                        </div></div></a>

                            </div>
                        </div>
                        <div class="item-navigation">
                            <a
                                class="item-navigation"
                                title="Đăng xuất"
                                style={{ cursor: 'pointer' }}
                                onClick={handleLogout}
                            ><div class="row">
                                    <div class="col-auto"><i class="fas fa-solid fa-right-from-bracket"></i></div>
                                    <div class="col">Đăng xuất</div>
                                    <div class="col-auto">
                                    </div></div></a>
                        </div>
                    </div>

                </div>
                <div class="now-detail-profile">
                    <div class="header-user-profile">Cập nhật địa chỉ</div>
                    <div class="content-user-profile">
                        <div class="table-account">
                            <div class="header">
                                <div class="row">
                                    <div class="col col-2">Họ tên</div>
                                    <div class="col col-5">Địa chỉ</div>
                                    <div class="col col-3">Số điện thoại</div>
                                    <div class="col col-2"></div>
                                </div>
                            </div>
                            <div class="table-account-body">
                                {contacts.map((contact) => (
                                    <div class="table-row">
                                        <div class="row">
                                            <div class="col col-2">Home</div>
                                            <div class="col col-5">{contact.address}</div>
                                            <div class="col col-3">{contact.phoneNumber}</div>
                                            <div class="col col-2 txt-center">
                                                <span style={{ backgroundColor: 'white' }} className="margin-05 link-button" variant="primary" onClick={() => handleShowModal(contact.address, contact.phoneNumber, 'update')}>
                                                    Sửa
                                                </span>
                                                <span class="margin-05 link-button" variant="danger" onClick={() => handleShowDeleteModal(contact._id)}>Xoá</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div class="table-row"><div class="row"></div></div>
                                <div class="table-row">
                                    <div class="row text-center">
                                        <div class="col-2 offset-10">
                                            <button className="btn btn-red text-uppercase btn-block" variant="primary" onClick={() =>
                                                handleShowModal(                                                   
                                                    '',
                                                    '', 
                                                    'add'
                                                )}>
                                                Thêm
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ModalUpdateAddress show={showModal} handleClose={handleCloseModal} phoneNumber1={phoneNumber} address1={address} action1 = {action}/>
            <DeleteConfirmationModal show={showDeleteModal} handleClose={handleCloseDeleteModal} id={itemToDelete} />
        </div>
    )
}

export default UpdateAddress