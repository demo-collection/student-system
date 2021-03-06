import React, { FC } from 'react';
import LayoutContainer from '../../components/LayoutContainer';
import StudentForm from '@src/components/StudentForm';
import { FormType } from '@src/consts';

const AddStudent: FC = () => {
  return (
    <div>
      <h2>学生信息管理系统 - 添加学生信息</h2>
      <hr />
      <LayoutContainer>
        <StudentForm userType={FormType.add} />
      </LayoutContainer>
    </div>
  );
};

export default AddStudent;
