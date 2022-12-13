import * as yup from 'yup';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LoginIcon from '@mui/icons-material/Login';
import BackIcon from '@mui/icons-material/ArrowBack';
import './Authed.css';
import { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserAuthContext } from '../../Context/UserAuthContext';

export const Login = () => {
  const [auth, setAuth] = useContext(UserAuthContext);
  const [loged, setLoged] = useState(false);
  const navigate = useNavigate();

  const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
  });
  const sendToServer = async values => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    };
    const resp = await fetch('http://localhost:4000/users/login', options);
    if (resp.ok) {
      const data = (await resp.json())?.data;
      setAuth({ ...auth, isAuth: true, token: data.token, user: data.user });
      // setLoged(true);
      
      return navigate('/home', { replace: true });
    }
  };
 

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: sendToServer,
  });

  
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <div className="button-container">
          <Button
            className="submit-button"
            color="primary"
            variant="contained"
            type="submit"
            size="large"
            endIcon={<LoginIcon />}
          >
            Login
          </Button>
          <Button
            color="error"
            variant="outlined"
            size="large"
            type="submit"
            startIcon={<BackIcon />}
            //  onClick={handleClose}
          >
            Cancel
          </Button>
        </div>
      </form>
      {loged && <Navigate to="/home" />}
    </div>
  );
};
