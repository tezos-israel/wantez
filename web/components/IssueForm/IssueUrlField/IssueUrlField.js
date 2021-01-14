import PropTypes from 'prop-types';
import classnames from 'classnames';

import { FieldGroup } from 'components/shared/FieldGroup';
import { FormField } from 'components/shared/FormField';

import { useUniqueURLValidation } from './useUniqueURLValidation';

export function IssueUrlField({
  value,
  error: validationError,
  touched,
  onBlur,
  onChange,
}) {
  const [
    isUniqueURL,
    isValidatingURL,
    errorValidatingURL,
  ] = useUniqueURLValidation(value);

  const error = getError({
    isUniqueURL,
    isValidatingURL,
    errorValidatingURL,
    validationError,
    touched,
  });

  return (
    <FieldGroup
      renderTitle={(className) => (
        <label htmlFor="url-input" className={className}>
          Issue Url
        </label>
      )}
    >
      <FormField error={error}>
        <input
          type="text"
          name="issueUrl"
          id="url-input"
          className={classnames('border border-gray-500 rounded-none w-full', {
            'border-red-500': error,
          })}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          value={value}
        />
      </FormField>
    </FieldGroup>
  );
}

function getError({
  isUniqueURL,
  errorValidatingURL,
  isValidatingURL,
  touched,
  validationError,
}) {
  if (isValidatingURL) {
    return 'Validating URL';
  }

  if (errorValidatingURL) {
    return 'Failed checking for unique URL';
  }

  if (touched) {
    return validationError;
  }

  if (!isUniqueURL) {
    return 'URL should be unique';
  }
}

IssueUrlField.propTypes = {
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  touched: PropTypes.bool,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};
