import './Authed.css';
import 'yup-phone';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LoginIcon from '@mui/icons-material/Login';
import BackIcon from '@mui/icons-material/ArrowBack';
import { useContext } from 'react';
import { AlertOnAppContext } from '../../Context/AlertOnAppContext';
import { UserAuthContext } from '../../Context/UserAuthContext';

export const Signup = props => {
  const { showAppAlert } = useContext(AlertOnAppContext);
  const [auth] = useContext(UserAuthContext);

  const userDetails = props.userDetails || false;
  const endpoint = userDetails ? 'update' : 'signup';
  const title = userDetails ? 'Update Profile' : 'Sign up';

  const setOpen = props.openState?.[1];
  const handleClose = () => setOpen && setOpen(false);

  const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
    passwordConfirmation: yup
      .string('Confirm your password')
      .required('Password confirmation is required')
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
    name: yup.string('Enter your name').required('Name is required'),
    phone: yup.string().phone('IL').required(),
  });

  const formik = useFormik({
    initialValues: {
      email: userDetails?.email || '',
      password: '',
      passwordConfirmation: '',
      name: userDetails?.name || '',
      phone: userDetails?.phone || '',
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      await sendToServer(values);
    },
  });

  const sendToServer = async values => {
    const options = {
      method: userDetails ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: auth?.token || '',
      },
      body: JSON.stringify(values),
    };
    try {
      const resp = await fetch(
        `http://localhost:4000/users/${endpoint}`,
        options
      );
      const payload = await resp.json();

      if (resp.ok && payload?.success) {
        const { data } = payload;
        showAppAlert(
          `Success: ${data?.message || 'action succeded'}`,
          'success'
        );
        handleClose();
      } else {
        const { error } = payload;
        showAppAlert(`Error: ${error || 'action failed'}`, 'error');
      }
    } catch (err) {
      showAppAlert('Error: Server not available', 'error');
    }
  };

  return (
    <div>
      <h1>{title}</h1>
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
        <TextField
          fullWidth
          id="passwordConfirmation"
          name="passwordConfirmation"
          label="Password Confirmation"
          type="password"
          value={formik.values.passwordConfirmation}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={
            formik.touched.passwordConfirmation &&
            Boolean(formik.errors.passwordConfirmation)
          }
          helperText={
            formik.touched.passwordConfirmation &&
            formik.errors.passwordConfirmation
          }
        />
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Name"
          value={formik.values.name}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          fullWidth
          id="phone"
          name="phone"
          label="Phone Number (IL)"
          value={formik.values.phone}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
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
            Submit
          </Button>
          {setOpen && (
            <Button
              color="error"
              variant="outlined"
              size="large"
              type="button"
              startIcon={<BackIcon />}
              onClick={handleClose}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};
