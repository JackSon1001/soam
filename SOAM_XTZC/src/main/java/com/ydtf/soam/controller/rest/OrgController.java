package com.ydtf.soam.controller.rest;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.google.common.base.Objects;
import com.google.common.collect.Lists;
import com.ydtf.soam.entity.db.xtzc_org;
import com.ydtf.soam.repository.OrgRepository;
import com.ydtf.soam.repository.UserRepository;
import com.ydtf.soam.system.base.contants.Constants;
import com.ydtf.soam.system.base.entity.PageEntity;
import com.ydtf.soam.system.base.entity.Result;
import com.ydtf.soam.system.base.entity.ResultEnum;
import com.ydtf.soam.system.base.entity.TreeNote;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;

@RestController
public class OrgController {
	@Autowired
	OrgRepository orgRepository;
	@Autowired
	UserRepository userRepository;

	@ApiOperation(value = "获取机构详细信息", notes = "根据url的orgId来获取机构详细信息")
	@ApiImplicitParam(name = "orgId", value = "机构ID", required = true, paramType = "path", dataType = "Long")
	@RequestMapping(value = "/org/{orgId}", method = RequestMethod.GET)
	public Result<xtzc_org> queryOrg( @PathVariable("orgId") Long orgId ) {
		xtzc_org org = orgRepository.findOne( orgId );
		return new Result<xtzc_org>( org );
	}

	@RequestMapping(value = "/org/list", method = RequestMethod.GET)
	public Result<List<xtzc_org>> findUser() {
		List<xtzc_org> orgs = orgRepository.findAll();
		Result<List<xtzc_org>> result = new Result<List<xtzc_org>>( orgs );
		return result;
	}

	@RequestMapping(value = "/org/list", method = RequestMethod.POST)
	public Result<List<xtzc_org>> findUser( @RequestBody xtzc_org org ) {
		List<xtzc_org> data = orgRepository.findAll( Example.of( org.removeEmpty() ) );
		Result<List<xtzc_org>> result = new Result<List<xtzc_org>>( data );
		return result;
	}

	@RequestMapping(value = "/org/page", method = RequestMethod.POST)
	public Result<Page<xtzc_org>> findUserPage( @RequestBody PageEntity<xtzc_org> pageEntity ) {
		Page<xtzc_org> data = orgRepository.findAll( Example.of( pageEntity.getEntity().removeEmpty() ), pageEntity.getPageRequest() );
		Result<Page<xtzc_org>> result = new Result<Page<xtzc_org>>( data );
		return result;
	}

	@ApiOperation(value = "新增机构")
	@RequestMapping(value = "/org", method = RequestMethod.POST)
	public Result<xtzc_org> addOrg( @RequestBody xtzc_org org ) throws Exception {
		if( StringUtils.isEmpty( org.getJgmc() ) ) {
			throw new Exception( "机构名称不能为空" );
		}
		if( StringUtils.isEmpty( org.getJgjc() ) ) {
			throw new Exception( "机构简称不能为空" );
		}
		org.setZt( Constants.ZT.YX );
		xtzc_org bean = orgRepository.save( org );
		return new Result<xtzc_org>( bean );
	}

	@ApiOperation(value = "修改机构详细信息", notes = "根据url的id，修改机构完整信息")
	@RequestMapping(value = "/org/{orgId}", method = RequestMethod.PUT)
	public Result<xtzc_org> updateOrg( @PathVariable("orgId") Long orgId, @RequestBody xtzc_org org ) {
		org.setOrgid( orgId );
		orgRepository.save( org );
		return new Result<xtzc_org>( ResultEnum.OK );
	}

	@ApiOperation(value = "根据机构ID删除机构")
	@ApiImplicitParam(name = "orgId", value = "机构ID", required = true, paramType = "path", dataType = "Long")
	@RequestMapping(value = "/org/list", method = RequestMethod.DELETE)
	@Transactional
	public Result<xtzc_org> deleteOrg( @RequestBody List<xtzc_org> orgs ) {
		if( null == orgs || orgs.size() < 1 ) {
			return new Result<xtzc_org>( ResultEnum.OK );
		}
		List<Long> orgIds = Lists.newArrayList();
		for( xtzc_org xtzc_org : orgs ) {
			orgIds.add( xtzc_org.getOrgid() );
		}
		userRepository.updateByOrgIds( orgIds );
		orgRepository.deleteByOrgIdsOrPids( orgIds, orgIds );
		return new Result<xtzc_org>( ResultEnum.OK );
	}

	@ApiOperation(value = "根据状态查询并生成tree节点数据")
	@RequestMapping(value = "/org/tree/{zt}", method = RequestMethod.GET)
	public Result<List<TreeNote>> findOrgTree( @PathVariable("zt") Integer zt ) {

		xtzc_org bean = new xtzc_org();
		if( null != zt && zt != 0 ) {
			bean.setZt( zt );
		}
		List<xtzc_org> allData = orgRepository.findAll( Example.of( bean ) );
		if( allData.size() < 1 ) return new Result<List<TreeNote>>( new ArrayList<TreeNote>() );

		List<TreeNote> noteList = Lists.newArrayList();
		List<TreeNote> resultList = Lists.newArrayList();

		//构造根节点和noteList
		for( xtzc_org org : allData ) {
			TreeNote note = new TreeNote();
			note.setLabel( org.getJgmc() );
			note.setName( org.getOrgid().toString() );
			note.setInfo( org );
			noteList.add( note );

			if( StringUtils.isEmpty( org.getPid() ) ) {
				//pid为空默认为根节点
				resultList.add( note );
			}
			else {
				//pid不为空，查找pid所对应的org在list中是否存在，如果不存在也定为根节点
				boolean isTop = true;
				for( xtzc_org parentOrg : allData ) {
					if( Objects.equal( org.getPid(), parentOrg.getOrgid() ) ) {
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
			xtzc_org childrenOrg = (xtzc_org) childrenNote.getInfo();
			if( StringUtils.isEmpty( childrenOrg.getPid() ) ) continue;
			for( TreeNote parentNote : noteList ) {
				xtzc_org parentOrg = (xtzc_org) parentNote.getInfo();
				if( Objects.equal( childrenOrg.getPid(), parentOrg.getOrgid() ) ) {
					parentNote.getChildren().add( childrenNote );
				}
			}
		}

		return new Result<List<TreeNote>>( resultList );
	}

}
