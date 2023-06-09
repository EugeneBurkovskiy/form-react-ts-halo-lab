import React from 'react';
import { FieldError, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import InputMask from 'react-input-mask';

import FormFieldWrapper from '../../FormFieldWrapper/FormFieldWrapper';
import { masks, placeholders } from '../../../utils/input-utils';
import { IInputMasks, IInputPlaceholders, IRegister } from '../../../types/types';

import classes from './MaskedInput.module.scss';

interface IProps {
  title: string;
  name: keyof IRegister;
  register: UseFormRegister<IRegister>;
  error?: FieldError;
  setValue: UseFormSetValue<IRegister>;
}

const MaskedInput: React.FC<IProps> = ({ title, name, register, error, setValue }) => {
  const mask = name in masks ? masks[name as keyof IInputMasks] : '';
  const placeholder = name in placeholders ? placeholders[name as keyof IInputPlaceholders] : '';
  return (
    <FormFieldWrapper title={title} error={error}>
      <InputMask
        mask={mask}
        placeholder={placeholder}
        maskChar={null}
        type="text"
        id={name}
        className={
          (error && `${classes.field__input} ${classes.field__error}`) || classes.field__input
        }
        {...register(name)}
        onChange={(e) => setValue(name, e.target.value)}
      />
    </FormFieldWrapper>
  );
};

export default MaskedInput;
