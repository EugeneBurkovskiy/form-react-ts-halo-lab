import { useMemo } from 'react';

import { IDoctorDataArrays } from 'types/types';

import { IRegister } from '../types/types';

import compareDoctorsParams from '../utils/compareDoctorsParams';
import Filter from '../utils/Filter';
import filterOptions from '../utils/createOptions';

function useFilterOptions(data: IDoctorDataArrays | undefined, values: IRegister) {
  const comparedDoctors = useMemo(
    () => data && compareDoctorsParams(data.city, data.specialty, data.doctor),
    [data]
  );

  const filteredOptions = useMemo(() => {
    if (comparedDoctors) {
      const filterCase = new Filter(comparedDoctors, values);
      filterCase.filterByCity().filterByGender().filterBySpecialty();
      return filterOptions(filterCase.doctors, filterCase.cities, filterCase.specialties);
    }
  }, [comparedDoctors, values]);

  return { options: filteredOptions, doctors: comparedDoctors };
}

export default useFilterOptions;