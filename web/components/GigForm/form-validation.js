import { object, array, boolean, number, string } from 'yup';

export const schema = object().shape({
  categories: array(
    string().oneOf(['frontend', 'backend', 'design', 'documentation', 'other'])
  ).min(1, 'Please select at least one category'),
  disclaimerAgree: boolean().oneOf([true], 'Please select to agree').required(),
  estHours: number()
    .positive('Should be a positive integer')
    .integer('Should be a positive integer')
    .required('Please provide estimated hours'),
  experienceLevel: string().oneOf(['beginner', 'medium', 'pro']).required(),
  issueUrl: string()
    .url('URL is not valid')
    .matches(/github|gitlab/, 'Only GitHub and GitLab is supported')
    .required('Please provide Issue URL'),
  // .test('Unique', 'Issue URL must be unique', async (value) => {

  // }),
  paymentAgree: boolean().oneOf([true], 'Please select to agree').required(),
  price: number()
    .positive('Should be a positive integer')
    .integer('Should be a positive integer')
    .required('Please provide price in XTZ'),
  timeCommitment: string()
    .oneOf(['hours', 'days', 'weeks', 'months'])
    .required(),
});
