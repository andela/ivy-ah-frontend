import * as Yup from 'yup';

const reportArticleSchema = Yup.object().shape({
  reason: Yup.string()
    .required('Reason is required')
    .max(200, 'Reason is too long')
    .min(3, 'Reason should contain minimum of 3 characters')

});

export default reportArticleSchema;
