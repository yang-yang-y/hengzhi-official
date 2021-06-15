package com.hengzhi.service.impl;

import com.hengzhi.dao.SuperManagerDao;
import com.hengzhi.dao.UserDao;
import com.hengzhi.dto.userBasic.UserInfo;
import com.hengzhi.entity.User;
import com.hengzhi.service.SuperManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SuperManagerServiceImpl implements SuperManagerService {

    @Autowired
    SuperManagerDao superManagerDao;
    @Autowired
    UserDao userDao;
    @Override
    public String addAdmin(int userId){
      UserInfo user=userDao.getUserInfo(userId);
      String role=user.getPower();
      if(role.equals("admin")) return "already";
      else {
          superManagerDao.addAdmin(userId);
          return "success";
      }
    }

    @Override
    public String deleteAdmin(int userId){
        UserInfo user=userDao.getUserInfo(userId);
        String role=user.getPower();
        if(!role.equals("admin")) return "not yet";
        else {
            superManagerDao.deleteAdmin(userId);
            return "success";
        }
    }
    @Override
    public List findList(){
        return superManagerDao.findList();
    }
    @Override
    public int findListNum(){
        return superManagerDao.findListNum();
    }
    @Override
    public String updatePassword(int userId){
       User user=userDao.selectUserByUserId(userId);
       if(user.getRequired().equals("0")) return "error";
       else {
           superManagerDao.updatePassword(userId,user.getRequired());
           return "success";
       }

    }
}
