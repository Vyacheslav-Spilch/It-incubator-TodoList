import React, { useEffect } from 'react'
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
    rememberMe?: string
}

export const Login = () => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: ErrorsType = {}
            if(!values.email) {
                errors.email = 'Requered'
            } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Incorrect email address'
            }
            if(!values.password) {
                errors.password = 'Requered'
            } else if(values.password.length < 4) {
                errors.password = 'Should be mode 3 symbols'
            }
            return errors
        },
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2))
        },
    })

    let dispatch = useAppDispatch()
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
                        name='email'
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    {formik.errors.email && <div style={{color: 'red'}}>{formik.errors.email}</div>}
                    <TextField 
                        type="password" 
                        label="Password"
                        name='password'
                        onChange={formik.handleChange}
                        value={formik.values.password} 
                        margin="normal" 
                    />
                    {formik.errors.password && <div style={{color: 'red'}}>{formik.errors.email}</div>}
                    <FormControlLabel 
                        label={'Remember me'} 
                        control={
                            <Checkbox  
                                name='rememberMe'
                                onChange={formik.handleChange}
                                checked={formik.values.rememberMe}
                        />
                        } 
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