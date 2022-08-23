import React, { Component } from 'react';
import { Form } from '@widergy/utilitygo-forms-web';
import { Field } from 'redux-form';
import { any, shape, string, arrayOf } from 'prop-types';

import { DefaultMessages, Components } from './constants';

class UTForm extends Component {
  render() {
    const { form, fields, fieldValues, formClasses, fieldClasses } = this.props;
    return (
      <Form
        form={form}
        fields={fields}
        fieldValues={fieldValues}
        components={Components}
        defaultMessages={DefaultMessages}
        formClasses={formClasses}
        fieldClasses={fieldClasses}
        FieldComponent={Field}
      />
    );
  }
}

UTForm.propTypes = {
  form: any, // eslint-disable-line react/forbid-prop-types
  fields: any, // eslint-disable-line react/forbid-prop-types
  fieldValues: arrayOf(shape({ key: string })),
  formClasses: shape({ formContainer: string, formTitle: string, fieldRowContainer: string }),
  fieldClasses: shape({ container: string, comment: string, error: string })
};

export default UTForm;
