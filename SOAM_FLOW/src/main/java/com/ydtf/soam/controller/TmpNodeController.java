package com.ydtf.soam.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ydtf.soam.entity.db.flow_tmp_node;
import com.ydtf.soam.repository.TmpNodeRepository;
import com.ydtf.soam.system.base.entity.PageEntity;
import com.ydtf.soam.system.base.entity.Result;
import com.ydtf.soam.system.base.entity.ResultEnum;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;

@RestController
public class TmpNodeController {

	@Autowired
	TmpNodeRepository tmpNodeRepository;

	@ApiOperation(value = "新增流程模板节点")
	@RequestMapping(value = "/template/node", method = RequestMethod.POST)
	public Result<flow_tmp_node> add( @RequestBody flow_tmp_node node ) {
		flow_tmp_node data = tmpNodeRepository.save( node );
		return new Result<flow_tmp_node>( data );
	}

	@ApiOperation(value = "获取流程模板节点详细信息", notes = "根据url的id来获取流程模板节点详细信息")
	@ApiImplicitParam(name = "id", value = "流程模板节点ID", required = true, paramType = "path", dataType = "Long")
	@RequestMapping(value = "/template/node/{id}", method = RequestMethod.GET)
	public Result<flow_tmp_node> query( @PathVariable("id") Long id ) throws Exception {
		flow_tmp_node data = tmpNodeRepository.findOne( id );
		return new Result<flow_tmp_node>( data );
	}

	@ApiOperation(value = "根据流程模板节点ID删除节点")
	@ApiImplicitParam(name = "id", value = "流程模板节点ID", required = true, paramType = "path", dataType = "Long")
	@RequestMapping(value = "/template/node/{id}", method = RequestMethod.DELETE)
	public Result<Integer> delete( @PathVariable("id") Long id ) {
		boolean exists = tmpNodeRepository.exists( id );
		if( exists ) {
			tmpNodeRepository.delete( id );
			return new Result<Integer>( 1 );
		}
		else {
			return new Result<Integer>( 0 );
		}
	}

	@ApiOperation(value = "获取流程模板节点列表")
	@RequestMapping(value = "/template/node/list", method = RequestMethod.POST)
	public Result<List<flow_tmp_node>> getList( @RequestBody flow_tmp_node node ) {
		List<flow_tmp_node> data = tmpNodeRepository.findAll( Example.of( node ) );
		return new Result<List<flow_tmp_node>>( data );
	}

	@ApiOperation(value = "删除多个流程模板节点")
	@RequestMapping(value = "/template/node/list", method = RequestMethod.DELETE)
	public Result<Object> delete( @RequestBody List<flow_tmp_node> list ) {
		tmpNodeRepository.delete( list );
		return new Result<Object>( ResultEnum.OK );
	}

	@ApiOperation(value = "根据分页查询流程模板节点")
	@RequestMapping(value = "/template/node/list/page", method = RequestMethod.POST)
	public Result<Page<flow_tmp_node>> getPageList( @RequestBody PageEntity<flow_tmp_node> pageEntity ) {
		Page<flow_tmp_node> data = tmpNodeRepository.findAll( Example.of( pageEntity.getEntity().removeEmpty() ), pageEntity.getPageRequest() );
		return new Result<Page<flow_tmp_node>>( data );
	}

}
