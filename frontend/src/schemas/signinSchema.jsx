import * as yup from 'yup';
const SignInSchema = yup.object({
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
});

export default SignInSchema;
