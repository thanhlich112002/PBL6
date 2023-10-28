import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from "../../theme";
import Header from "../../compenents/Header/Header";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { Button, TextField, Select, MenuItem } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from 'axios';
import NativeSelect from '@mui/material/NativeSelect';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Sdata from '../../components/Sdata';
import { withEmotionCache } from '@emotion/react';

function Delete({ selectedRow, setOpenDelete }) {
    console.log(selectedRow);
    const token = localStorage.getItem('autoken');
    const _id = localStorage.getItem('_id');
    const api = `https://falth.vercel.app/api/product/store/${_id}?limit=100`;
    const handleDeleteProduct = async (id) => {
        try {
            await axios.delete(`https://falth.vercel.app/api/product/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(id);
        } catch (error) {
            console.log(error);
        }
        finally {
            setOpenDelete(false);
        }
    };
    const [selectActive, setSelectActive] = useState(false);
    const formRef = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (formRef.current && !formRef.current.contains(e.target) && !selectActive) {
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [selectActive]);
    return (
        <div>
            <Box>
                <div>
                    <Header title={`Bạn muốn xóa sản phẩm: ${selectedRow.name}`} subtitle={`ID: ${selectedRow._id}`} />
                    <Formik
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
                                <Box display="flex" justifyContent="center" mt="20px" gap='20px'>
                                    <Button color="secondary" variant="contained" onClick={() => handleDeleteProduct(selectedRow._id)}>
                                        Xóa sản phẩm
                                    </Button>
                                    <Button color="secondary" variant="contained" onClick={() => setOpenDelete(false)}>
                                        Thoát
                                    </Button>
                                </Box>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Box>
        </div>
    )
}

export default Delete
