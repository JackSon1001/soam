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
import com.ydtf.soam.entity.db.xtzc_jszy;
import com.ydtf.soam.entity.db.xtzc_zy;
import com.ydtf.soam.repository.JszyRepository;
import com.ydtf.soam.repository.ZyRepository;
import com.ydtf.soam.system.base.contants.Constants;
import com.ydtf.soam.system.base.entity.PageEntity;
import com.ydtf.soam.system.base.entity.Result;
import com.ydtf.soam.system.base.entity.ResultEnum;
import com.ydtf.soam.system.base.entity.TreeNote;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;

/**
 * 功能模块：系统支撑--》资源管理
 * 描      述：资源管理控制器
 * 文件名称：ZyController.java
 * 创建   人： 周艳平
 * 创建时间： 2016年10月17日10:51:06
 * 修改日志：
 */

@RestController
public class ZyController {

	@Autowired
	JszyRepository jszyRepository;

	@Autowired
	ZyRepository zyRepository;

	@ApiOperation(value = "查询资源详细信息", notes = "根据资源ID查询资源详细信息")
	@ApiImplicitParam(name = "zyId", value = "资源ID", required = true, paramType = "path", dataType = "Long")
	@RequestMapping(value = "/zy/{zyId}", method = RequestMethod.GET)
	public Result<xtzc_zy> queryZyByID( @PathVariable("zyId") Long zyId ) {
		xtzc_zy zy = zyRepository.findOne( zyId );
		return new Result<xtzc_zy>( zy );
	}

	@ApiOperation(value = "新增资源", notes = "新增资源，同时添加角色资源关系表")
	@RequestMapping(value = "/zy", method = RequestMethod.POST)
	@Transactional
	public Result<Object> addZy( @RequestBody ModelMap inData ) throws Exception {
		//获取数据
		xtzc_zy zy = JSON.parseObject( JSON.toJSONString( inData.get( "xtzc_zy" ) ), xtzc_zy.class );
		List<xtzc_jszy> jszys = JSON.parseArray( JSON.toJSONString( inData.get( "xtzc_jszy" ) ), xtzc_jszy.class );
		//保存资源信息
		if( StringUtils.isEmpty( zy.getZymc() ) ) {
			throw new Exception( "资源名称不能为空。" );
		}
		if( StringUtils.isEmpty( zy.getZylb() ) ) {
			throw new Exception( "资源类别不能为空。" );
		}
		if( StringUtils.isEmpty( zy.getWjbz() ) ) {
			throw new Exception( "模版或URL不能为空。" );
		}
		zy.setZyid( null );
		zy.setZt( Constants.ZT.YX );//1有效 2无效
		xtzc_zy rzy = zyRepository.save( zy );

		//保存角色资源信息
		for( int i = 0; i < jszys.size(); i++ ) {
			if( StringUtils.isEmpty( jszys.get( i ).getRoleid() ) ) {
				throw new Exception( "角色ID不能为空。" );
			}
			jszys.get( i ).setZyid( rzy.getZyid() );
		}
		jszyRepository.save( jszys );
		return new Result<Object>( ResultEnum.OK );
	}

	@ApiOperation(value = "修改资源详细信息", notes = "同时修改角色资源关系表，整删，整添加")
	@RequestMapping(value = "/zy/{zyId}", method = RequestMethod.POST)
	@Transactional
	public Result<Object> updateZy( @RequestBody ModelMap inData ) throws Exception {
		//获取数据
		xtzc_zy zy = JSON.parseObject( JSON.toJSONString( inData.get( "xtzc_zy" ) ), xtzc_zy.class );
		if( StringUtils.isEmpty( zy.getZyid() ) ) {
			throw new Exception( "资源ID不能为空。" );
		}
		List<xtzc_jszy> jszys = JSON.parseArray( JSON.toJSONString( inData.get( "xtzc_jszy" ) ), xtzc_jszy.class );
		if( jszys == null || jszys.size() == 0 ) {
			throw new Exception( "角色资源关系不能为空。" );
		}

		List<Long> zyIds = new ArrayList<Long>();
		zyIds.add( zy.getZyid() );

		//判断是否存在下级
		if( Constants.ZT.WX == zy.getZt() ) {
			List<xtzc_zy> tempzys = zyRepository.selectByPIdIn( zyIds );
			if( tempzys.size() > 0 ) {
				throw new Exception( "该资源中存在下级资源，不可修改无效。" );
			}
		}

		//删除已有关系
		jszyRepository.deleteByZyIdIn( zyIds );

		//添加新的关系
		for( int i = 0; i < jszys.size(); i++ ) {
			if( StringUtils.isEmpty( jszys.get( i ).getRoleid() ) ) {
				throw new Exception( "角色ID不能为空。" );
			}
			jszys.get( i ).setZyid( zy.getZyid() );
		}
		jszyRepository.save( jszys );

		//保存资源信息
		zyRepository.save( zy );
		return new Result<Object>( ResultEnum.OK );
	}

	@ApiOperation(value = "根据资源ID删除资源")
	@ApiImplicitParam(name = "zyId", value = "资源ID", required = true, paramType = "path", dataType = "Long")
	@RequestMapping(value = "/zy/{zyId}", method = RequestMethod.DELETE)
	public Result<Object> deleteZyByID( @PathVariable("zyId") Long zyId ) {
		boolean exists = zyRepository.exists( zyId );
		if( exists ) {
			zyRepository.delete( zyId );
			return new Result<Object>( 0, "ok", 1 );
		}
		else {
			return new Result<Object>( 0, "ok", 0 );
		}
	}

	@ApiOperation(value = "批量删除资源信息", notes = "同时删除角色资源关系表")
	@RequestMapping(value = "/zy/list", method = RequestMethod.DELETE)
	@Transactional
	public Result<Object> deletrZys( @RequestBody List<xtzc_zy> zys ) throws Exception {
		List<Long> zyIds = Lists.transform( zys, new Function<xtzc_zy, Long>() {
			@Override
			public Long apply( xtzc_zy t ) {
				return t.getZyid();
			}
		} );

		//判断是否存在下级
		List<xtzc_zy> tempzys = zyRepository.selectByPIdIn( zyIds );
		if( tempzys.size() > 0 ) {
			throw new Exception( "删除资源中存在下级资源，不可删除。" );
		}

		jszyRepository.deleteByZyIdIn( zyIds );
		zyRepository.delete( zys );
		return new Result<Object>( ResultEnum.OK );
	}

	@ApiOperation(value = "查询所有资源信息")
	@RequestMapping(value = "/zy/list", method = RequestMethod.GET)
	public Result<List<xtzc_zy>> queryZy() {
		List<xtzc_zy> zys = zyRepository.findAll();
		Result<List<xtzc_zy>> result = new Result<List<xtzc_zy>>( zys );
		return result;
	}

	@ApiOperation(value = "根据条件查询资源")
	@RequestMapping(value = "/zy/list", method = RequestMethod.POST)
	public Result<List<xtzc_zy>> queryZy( @RequestBody xtzc_zy zy ) {
		List<xtzc_zy> zys = zyRepository.findAll( Example.of( zy.removeEmpty() ) );
		Result<List<xtzc_zy>> result = new Result<List<xtzc_zy>>( zys );
		return result;
	}

	@ApiOperation(value = "根据条件分页查询资源")
	@RequestMapping(value = "/zy/page", method = RequestMethod.POST)
	public Result<Page<xtzc_zy>> queryZyPage( @RequestBody PageEntity<xtzc_zy> pageEntity ) {
		Page<xtzc_zy> data = zyRepository.findAll( Example.of( pageEntity.getEntity().removeEmpty() ), pageEntity.getPageRequest() );
		Result<Page<xtzc_zy>> result = new Result<Page<xtzc_zy>>( data );
		return result;
	}

	@ApiOperation(value = "查询资源Tree结构数据")
	@RequestMapping(value = "/zy/tree", method = RequestMethod.GET)
	public Result<List<?>> queryZyTree() {
		List<xtzc_zy> allData = zyRepository.findByZt( Constants.ZT.YX );
		if( allData.size() < 1 ) return new Result<List<?>>( allData );

		List<TreeNote> noteList = Lists.newArrayList();
		List<TreeNote> resultList = Lists.newArrayList();

		//构造根节点和noteList
		for( xtzc_zy org : allData ) {
			TreeNote note = new TreeNote();
			note.setLabel( org.getZymc() );
			note.setName( org.getZyid().toString() );
			note.setInfo( org );
			noteList.add( note );

			if( StringUtils.isEmpty( org.getPid() ) ) {
				//pid为空默认为根节点
				resultList.add( note );
			}
			else {
				//pid不为空，查找pid所对应的org在list中是否存在，如果不存在也定为根节点
				boolean isTop = true;
				for( xtzc_zy parentOrg : allData ) {
					if( Objects.equal( org.getPid(), parentOrg.getZyid() ) ) {
						isTop = false;
						break;
					}
				}
				if( isTop ) resultList.add( note );
			}
		}

		//构造子节点
		//利用List<T>引用类型特性，构造List树
		for( TreeNote childrenNote : noteList ) {
			xtzc_zy childrenOrg = (xtzc_zy) childrenNote.getInfo();
			if( StringUtils.isEmpty( childrenOrg.getPid() ) ) continue;
			for( TreeNote parentNote : noteList ) {
				xtzc_zy parentOrg = (xtzc_zy) parentNote.getInfo();
				if( Objects.equal( childrenOrg.getPid(), parentOrg.getZyid() ) ) {
					parentNote.getChildren().add( childrenNote );
				}
			}
		}

		return new Result<List<?>>( resultList );
	}

}
