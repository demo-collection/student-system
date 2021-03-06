package com.system.student.controller;

import com.system.student.Service.StudentService;
import com.system.student.common.api.CommonResult;
import com.system.student.model.Student;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/api/student")
public class StudentController {
    @Autowired
    private StudentService studentService;

    /**
     * 列表查询
     * @param pageNumber
     * @param pageSize
     * @return
     */
    @GetMapping("/list")
    public CommonResult<List<Student>> findList(
            @RequestParam(value = "query", defaultValue = "") String query,
            @RequestParam(value = "pageNumber", defaultValue = "1") Integer pageNumber,
            @RequestParam(value = "pageSie", defaultValue = "500") Integer pageSize
    ) {
        if (query.equals("")) {
            return CommonResult.success(studentService.findList(pageSize, pageNumber));
        } else {
            return CommonResult.success(studentService.findListByQuery(query, pageSize, pageNumber));
        }
    }

    /**
     * 创建学生信息
     * @param student
     * @return
     */
    @PostMapping("/create")
    public CommonResult<Boolean> create(@RequestBody Student student) {
        Student findStudent = studentService.getStudentByNumber(student.getNumber());
        if (findStudent != null) return CommonResult.failed("当前学生已存在");
        Integer createCount = studentService.createStudent(student);
        if (createCount != 0) return CommonResult.success(true, "新建学生成功");
        return CommonResult.failed("新建学生失败");
    }

    /**
     * 删除学生信息
     * @param id
     * @return
     */
    @DeleteMapping("/{id}")
    public CommonResult<Boolean> delete(@PathVariable Long id) {
        Integer count = studentService.deleteById(id);
        if (count != 0) return CommonResult.success(true, "删除成功");
        return CommonResult.failed("删除学生信息失败");
    }

    /**
     * 更新学生信息
     * @param id
     * @param student
     * @return
     */
    @PutMapping("/{id}")
    public CommonResult<Boolean> put(@PathVariable Long id, @RequestBody Student student) {
        Student newStudent = new Student();
        BeanUtils.copyProperties(student, newStudent);
        newStudent.setId(id);
        Integer count = studentService.update(newStudent);
        if (count != 0) return CommonResult.success(true, "更新学生信息成功");
        return CommonResult.failed("更新学生信息失败");
    }
}
