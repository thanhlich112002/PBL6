import React, { useState, useRef, } from 'react';
import { Box, } from "@mui/material";
import Header from "../../compenents/Header/Header";

import * as yup from "yup";
import { Formik, Form } from "formik";
import { Button, TextField, Select, MenuItem } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from 'axios';
import NativeSelect from '@mui/material/NativeSelect';


function Add({ data, setOpenAdd }) {
    const fileInputRef = useRef();

    const [imgLink, setimgLink] = useState("https://res.cloudinary.com/drk3oaeza/image/upload/v1697438641/default_images_pbl6/bbyyaztptndruabkylii.png");
    const [img, setimg] = useState(null);
    const token = localStorage.getItem('autoken');
    const _id = localStorage.getItem('_id');
    const [category, setCategory] = useState("");
    const [selectActive, setSelectActive] = useState(false);
    const api = `https://falth.vercel.app/api/product/store/${_id}?limit=100`;
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const initialValues = {
        name: "",
        price: "",
        description: "",
        contact: "",
    };
    const checkoutSchema = yup.object().shape({
        name: yup.string().required("required"),
        price: yup.string().required("required"),
        description: yup.string().required("required"),
    });
    const formRef = useRef();

    const Addproduct = async (json) => {
        try {
            await axios.post(`https://falth.vercel.app/api/product/store/${_id}`, json, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            console.log(error);
        }
        finally {
            setOpenAdd(false);
        }
    };
    return (
        <div>
            <div>
                <Header title="Thêm sản phẩm" subtitle="thêm sản phẩm mới" />
                <Formik
                    onSubmit={(values) => {
                        const tenSanPham = values.name;
                        const giaTien = values.price;
                        const moTa = values.description;
                        const danhMuc = category;
                        const images = img

                        const json = {
                            "catName": danhMuc,
                            "name": tenSanPham,
                            "images": img,
                            "price": 10000,
                            "description": moTa,
                        }
                        Addproduct(json);
                        console.log(json);

                    }}
                    initialValues={initialValues}
                    validationSchema={checkoutSchema}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                    }) => (
                        <Form ref={formRef}>
                            <Box
                                display="grid"
                                gap="30px"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr)"
                                sx={{
                                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                                }}
                            >
                                <Box display="flex" justifyContent="center" alignItems="center" sx={{ gridColumn: "span 4" }}>
                                    <Box >

                                        <img
                                            src={imgLink}
                                            style={{
                                                cursor: "pointer",
                                                borderRadius: "50%",
                                                width: "100px",
                                                height: "100px"
                                            }}
                                            onClick={() => document.querySelector('.input-field').click()}
                                        />
                                        <input type="file" accept='image/*' hidden className='input-field'
                                            onChange={({ target: { files } }) => {
                                                if (files) {
                                                    setimg((files[0]))
                                                    setimgLink(URL.createObjectURL(files[0]))
                                                }
                                            }} />
                                    </Box>

                                </Box>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Tên sản phẩm"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    name="name"
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Giá tiền"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    name="price"
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Mô tả"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    name="description"
                                    sx={{ gridColumn: "span 4" }}
                                />
                                <NativeSelect
                                    sx={{ gridColumn: "span 4" }}
                                    name="category"
                                    value={category}
                                    onBlur={(e) => setCategory(e.target.value)}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    {data.map((option, index) => {
                                        return (
                                            <option value={option.catName}>{option.catName}</option>
                                        );
                                    })}
                                </NativeSelect>
                            </Box>
                            <Box display="flex" justifyContent="end" mt="20px">
                                <Button type="submit" color="secondary" variant="contained">
                                    Thêm mới
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </div>
        </div >
    )
}

export default Add
