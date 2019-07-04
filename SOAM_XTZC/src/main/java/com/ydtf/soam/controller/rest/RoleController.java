package com.ydtf.soam.controller.rest;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.ModelMap;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSON;
import com.google.common.base.Function;
import com.google.common.collect.Lists;
import com.ydtf.soam.entity.db.xtzc_jszy;
import com.ydtf.soam.entity.db.xtzc_role;
import com.ydtf.soam.repository.JszyRepository;
import com.ydtf.soam.repository.RoleRepository;
import com.ydtf.soam.repository.YhjsgxRepository;
import com.ydtf.soam.system.base.contants.Constants;
import com.ydtf.soam.system.base.entity.PageEntity;
import com.ydtf.soam.system.base.entity.Result;
import com.ydtf.soam.system.base.entity.ResultEnum;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;

/**
 * 功能模块：系统支撑--》角色管理
 * 描      述：角色管理控制器
 * 文件名称：RoleController.java
 * 创建   人： 周艳平
 * 创建时间： 2016年10月17日10:51:06
 * 修改日志：
 */

@RestController
public class RoleController {
	@Autowired
	RoleRepository roleRepository;
	@Autowired
	JszyRepository jszyRepository;
	@Autowired
	YhjsgxRepository yhjsgxRepository;

	@ApiOperation(value = "查询角色详细信息", notes = "根据Id查询角色详细信息")
	@ApiImplicitParam(name = "roleId", value = "角色ID", required = true, paramType = "path", dataType = "Long")
	@RequestMapping(value = "/role/{roleId}", method = RequestMethod.GET)
	public Result<Object> queryrole( @PathVariable("roleId") Long roleId ) {
		xtzc_role role = roleRepository.findOne( roleId );
		return new Result<Object>( role );
	}

	@ApiOperation(value = "新增角色", notes = "同时新增角色资源关系表")
	@RequestMapping(value = "/role", method = RequestMethod.POST)
	@Transactional
	public Result<Object> addrole( @RequestBody ModelMap inData ) throws Exception {
		//获取数据
		xtzc_role role = JSON.parseObject( JSON.toJSONString( inData.get( "xtzc_role" ) ), xtzc_role.class );
		List<xtzc_jszy> jszys = JSON.parseArray( JSON.toJSONString( inData.get( "xtzc_jszy" ) ), xtzc_jszy.class );

		if( StringUtils.isEmpty( role.getJsmc() ) ) {
			throw new Exception( "角色名称不能为空。" );
		}
		role.setZt( Constants.ZT.YX );
		xtzc_role roletemp = roleRepository.save( role );

		//保存角色资源信息
		for( int i = 0; i < jszys.size(); i++ ) {
			if( StringUtils.isEmpty( jszys.get( i ).getZyid() ) ) {
				throw new Exception( "资源ID不能为空。" );
			}
			jszys.get( i ).setRoleid( roletemp.getRoleid() );
		}
		jszyRepository.save( jszys );

		return new Result<Object>( ResultEnum.OK );
	}

	@ApiOperation(value = "修改角色详细信息", notes = "同时修改角色资源关系表，整删，整添加")
	@RequestMapping(value = "/role/{roleId}", method = RequestMethod.POST)
	@Transactional
	public Result<Object> updaterole( @RequestBody ModelMap inData ) throws Exception {
		//获取数据
		xtzc_role role = JSON.parseObject( JSON.toJSONString( inData.get( "xtzc_role" ) ), xtzc_role.class );
		if( StringUtils.isEmpty( role.getRoleid() ) ) {
			throw new Exception( "角色ID不能为空。" );
		}
		List<xtzc_jszy> jszys = JSON.parseArray( JSON.toJSONString( inData.get( "xtzc_jszy" ) ), xtzc_jszy.class );
		if( jszys == null || jszys.size() == 0 ) {
			throw new Exception( "角色资源关系不能为空。" );
		}

		//删除已有关系
		List<Long> roleIds = new ArrayList<Long>();
		roleIds.add( role.getRoleid() );
		jszyRepository.deleteByRoleIdIn( roleIds );

		//添加新的关系
		for( int i = 0; i < jszys.size(); i++ ) {
			if( StringUtils.isEmpty( jszys.get( i ).getZyid() ) ) {
				throw new Exception( "资源ID不能为空。" );
			}
			jszys.get( i ).setRoleid( role.getRoleid() );
		}
		jszyRepository.save( jszys );

		//保存角色信息
		roleRepository.save( role );
		return new Result<Object>( ResultEnum.OK );
	}

	@ApiOperation(value = "批量删除角色", notes = "根据角色list，删除角色、资源角色关系、用户角色关系")
	@ApiImplicitParam(name = "roleId", value = "角色ID", required = true, paramType = "path", dataType = "Long")
	@RequestMapping(value = "/role/list", method = RequestMethod.DELETE)
	@Transactional
	public Result<Object> deleterole( @RequestBody List<xtzc_role> roles ) throws Exception {
		List<Long> roleIds = Lists.transform( roles, new Function<xtzc_role, Long>() {
			@Override
			public Long apply( xtzc_role t ) {
				return t.getRoleid();
			}
		} );
		//删除角色资源关系
		jszyRepository.deleteByRoleIdIn( roleIds );
		//删除用户角色关系
		yhjsgxRepository.deleteByRoleIdIn( roleIds );
		//删除角色
		roleRepository.deleteByRoleIdIn( roleIds );

		return new Result<Object>( ResultEnum.OK );
	}

	@ApiOperation(value = "查询所有角色")
	@RequestMapping(value = "/role/list", method = RequestMethod.GET)
	public Result<List<xtzc_role>> findrole() {
		List<xtzc_role> roles = roleRepository.findAll();
		Result<List<xtzc_role>> result = new Result<List<xtzc_role>>( roles );
		return result;
	}

	@ApiOperation(value = "根据条件查询角色")
	@RequestMapping(value = "/role/list", method = RequestMethod.POST)
	public Result<List<xtzc_role>> findrole( @RequestBody xtzc_role role ) throws InterruptedException {
		List<xtzc_role> roles = roleRepository.findAll( Example.of( role.removeEmpty() ) );
		Result<List<xtzc_role>> result = new Result<List<xtzc_role>>( roles );
		return result;
	}

	@ApiOperation(value = "根据条件分页查询角色")
	@RequestMapping(value = "/role/page", method = RequestMethod.POST)
	public Result<Page<xtzc_role>> findRolePage( @RequestBody PageEntity<xtzc_role> pageEntity ) {
		Page<xtzc_role> data = roleRepository.findAll( Example.of( pageEntity.getEntity().removeEmpty() ),
				pageEntity.getPageRequest() );
		Result<Page<xtzc_role>> result = new Result<Page<xtzc_role>>( data );
		return result;
	}
}
