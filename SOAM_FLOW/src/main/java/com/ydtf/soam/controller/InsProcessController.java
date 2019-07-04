package com.ydtf.soam.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ydtf.soam.entity.db.flow_ins_process;
import com.ydtf.soam.repository.InsProcessRepository;
import com.ydtf.soam.system.base.entity.PageEntity;
import com.ydtf.soam.system.base.entity.Result;

import io.swagger.annotations.ApiOperation; 

@RestController
public class InsProcessController {
	
	@Autowired
	InsProcessRepository insProcessRepository;
	
	@ApiOperation(value = "条件查询流程数据")
	@RequestMapping(value = "/process/list", method = RequestMethod.POST)
	public Result<List<flow_ins_process>> findIns( @RequestBody flow_ins_process ins ) {
		List<flow_ins_process> inss = insProcessRepository.findAll( Example.of( ins.removeEmpty() ) );
		Result<List<flow_ins_process>> result = new Result<List<flow_ins_process>>( inss );
		return result;
	}

	@ApiOperation(value = "根据条件分页查询流程数据")
	@RequestMapping(value = "/process/page", method = RequestMethod.POST)
	public Result<?> queryProcessPage( @RequestBody PageEntity<flow_ins_process> pageEntity ) {		
		//判断是否分页
		if(!StringUtils.isEmpty(pageEntity.pageSize)){
			Page<flow_ins_process> data = insProcessRepository.findAll(Example.of( pageEntity.getEntity().removeEmpty() ),
					pageEntity.getPageRequest() );
			Result<Page<flow_ins_process>> result = new Result<Page<flow_ins_process>>( data );
			return result;
		}else{
			List<flow_ins_process> inss = insProcessRepository.findAll( Example.of( pageEntity.queryParams.removeEmpty() ) );
			Result<List<flow_ins_process>> result = new Result<List<flow_ins_process>>( inss );
			return result;
		}
	}
	
}
