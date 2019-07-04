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

import com.ydtf.soam.entity.db.flow_tmp_line;
import com.ydtf.soam.repository.TmpLineRepository;
import com.ydtf.soam.system.base.entity.PageEntity;
import com.ydtf.soam.system.base.entity.Result;
import com.ydtf.soam.system.base.entity.ResultEnum;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;

@RestController
public class TmpLineController {

	@Autowired
	TmpLineRepository tmpLineRepository;

	@ApiOperation(value = "新增流程模板连接线")
	@RequestMapping(value = "/template/line", method = RequestMethod.POST)
	public Result<flow_tmp_line> add( @RequestBody flow_tmp_line entity ) {
		flow_tmp_line data = tmpLineRepository.save( entity );
		return new Result<flow_tmp_line>( data );
	}

	@ApiOperation(value = "获取流程模板连接线详细信息", notes = "根据url的id来获取流程模板连接线详细信息")
	@ApiImplicitParam(name = "id", value = "流程模板连接线ID", required = true, paramType = "path", dataType = "Long")
	@RequestMapping(value = "/template/line/{id}", method = RequestMethod.GET)
	public Result<flow_tmp_line> query( @PathVariable("id") Long id ) throws Exception {
		flow_tmp_line data = tmpLineRepository.findOne( id );
		return new Result<flow_tmp_line>( data );
	}

	@ApiOperation(value = "根据流程模板连接线ID删除节点")
	@ApiImplicitParam(name = "id", value = "流程模板连接线ID", required = true, paramType = "path", dataType = "Long")
	@RequestMapping(value = "/template/line/{id}", method = RequestMethod.DELETE)
	public Result<Integer> delete( @PathVariable("id") Long id ) {
		boolean exists = tmpLineRepository.exists( id );
		if( exists ) {
			tmpLineRepository.delete( id );
			return new Result<Integer>( 1 );
		}
		else {
			return new Result<Integer>( 0 );
		}
	}

	@ApiOperation(value = "获取流程模板连接线列表")
	@RequestMapping(value = "/template/line/list", method = RequestMethod.POST)
	public Result<List<flow_tmp_line>> getList( @RequestBody flow_tmp_line entity ) {
		List<flow_tmp_line> data = tmpLineRepository.findAll( Example.of( entity ) );
		return new Result<List<flow_tmp_line>>( data );
	}

	@ApiOperation(value = "删除多个流程模板连接线")
	@RequestMapping(value = "/template/line/list", method = RequestMethod.DELETE)
	public Result<Object> delete( @RequestBody List<flow_tmp_line> list ) {
		tmpLineRepository.delete( list );
		return new Result<Object>( ResultEnum.OK );
	}

	@ApiOperation(value = "根据分页查询流程模板连接线")
	@RequestMapping(value = "/template/line/list/page", method = RequestMethod.POST)
	public Result<Page<flow_tmp_line>> getPageList( @RequestBody PageEntity<flow_tmp_line> pageEntity ) {
		Page<flow_tmp_line> data = tmpLineRepository.findAll( Example.of( pageEntity.getEntity().removeEmpty() ),
				pageEntity.getPageRequest() );
		return new Result<Page<flow_tmp_line>>( data );
	}

}
