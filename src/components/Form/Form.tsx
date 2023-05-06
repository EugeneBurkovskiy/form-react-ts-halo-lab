import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import FormContext, { initialContextValue } from './FormContext/FormContext';
import { IDoctorDataArrays, IRegister } from '../../types/types';

import {
  CustomInput,
  CustomSelect,
  Loading,
  genderArr,
  schema,
  selectApi,
  useFetchAll,
  useFilterOptions,
  findDoctorByName,
  CustomButton,
} from '.';

import classes from './Form.module.scss';

const Form = () => {
  const { data, loading, error } = useFetchAll<IDoctorDataArrays>(selectApi);
  const { formContextValues, setFormContextValues } = useContext(FormContext);
  const { options, doctors } = useFilterOptions(data, formContextValues);
  const [isFormSubmited, setIsFormSubmited] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<IRegister>({
    defaultValues: { ...initialContextValue.formContextValues },
    resolver: yupResolver(schema),
  });

  function onSubmit(data: IRegister) {
    setIsFormSubmited(true);
  }

  useEffect(() => {
    return () => {
      setIsFormSubmited(false);
      reset({ ...initialContextValue.formContextValues });
      setFormContextValues({ ...initialContextValue.formContextValues });
    };
  }, [isFormSubmited]);

  function handleChange() {
    const currentFormValues = watch();
    if (currentFormValues.doctor && doctors) {
      const currentDoctor = findDoctorByName(currentFormValues.doctor, doctors);
      if (currentDoctor) {
        reset({
          ...currentFormValues,
          specialty: currentDoctor.specialty,
          city: currentDoctor.city,
        });
      }
    }
    setFormContextValues({ ...currentFormValues });
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)} onChange={handleChange}>
      <CustomInput title="Name" name="name" type="text" register={register} error={errors.name} />
      <CustomInput
        title="Birthday Date"
        name="birthday"
        type="date"
        register={register}
        error={errors.birthday}
      />
      <CustomSelect
        title="Sex"
        name="sex"
        options={genderArr}
        register={register}
        error={errors.sex}
      />
      {(options && (
        <>
          <CustomSelect
            title="City"
            name="city"
            options={options.filteredCitiesOptions}
            register={register}
            error={errors.city}
          />
          <CustomSelect
            title="Doctor Specialty"
            name="specialty"
            options={options.filteredSpecialtiesOptions}
            register={register}
            error={errors.specialty}
          />
          <CustomSelect
            title="Doctor"
            name="doctor"
            options={options.filteredDoctorsOptions}
            register={register}
            error={errors.doctor}
          />
        </>
      )) ||
        (error && <div>Something wrong</div>) ||
        (loading && <Loading />)}
      <CustomInput
        title="Email"
        name="email"
        type="email"
        register={register}
        error={errors.email}
      />
      <CustomInput
        title="Mobile number"
        name="phone"
        type="phone"
        register={register}
        error={errors.phone}
      />
      <CustomButton title="Submit" />
    </form>
  );
};

export default Form;