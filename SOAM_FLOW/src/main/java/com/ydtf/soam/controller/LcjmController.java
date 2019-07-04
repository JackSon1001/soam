package com.ydtf.soam.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.google.common.base.Objects;
import com.google.common.collect.Lists;
import com.ydtf.soam.controller.client.XtzcClient;
import com.ydtf.soam.entity.db.flow_tmp_info;
import com.ydtf.soam.repository.TmpInfoRepository;
import com.ydtf.soam.system.base.entity.Result;
import com.ydtf.soam.system.base.entity.TreeNote;

import io.swagger.annotations.ApiOperation;

@RestController
public class LcjmController {

	@Autowired
	XtzcClient xtzcClient;

	@Autowired
	TmpInfoRepository tmpInfoRepository;
	
	@ApiOperation(value = "查询业务域Tree结构数据")
	@RequestMapping(value = "/ywy/tree", method = RequestMethod.POST)
	public Result<List<?>> queryYwyTree( @RequestBody ModelMap modelMap ) throws Exception {
		//获取所有业务域记录
		Result<List<?>> ywyList = xtzcClient.queryYwy(modelMap);
		if(ywyList==null){
			throw new Exception( "跨服务调用XTZC查询业务域错误。" );
		}
		List<?> lists = ywyList.getBody();
		if(lists==null) return new Result<List<?>>();
		
		//获取流程模板记录
		List<flow_tmp_info> tmpInfoList =  tmpInfoRepository.findAll();
		
		List<TreeNote> noteList = Lists.newArrayList();
		List<TreeNote> resultList = Lists.newArrayList();
		
		//构造根节点和noteList
		for( Object ywy : lists ) {
			TreeNote note = new TreeNote();
			
			String jsonStr = JSON.toJSONString(ywy);
			JSONObject jsonYwy = JSON.parseObject(jsonStr);
			
			note.setLabel("[业务域]" + jsonYwy.get("name").toString());
			note.setName(jsonYwy.get("ywid").toString());
			note.setInfo(ywy);
			noteList.add( note );

			if( StringUtils.isEmpty(jsonYwy.get("pid").toString()) ) {				
				//pid为空默认为根节点
				resultList.add(isGetLcmb(note, tmpInfoList) );
			}else {
				//pid不为空，查找pid所对应的org在list中是否存在，如果不存在也定为根节点
				boolean isTop = true;
				for( Object ywyParent : lists ) {
					JSONObject parentJson = JSON.parseObject(JSON.toJSONString(ywyParent));
					if( Objects.equal( jsonYwy.get("pid").toString(), parentJson.get("ywid").toString()) ) {
						isTop = false;
						break;
					}
				}
				if( isTop ) {
					resultList.add(isGetLcmb(note, tmpInfoList) );
				}
			}
		}
		
		//构造子节点
		//利用List<T>引用类型特性，构造List树
		for( TreeNote childrenNote : noteList ) {
			Object childrenOrg = childrenNote.getInfo();			
			JSONObject children = JSON.parseObject(JSON.toJSONString(childrenOrg));
			
			if( StringUtils.isEmpty( children.get("pid").toString() ) ) continue;
			for( TreeNote parentNote : noteList ) {
				Object parentOrg = parentNote.getInfo();
				JSONObject parent = JSON.parseObject(JSON.toJSONString(parentOrg));
				
				if( Objects.equal( children.get("pid").toString(), parent.get("ywid").toString()) ) {
					//判断是否存在流程模板
					parentNote.getChildren().add(isGetLcmb(childrenNote, tmpInfoList) );
				}
			}
		}		
		
		return new Result<List<?>>( resultList );
	}
	
	/**
	 * 获取流程模板
	 * 判断是否显示流程模板，并且存在流程模板则添加子节点
	 * @param childrenNote
	 * @param lcmbs
	 * @return
	 */
	public TreeNote isGetLcmb(TreeNote childrenNote, List<flow_tmp_info> tmpInfoList){
		for(int i=0; i<tmpInfoList.size(); i++){
			if(tmpInfoList.get(i).getYwid()!=null){
				if(childrenNote.getName().equals(tmpInfoList.get(i).getYwid().toString())){
					flow_tmp_info lcmbtemp = tmpInfoList.get(i);
					
					TreeNote lcmbNote = new TreeNote();
					lcmbNote.setLabel("[流程模板]"+ lcmbtemp.getName());
					lcmbNote.setName( lcmbtemp.getId().toString() );
					lcmbNote.setInfo( lcmbtemp );
					
					childrenNote.getChildren().add( lcmbNote );
				}
			}			
		}
		return childrenNote;
	}
}
