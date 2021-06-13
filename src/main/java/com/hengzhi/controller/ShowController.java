package com.hengzhi.controller;

import com.alibaba.fastjson.JSONObject;
import com.hengzhi.entity.Message;
import com.hengzhi.secutity.Security;
import com.hengzhi.service.GeneralManagerService;
import com.hengzhi.service.ManagerPaperService;
import com.hengzhi.service.ShowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequestMapping("/show")
@Controller
public class ShowController {
    @Autowired
    ShowService showService;
    @RequestMapping("/showMessages")
    @ResponseBody
    @Security(false)
    public Map showMessages(@RequestBody JSONObject jsonObject){
        Integer page = jsonObject.getInteger("page");
        Integer size = jsonObject.getInteger("size");
        Map map = new HashMap();
        List<Message> list = showService.selectThroughMes(page,size);
        map.put("listMessage",list);
        Integer TotalNumber = showService.selectCountThroughMes();
        map.put("TotalNumber",TotalNumber);
        if(TotalNumber<size){
            map.put("pagesSize",1);
        } else if(TotalNumber%size==0){
            map.put("pagesSize",TotalNumber/size);
        }else {
            map.put("pagesSize",TotalNumber/size+1);
        }
        return map;
    }
    @RequestMapping("/addMessages")
    @ResponseBody
    @Security(false)
    public void addMessages(@RequestBody JSONObject jsonObject) {
        String content=jsonObject.getString("content");

    }
    
    }

