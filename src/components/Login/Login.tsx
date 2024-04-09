import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useAppDispatch } from '../../state/store'
import { setAppStatusAC } from '../../state/app-reducer'
import { useFormik } from 'formik'

type ErrorsType = {
    email?: string 
    password?: string
}

export type LoginType = {
    email: string
    password: string
    rememberMe: boolean
}

export const Login = () => {
    let dispatch = useAppDispatch()


    enum ValidateDate {
        ERROR_MESSAGE = 'Requered field',
        MIN_LENGTH_PASSWORD = 5,
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: ErrorsType = {}
            if(!values.email) {
                errors.email = ValidateDate.ERROR_MESSAGE
            } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Incorrect email address'
            }
            
            if(!values.password) {
                errors.password = ValidateDate.ERROR_MESSAGE
            } else if(values.password.length < ValidateDate.MIN_LENGTH_PASSWORD) {
                errors.password = `Should be mode ${ValidateDate.MIN_LENGTH_PASSWORD} symbols`
            }
            return errors
        },
        onSubmit: (values) => {
            formik.resetForm()
        },
    })

    useEffect(() => {
        dispatch(setAppStatusAC('succeeded'))
    }, [])

    return (
    <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                    <p>
                        To log in get registered
                        <a href={'https://social-network.samuraijs.com/'} target={'_blank'}>
                        here
                        </a>
                    </p>
                    <p>or use common test account credentials:</p>
                    <p>Email: free@samuraijs.com</p>
                    <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                    <TextField 
                        label="Email" 
                        margin="normal" 
                        {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email && <div style={{color: 'red', fontSize: '15px'}}>{formik.errors.email}</div>}
                    <TextField 
                        type="password" 
                        label="Password"
                        margin="normal" 
                        {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password && <div style={{color: 'red', fontSize: '15px'}}>{formik.errors.password}</div>}
                    <FormControlLabel 
                        label={'Remember me'} 
                        control={<Checkbox 
                            {...formik.getFieldProps('rememberMe')}
                            checked={formik.values.rememberMe}
                            />} 
                    />
                    <Button 
                        type={'submit'} 
                        variant={'contained'} 
                        color={'primary'}
                    >
                        Login
                    </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
    )
}