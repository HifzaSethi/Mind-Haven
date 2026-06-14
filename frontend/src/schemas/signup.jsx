import * as yup from 'yup';
const SignUpSchemas = yup.object({
  name: yup.string().min(3).max(25).required('Please enter your name'),
  age: yup.number().min(10).max(100).required('Please enter your age'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=(?:.*[a-zA-Z]){2,})(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).+$/,
      'Password must contain at least two letters and one special character'
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
  trustedEmail: yup
    .string()
    .email('Please enter a valid email')
    .required('Trusted email is required'),
});

export default SignUpSchemas;
