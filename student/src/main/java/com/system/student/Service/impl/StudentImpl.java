package com.system.student.Service.impl;

import com.github.pagehelper.PageHelper;
import com.system.student.Service.StudentService;
import com.system.student.mapper.StudentMapper;
import com.system.student.model.Student;
import com.system.student.model.StudentExample;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentImpl implements StudentService {
    @Autowired
    private StudentMapper studentMapper;

    @Override
    public List<Student> findList(Integer pageSize, Integer pageNumber) {
        PageHelper.startPage(pageNumber, pageSize);
        return studentMapper.selectByExample(new StudentExample());
    }
}
