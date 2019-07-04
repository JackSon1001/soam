package com.ydtf.soam.controller.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ydtf.soam.entity.db.xtzc_jszy;
import com.ydtf.soam.repository.JszyRepository;
import com.ydtf.soam.system.base.entity.PageEntity;
import com.ydtf.soam.system.base.entity.Result;
import com.ydtf.soam.system.base.entity.ResultEnum;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;

/**
 * 功能模块：系统支撑--》角色资源关系
 * 描      述：角色资源关系控制器
 * 文件名称：JszyController.java
 * 创建   人： 周艳平
 * 创建时间： 2016年10月17日10:51:06
 * 修改日志：
 */

@RestController
public class JszyController {
	@Autowired
	JszyRepository jszyRepository;

	@ApiOperation(value = "查询角色资源关系详细信息", notes = "根据Id查询角色资源关系详细信息")
	@ApiImplicitParam(name = "gxId", value = "关系ID", required = true, paramType = "path", dataType = "Long")
	@RequestMapping(value = "/jszy/{gxId}", method = RequestMethod.GET)
	public Result<xtzc_jszy> queryJszy( @PathVariable("gxId") Long gxId ) {
		xtzc_jszy jszy = jszyRepository.findOne( gxId );
		return new Result<xtzc_jszy>( jszy );
	}

	@ApiOperation(value = "新增角色资源关系")
	@RequestMapping(value = "/jszy", method = RequestMethod.POST)
	public Result<Object> addJszy( @RequestBody xtzc_jszy jszy ) throws Exception {
		if( jszy.getRoleid() == null || ("").equals( jszy.getRoleid() ) ) {
			throw new Exception( "角色编号不能为空。" );
		}
		if( jszy.getZyid() == null || ("").equals( jszy.getZyid() ) ) {
			throw new Exception( "资源ID不能为空。" );
		}
		jszyRepository.save( jszy );
		return new Result<Object>( ResultEnum.OK );
	}

	@ApiOperation(value = "修改角色资源关系详细信息", notes = "根据ID修改角色资源关系完整信息")
	@RequestMapping(value = "/jszy/{gxId}", method = RequestMethod.PUT)
	public Result<Object> updateJszy( @PathVariable("gxId") Long gxId, @RequestBody xtzc_jszy jszy ) {
		jszy.setGxid( gxId );
		jszyRepository.save( jszy );
		return new Result<Object>( ResultEnum.OK );
	}

	@ApiOperation(value = "根据角色资源关系ID删除角色资源关系")
	@ApiImplicitParam(name = "gxId", value = "角色资源关系ID", required = true, paramType = "path", dataType = "Long")
	@RequestMapping(value = "/jszy/{gxId}", method = RequestMethod.DELETE)
	public Result<Object> deleteJszyById( @PathVariable("gxId") Long gxId ) {
		boolean exists = jszyRepository.exists( gxId );
		if( exists ) {
			jszyRepository.delete( gxId );
			return new Result<Object>( 0, "ok", 1 );
		}
		else {
			return new Result<Object>( 0, "ok", 0 );
		}
	}

	@ApiOperation(value = "根据资源ID批量删除角色资源关系")
	@RequestMapping(value = "/jszy/list", method = RequestMethod.DELETE)
	public Result<Object> deletrJszys( @RequestBody List<xtzc_jszy> listJszy ) {
		jszyRepository.delete( listJszy );
		return new Result<Object>( ResultEnum.OK );
	}

	@ApiOperation(value = "查询所有角色资源关系")
	@RequestMapping(value = "/jszy/list", method = RequestMethod.GET)
	public Result<List<xtzc_jszy>> queryJszy() {
		List<xtzc_jszy> jszys = jszyRepository.findAll();
		Result<List<xtzc_jszy>> result = new Result<List<xtzc_jszy>>( jszys );
		return result;
	}

	@ApiOperation(value = "根据条件查询角色资源关系")
	@RequestMapping(value = "/jszy/list", method = RequestMethod.POST)
	public Result<List<xtzc_jszy>> queryJszy( @RequestBody xtzc_jszy jszy ) {
		List<xtzc_jszy> jszys = jszyRepository.findAll( Example.of( jszy ) );
		Result<List<xtzc_jszy>> result = new Result<List<xtzc_jszy>>( jszys );
		return result;
	}

	@ApiOperation(value = "根据条件分页查询角色资源关系")
	@RequestMapping(value = "/jszy/page", method = RequestMethod.POST)
	public Result<Page<xtzc_jszy>> queryJszyPage( @RequestBody PageEntity<xtzc_jszy> pageEntity ) {
		Page<xtzc_jszy> jszys = jszyRepository.findAll( Example.of( pageEntity.getEntity() ),
				pageEntity.getPageRequest() );
		Result<Page<xtzc_jszy>> result = new Result<Page<xtzc_jszy>>( jszys );
		return result;
	}

}
