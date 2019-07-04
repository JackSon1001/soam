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
import com.google.common.base.Objects;
import com.google.common.collect.Lists;
import com.ydtf.soam.entity.db.xtzc_ywy;
import com.ydtf.soam.repository.YwyRepository;
import com.ydtf.soam.system.base.contants.Constants;
import com.ydtf.soam.system.base.entity.PageEntity;
import com.ydtf.soam.system.base.entity.Result;
import com.ydtf.soam.system.base.entity.ResultEnum;
import com.ydtf.soam.system.base.entity.TreeNote;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;

/**
 * 功能模块：系统支撑--》业务域管理
 * 描      述：业务域管理控制器
 * 文件名称：YwyController.java
 * 创建   人： 周艳平
 * 创建时间： 2016年10月26日14:38:52
 * 修改日志：
 */

@RestController
public class YwyController {

	@Autowired
	YwyRepository ywyRepository;

	@ApiOperation(value = "查询业务域详细信息", notes = "根据业务ID查询业务域详细信息")
	@ApiImplicitParam(name = "ywId", value = "业务ID", required = true, paramType = "path", dataType = "Long")
	@RequestMapping(value = "/ywy/{ywId}", method = RequestMethod.GET)
	public Result<xtzc_ywy> queryYwyByID( @PathVariable("ywId") Long ywId ) {
		xtzc_ywy ywy = ywyRepository.findOne( ywId );
		return new Result<xtzc_ywy>( ywy );
	}

	@ApiOperation(value = "新增业务域", notes = "新增业务域")
	@RequestMapping(value = "/ywy", method = RequestMethod.POST)
	@Transactional
	public Result<Object> addYwy( @RequestBody ModelMap inData ) throws Exception {
		//获取数据
		xtzc_ywy ywy = JSON.parseObject( JSON.toJSONString( inData.get( "xtzc_ywy" ) ), xtzc_ywy.class );

		//保存业务域信息
		if( StringUtils.isEmpty( ywy.getName() ) ) {
			throw new Exception( "业务名称不能为空。" );
		}
		ywy.setYwid( null );
		ywy.setZt( Constants.ZT.YX );//1有效 2无效
		ywyRepository.save( ywy );

		return new Result<Object>( ResultEnum.OK );
	}

	@ApiOperation(value = "修改业务域详细信息", notes = "")
	@RequestMapping(value = "/ywy/{ywId}", method = RequestMethod.POST)
	@Transactional
	public Result<Object> updateYwy( @RequestBody ModelMap inData ) throws Exception {
		//获取数据
		xtzc_ywy ywy = JSON.parseObject( JSON.toJSONString( inData.get( "xtzc_ywy" ) ), xtzc_ywy.class );
		if( StringUtils.isEmpty( ywy.getYwid() ) ) {
			throw new Exception( "业务域ID不能为空。" );
		}
		if( StringUtils.isEmpty( ywy.getName() ) ) {
			throw new Exception( "业务名称不能为空。" );
		}

		List<Long> ywIds = new ArrayList<Long>();
		ywIds.add( ywy.getYwid() );

		//判断是否存在下级
		if( Constants.ZT.WX == ywy.getZt() ) {
			List<xtzc_ywy> tempywys = ywyRepository.selectByPIdIn( ywIds );
			if( tempywys.size() > 0 ) {
				throw new Exception( "该业务域中存在下级业务，不可修改无效。" );
			}
		}

		//保存业务域信息
		ywyRepository.save( ywy );
		return new Result<Object>( ResultEnum.OK );
	}

	@ApiOperation(value = "根据业务ID删除业务域信息")
	@ApiImplicitParam(name = "ywId", value = "业务ID", required = true, paramType = "path", dataType = "Long")
	@RequestMapping(value = "/ywy/{ywId}", method = RequestMethod.DELETE)
	public Result<Object> deleteYwyByID( @PathVariable("ywId") Long ywId ) {
		boolean exists = ywyRepository.exists( ywId );
		if( exists ) {
			ywyRepository.delete( ywId );
			return new Result<Object>( 0, "ok", 1 );
		}
		else {
			return new Result<Object>( 0, "ok", 0 );
		}
	}

	@ApiOperation(value = "批量删除业务域信息", notes = "")
	@RequestMapping(value = "/ywy/list", method = RequestMethod.DELETE)
	@Transactional
	public Result<Object> deletrYwys( @RequestBody List<xtzc_ywy> ywys ) throws Exception {
		List<Long> ywIds = Lists.transform( ywys, new Function<xtzc_ywy, Long>() {
			@Override
			public Long apply( xtzc_ywy t ) {
				return t.getYwid();
			}
		} );

		//判断是否存在下级
		List<xtzc_ywy> tempywys = ywyRepository.selectByPIdIn( ywIds );
		if( tempywys.size() > 0 ) {
			throw new Exception( "删除业务域中存在下级业务，不可删除。" );
		}

		ywyRepository.deleteByYwIdIn( ywIds );
		return new Result<Object>( ResultEnum.OK );
	}

	@ApiOperation(value = "查询所有业务域信息")
	@RequestMapping(value = "/ywy/list", method = RequestMethod.GET)
	public Result<List<xtzc_ywy>> queryYwy() {
		List<xtzc_ywy> ywys = ywyRepository.findAll();
		Result<List<xtzc_ywy>> result = new Result<List<xtzc_ywy>>( ywys );
		return result;
	}

	@ApiOperation(value = "根据条件查询业务域信息")
	@RequestMapping(value = "/ywy/list", method = RequestMethod.POST)
	public Result<List<xtzc_ywy>> queryYwy( @RequestBody xtzc_ywy ywy ) {
		List<xtzc_ywy> ywys = ywyRepository.findAll( Example.of( ywy.removeEmpty() ) );
		Result<List<xtzc_ywy>> result = new Result<List<xtzc_ywy>>( ywys );
		return result;
	}

	@ApiOperation(value = "根据条件分页查询业务域")
	@RequestMapping(value = "/ywy/page", method = RequestMethod.POST)
	public Result<Page<xtzc_ywy>> queryYwyPage( @RequestBody PageEntity<xtzc_ywy> pageEntity ) {
		Page<xtzc_ywy> data = ywyRepository.findAll( Example.of( pageEntity.getEntity().removeEmpty() ),
				pageEntity.getPageRequest() );
		Result<Page<xtzc_ywy>> result = new Result<Page<xtzc_ywy>>( data );
		return result;
	}

	@ApiOperation(value = "查询业务域Tree结构数据")
	@RequestMapping(value = "/ywy/tree", method = RequestMethod.POST)
	public Result<List<?>> queryYwyTree( @RequestBody xtzc_ywy ywy ) {
		List<xtzc_ywy> allData = ywyRepository.findAll( Example.of( ywy.removeEmpty() ) );
		if( allData.size() < 1 ) return new Result<List<?>>( allData );

		List<TreeNote> noteList = Lists.newArrayList();
		List<TreeNote> resultList = Lists.newArrayList();

		//构造根节点和noteList
		for( xtzc_ywy org : allData ) {
			TreeNote note = new TreeNote();
			note.setLabel( org.getName() );
			note.setName( org.getYwid().toString() );
			note.setInfo( org );
			noteList.add( note );

			if( StringUtils.isEmpty( org.getPid() ) ) {
				//pid为空默认为根节点
				resultList.add( note );
			}
			else {
				//pid不为空，查找pid所对应的org在list中是否存在，如果不存在也定为根节点
				boolean isTop = true;
				for( xtzc_ywy parentOrg : allData ) {
					if( Objects.equal( org.getPid(), parentOrg.getYwid() ) ) {
						isTop = false;
						break;
					}
				}
				if( isTop ) {
					resultList.add( note );
				}
			}
		}

		//构造子节点
		//利用List<T>引用类型特性，构造List树
		for( TreeNote childrenNote : noteList ) {
			xtzc_ywy childrenOrg = (xtzc_ywy) childrenNote.getInfo();
			if( StringUtils.isEmpty( childrenOrg.getPid() ) ) continue;
			for( TreeNote parentNote : noteList ) {
				xtzc_ywy parentOrg = (xtzc_ywy) parentNote.getInfo();
				if( Objects.equal( childrenOrg.getPid(), parentOrg.getYwid() ) ) {
					parentNote.getChildren().add( childrenNote );
				}
			}
		}

		return new Result<List<?>>( resultList );
	}

}
