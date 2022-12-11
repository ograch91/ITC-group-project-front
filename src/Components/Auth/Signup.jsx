 import * as yup from 'yup';
 import { useFormik } from 'formik';
 import Button from '@mui/material/Button';
 import TextField from '@mui/material/TextField';
 import LoginIcon from '@mui/icons-material/Login';
 import BackIcon from '@mui/icons-material/ArrowBack';
 import 'yup-phone';
 import './Authed.css';
//  import { AuthModalContext } from '../AuthModalContext';
 import { useContext } from 'react';
 
 export const Signup = (props) => {
  //  const [open, setOpen] = useContext(AuthModalContext);
  //  const handleClose = () => setOpen(false);
  const userDetails = props.userDetails || false;
  
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
      alert(JSON.stringify(values));
     //  await sendToServer(values);
    },
  });

  const sendToServer = async values => {
   const options = {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(values),
   };
   const resp = await fetch('http://backend/users/login', options);
   if (resp.ok) {
     const data = (await resp.json())?.data;
     console.log('huuu');
     // setAuth({ ...auth, isAuth: true, token: data.token, user: data.user });

     // handleClose();
   }
  }
 
   return (
     <div>
       <h1>Sign Up</h1>
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
     </div>
   );
 };
 
 