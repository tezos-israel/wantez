import { object, array, boolean, number, string } from 'yup';

export const schema = object().shape({
  categories: array().of(
    string()
      .oneOf(['frontend', 'backend', 'design', 'documentation', 'other'])
      .min(1)
  ),
  disclaimerAgree: boolean().oneOf([true]).required(),
  estHours: number().positive().integer().required(),
  experienceLevel: string().oneOf(['beginner', 'medium', 'pro']).required(),
  issueUrl: string()
    .url()
    .matches(/github|gitlab/)
    .required(),
  paymentAgree: boolean().oneOf([true]).required(),
  price: number().positive().integer().required(),
  timeCommitment: string()
    .oneOf(['hours', 'days', 'weeks', 'months'])
    .required(),
});
