package com.ydtf.soam.controller.rest;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.ui.ModelMap;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSON;
import com.google.common.collect.Lists;
import com.ydtf.soam.entity.db.xtzc_user;
import com.ydtf.soam.entity.db.xtzc_yhjsgx;
import com.ydtf.soam.entity.db.xtzc_zy;
import com.ydtf.soam.repository.UserRepository;
import com.ydtf.soam.repository.YhjsgxRepository;
import com.ydtf.soam.repository.ZyRepository;
import com.ydtf.soam.system.base.entity.PageEntity;
import com.ydtf.soam.system.base.entity.Result;
import com.ydtf.soam.system.base.entity.ResultEnum;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;

@RestController
public class UserController {
	@Autowired
	UserRepository userRepository;
	@Autowired
	YhjsgxRepository yhjsRepository;
	@Autowired
	ZyRepository zyRepository;

	@ApiOperation(value = "获取用户详细信息", notes = "根据url的userid来获取用户详细信息")
	@ApiImplicitParam(name = "userid", value = "用户ID", required = true, paramType = "path", dataType = "Long")
	@RequestMapping(value = "/user/{userid}", method = RequestMethod.GET)
	public Result<xtzc_user> queryUser( @PathVariable("userid") Long userid ) {
		xtzc_user user = userRepository.findOne( userid );
		return new Result<xtzc_user>( user );
	}

	@ApiOperation(value = "新增用户")
	@RequestMapping(value = "/user", method = RequestMethod.POST)
	@Transactional
	public Result<Integer> addUser( @RequestBody ModelMap inData ) throws Exception {
		xtzc_user user = JSON.parseObject( JSON.toJSONString( inData.get( "xtzc_user" ) ), xtzc_user.class );
		List<xtzc_yhjsgx> nexus = JSON.parseArray( JSON.toJSONString( inData.get( "xtzc_yhjsgx" ) ), xtzc_yhjsgx.class );
		if( StringUtils.isEmpty( user.getYhm() ) ) {
			throw new Exception( "用户名不能为空" );
		}
		if( StringUtils.isEmpty( user.getYhmm() ) ) {
			throw new Exception( "用户密码不能为空" );
		}
		xtzc_user bean = userRepository.findByYhm( user.getYhm() );
		if( null != bean && null != bean.getUserid() ) {
			throw new Exception( "登录账号已存在" );
		}

		user.setUserid( null );
		xtzc_user result = userRepository.save( user );
		if(nexus.size() > 0){
			for( xtzc_yhjsgx po : nexus ) {
				po.setUserid( result.getUserid() );
			}
			yhjsRepository.save( nexus );
		}
		return new Result<Integer>( ResultEnum.OK );
	}

	@ApiOperation(value = "修改用户详细信息", notes = "根据url的id，修改用户完整信息")
	@RequestMapping(value = "/user/{userid}", method = RequestMethod.PUT)
	@Transactional
	public Result<Integer> updateUser( @PathVariable("userid") Long userid, @RequestBody ModelMap inData ) {
		xtzc_user user = JSON.parseObject( JSON.toJSONString( inData.get( "xtzc_user" ) ), xtzc_user.class );
		List<xtzc_yhjsgx> nexus = JSON.parseArray( JSON.toJSONString( inData.get( "xtzc_yhjsgx" ) ), xtzc_yhjsgx.class );
		user.setUserid( userid );
		userRepository.save( user );
		
		// 删除之前的用户角色关系
		List<Long> userIds = Lists.newArrayList();
		userIds.add( userid );
		yhjsRepository.deleteByUserIdIn( userIds );
		if(nexus.size() > 0){
			for( xtzc_yhjsgx po : nexus ) {
				po.setUserid( userid );
			}
			yhjsRepository.save( nexus );
		}
		return new Result<Integer>( ResultEnum.OK );
	}

	@ApiOperation(value = "根据用户ID删除用户")
	@ApiImplicitParam(name = "userid", value = "用户ID", required = true, paramType = "path", dataType = "Long")
	@RequestMapping(value = "/user/{userid}", method = RequestMethod.DELETE)
	@Transactional
	public Result<Integer> deleteUser( @PathVariable("userid") Long userid ) {
		boolean exists = userRepository.exists( userid );
		if( exists ) {
			userRepository.delete( userid );
			List<Long> userIds = Lists.newArrayList();
			userIds.add( userid );
			yhjsRepository.deleteByUserIdIn( userIds );
			return new Result<Integer>( ResultEnum.OK );
		}
		else {
			return new Result<Integer>( ResultEnum.ERROR );
		}
	}

	@ApiOperation(value = "根据多个用户ID删除用户")
	//@ApiImplicitParam(name = "users", value = "用户", required = true, paramType = "path", dataType = "Long")
	@RequestMapping(value = "/user/list", method = RequestMethod.DELETE)
	@Transactional
	public Result<Integer> deleteUsers( @RequestBody List<xtzc_user> users ) {
		if( null == users || users.size() < 1 ) {
			return new Result<Integer>( ResultEnum.OK );
		}
		List<Long> userIds = Lists.newArrayList();
		for( xtzc_user user : users ) {
			userIds.add( user.getUserid() );
		}
		userRepository.delete( users );
		yhjsRepository.deleteByUserIdIn( userIds );
		return new Result<Integer>( ResultEnum.OK );
	}

	@RequestMapping(value = "/user/login", method = RequestMethod.GET)
	public Result<xtzc_user> queryUser( @RequestParam("yhm") String yhm, @RequestParam("yhmm") String yhmm ) {
		xtzc_user user = userRepository.findByYhmAndYhmm( yhm, yhmm );
		Result<xtzc_user> result = new Result<xtzc_user>( user );
		return result;
	}

	@RequestMapping(value = "/user/list", method = RequestMethod.GET)
	public Result<List<xtzc_user>> findUser() {
		List<xtzc_user> users = userRepository.findAll();
		Result<List<xtzc_user>> result = new Result<List<xtzc_user>>( users );
		return result;
	}

	@RequestMapping(value = "/user/list", method = RequestMethod.POST)
	public Result<List<xtzc_user>> findUser( @RequestBody xtzc_user user ) {
		List<xtzc_user> users = userRepository.findAll( Example.of( user.removeEmpty() ) );
		Result<List<xtzc_user>> result = new Result<List<xtzc_user>>( users );
		return result;
	}

	@RequestMapping(value = "/user/page", method = RequestMethod.POST)
	public Result<Page<xtzc_user>> findUserPage( @RequestBody PageEntity<xtzc_user> pageEntity ) {
		Page<xtzc_user> data = userRepository.findAll( Example.of( pageEntity.getEntity().removeEmpty() ), pageEntity.getPageRequest() );
		Result<Page<xtzc_user>> result = new Result<Page<xtzc_user>>( data );
		return result;
	}

	@ApiOperation(value = "根据用户ID获取所拥有的资源")
	@RequestMapping(value = "/user/{userid}/zy", method = RequestMethod.GET)
	public Result<List<xtzc_zy>> queryZyByUserID( @PathVariable("userid") Long userId ) {
		List<xtzc_zy> data = zyRepository.selectByUserId( userId );
		return new Result<List<xtzc_zy>>( data );
	}

}
