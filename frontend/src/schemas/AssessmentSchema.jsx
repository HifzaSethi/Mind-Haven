import * as Yup from 'yup';
const AssessmentSchema = Yup.object({
  academicPressure: Yup.string().required('This field is required'),
  workPressure: Yup.string().required('This field is required'),
  jobSatisfaction: Yup.string().required('This field is required'),
  sleepingHours: Yup.string().required('This field is required'),
  suicidalThoughts: Yup.string().required('This field is required'),
  financialStress: Yup.string().required('This field is required'),
  emotional: Yup.string().min(5).max(200).required('This field is required'),
  challenge: Yup.string().min(5).max(200).required('This field is required'),
  support: Yup.string().min(5).max(200).required('This field is required'),
});
export default AssessmentSchema;
