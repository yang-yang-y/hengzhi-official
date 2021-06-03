package com.hengzhi.service;

import com.hengzhi.entity.Message;

import java.util.List;

public interface GeneralManagerService {
    /*
   返回未审核的留言列表
    */
    public List<Message> selectUnExamMeg(int page,int size);

    /*
    返回未审核的留言数目
     */
    public Integer SelectCountUnExam();
}
