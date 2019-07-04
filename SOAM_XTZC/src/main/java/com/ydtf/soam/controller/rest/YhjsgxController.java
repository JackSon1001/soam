package com.ydtf.soam.controller.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ydtf.soam.entity.db.xtzc_yhjsgx;
import com.ydtf.soam.repository.YhjsgxRepository;
import com.ydtf.soam.system.base.entity.Result;

import io.swagger.annotations.ApiOperation;

@RestController
public class YhjsgxController {
	@Autowired
	YhjsgxRepository yhjsRepository;

	@ApiOperation(value = "查询所有用户角色关系")
	@RequestMapping(value = "/yhjsgx/list", method = RequestMethod.GET)
	public Result<List<xtzc_yhjsgx>> findorg() {
		List<xtzc_yhjsgx> orgs = yhjsRepository.findAll();
		Result<List<xtzc_yhjsgx>> result = new Result<List<xtzc_yhjsgx>>( orgs );
		return result;
	}

	@ApiOperation(value = "根据条件查询用户角色关系")
	@RequestMapping(value = "/yhjsgx/list", method = RequestMethod.POST)
	public Result<List<xtzc_yhjsgx>> findorg( @RequestBody xtzc_yhjsgx org ) {
		List<xtzc_yhjsgx> orgs = yhjsRepository.findAll( Example.of( org ) );
		Result<List<xtzc_yhjsgx>> result = new Result<List<xtzc_yhjsgx>>( orgs );
		return result;
	}

}
