package com.ydtf.soam.controller;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.google.common.base.Function;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.ydtf.soam.entity.db.flow_tmp_area;
import com.ydtf.soam.entity.db.flow_tmp_info;
import com.ydtf.soam.entity.db.flow_tmp_line;
import com.ydtf.soam.entity.db.flow_tmp_node;
import com.ydtf.soam.entity.struct.FlowTmplateChart;
import com.ydtf.soam.repository.TmpAreaRepository;
import com.ydtf.soam.repository.TmpInfoRepository;
import com.ydtf.soam.repository.TmpLineRepository;
import com.ydtf.soam.repository.TmpNodeRepository;
import com.ydtf.soam.system.base.entity.PageEntity;
import com.ydtf.soam.system.base.entity.Result;
import com.ydtf.soam.system.base.entity.ResultEnum;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;

@RestController
public class TmpInfoController {

	@Autowired
	TmpInfoRepository tmpInfoRepository;

	@Autowired
	TmpNodeRepository tmpNodeRepository;

	@Autowired
	TmpLineRepository tmpLineRepository;

	@Autowired
	TmpAreaRepository tmpAreaRepository;

	@ApiOperation(value = "新增流程模板")
	@RequestMapping(value = "/template", method = RequestMethod.POST)
	public Result<flow_tmp_info> add( @RequestBody flow_tmp_info tmp_info ) throws Exception {
		if( StringUtils.isEmpty( tmp_info.getName() ) ) {
			throw new Exception( "名称不能为空。" );
		}
		if( StringUtils.isEmpty( tmp_info.getYwid() ) ) {
			throw new Exception( "业务ID不能为空。" );
		}
		tmp_info.setCjsj( new Date() );
		flow_tmp_info data = tmpInfoRepository.save( tmp_info );
		return new Result<flow_tmp_info>( data );
	}

	@ApiOperation(value = "修改流程模板单表", notes = "根据url的id来修改流程模板详细信息")
	@ApiImplicitParam(name = "id", value = "流程模板ID", required = true, paramType = "path", dataType = "Long")
	@RequestMapping(value = "/template/{id}", method = RequestMethod.POST)
	public Result<Object> updateInfo( @PathVariable("id") Long id, @RequestBody flow_tmp_info tmp_info )
			throws Exception {
		if( StringUtils.isEmpty( id ) ) {
			throw new Exception( "Id不能为空。" );
		}
		if( StringUtils.isEmpty( tmp_info.getName() ) ) {
			throw new Exception( "名称不能为空。" );
		}
		if( StringUtils.isEmpty( tmp_info.getYwid() ) ) {
			throw new Exception( "业务ID不能为空。" );
		}
		tmp_info.setXgsj( new Date() );
		tmpInfoRepository.save( tmp_info );
		return new Result<Object>( ResultEnum.OK );
	}

	@ApiOperation(value = "获取流程模板详细信息", notes = "根据url的id来获取流程模板详细信息")
	@ApiImplicitParam(name = "id", value = "流程模板ID", required = true, paramType = "path", dataType = "Long")
	@RequestMapping(value = "/template/{id}", method = RequestMethod.GET)
	public Result<flow_tmp_info> query( @PathVariable("id") Long id ) throws Exception {
		flow_tmp_info data = tmpInfoRepository.findOne( id );
		return new Result<flow_tmp_info>( data );
	}

	@ApiOperation(value = "删除流程模板")
	@ApiImplicitParam(name = "id", value = "流程模板id", required = true, paramType = "path", dataType = "Long")
	@RequestMapping(value = "/template/{id}", method = RequestMethod.DELETE)
	@Transactional
	public Result<?> delete( @PathVariable("id") Long id ) {
		if( tmpInfoRepository.exists( id ) ) tmpInfoRepository.delete( id );

		//删除节点、连接线、AREA相关数据
		tmpNodeRepository.deleteByTid( id );
		tmpLineRepository.deleteByTid( id );
		tmpAreaRepository.deleteByTid( id );

		return new Result<>( ResultEnum.OK );
	}

	@ApiOperation(value = "获取流程模板列表")
	@RequestMapping(value = "/template/list", method = RequestMethod.POST)
	public Result<List<flow_tmp_info>> getList( @RequestBody flow_tmp_info entity ) {
		List<flow_tmp_info> data = tmpInfoRepository.findAll( Example.of( entity ) );
		return new Result<List<flow_tmp_info>>( data );
	}

	@ApiOperation(value = "删除多个流程模板")
	@RequestMapping(value = "/template/list", method = RequestMethod.DELETE)
	@Transactional
	public Result<?> delete( @RequestBody List<flow_tmp_info> list ) {
		List<Long> tids = Lists.transform( list, new Function<flow_tmp_info, Long>() {
			@Override
			public Long apply( flow_tmp_info t ) {
				return t.getId();
			}
		} );

		tmpInfoRepository.delete( list );
		//删除节点、连接线、AREA相关数据
		tmpNodeRepository.deleteByTidIn( tids );
		tmpLineRepository.deleteByTidIn( tids );
		tmpAreaRepository.deleteByTidIn( tids );

		return new Result<>( ResultEnum.OK );
	}

	@ApiOperation(value = "根据分页查询流程模板")
	@RequestMapping(value = "/template/list/page", method = RequestMethod.POST)
	public Result<Page<flow_tmp_info>> getPageList( @RequestBody PageEntity<flow_tmp_info> pageEntity ) {
		Page<flow_tmp_info> data = tmpInfoRepository.findAll( Example.of( pageEntity.getEntity().removeEmpty() ),
				pageEntity.getPageRequest() );
		return new Result<Page<flow_tmp_info>>( data );
	}

	@ApiOperation(value = "获取流程模板图数据", notes = "根据url的id获取流程模板图JSON数据")
	@RequestMapping(value = "/template/chart/{id}", method = RequestMethod.GET)
	public Result<FlowTmplateChart> queryChart( @PathVariable("id") Long tid ) throws Exception {
		flow_tmp_info info = tmpInfoRepository.findOne( tid );
		if( info == null ) return new Result<FlowTmplateChart>( ResultEnum.OK );

		Map<String, flow_tmp_node> nodeMap = Maps.newConcurrentMap();
		Map<String, flow_tmp_line> lineMap = Maps.newConcurrentMap();
		Map<String, flow_tmp_area> areaMap = Maps.newConcurrentMap();

		for( flow_tmp_node node : tmpNodeRepository.findByTid( tid ) ) {
			nodeMap.put( node.getKey(), node );
		}
		for( flow_tmp_line line : tmpLineRepository.findByTid( tid ) ) {
			lineMap.put( line.getKey(), line );
		}
		for( flow_tmp_area area : tmpAreaRepository.findByTid( tid ) ) {
			areaMap.put( area.getKey(), area );
		}

		FlowTmplateChart flowTmplateChart = new FlowTmplateChart();
		flowTmplateChart.setId( info.getId() );
		flowTmplateChart.setYwid( info.getYwid() );
		flowTmplateChart.setTitle( info.getName() );
		flowTmplateChart.setInitNum( info.getInitNum() );
		flowTmplateChart.setNodes( nodeMap );
		flowTmplateChart.setLines( lineMap );
		flowTmplateChart.setAreas( areaMap );
		flowTmplateChart.setInitNum( info.getInitNum() );

		return new Result<FlowTmplateChart>( flowTmplateChart );
	}

	@ApiOperation(value = "保存流程模板图数据")
	@RequestMapping(value = "/template/chart", method = RequestMethod.POST)
	@Transactional
	public Result<FlowTmplateChart> saveChart( @RequestBody FlowTmplateChart flowTmplateChart ) throws Exception {
		flow_tmp_info tmpInfo = null;
		if( !StringUtils.isEmpty( flowTmplateChart.getId() ) ) {
			tmpInfo = tmpInfoRepository.findOne( flowTmplateChart.getId() );
		}
		if( tmpInfo == null ) tmpInfo = new flow_tmp_info();
		tmpInfo.setName( flowTmplateChart.getTitle() );
		tmpInfo.setYwid( flowTmplateChart.getYwid() );
		tmpInfo.setInitNum( flowTmplateChart.getInitNum() );
		tmpInfo = tmpInfoRepository.save( tmpInfo );
		flowTmplateChart.setId( tmpInfo.getId() );
		Long templateId = tmpInfo.getId();

		List<flow_tmp_node> nodes = Lists.newArrayList();
		List<flow_tmp_line> lines = Lists.newArrayList();
		List<flow_tmp_area> areas = Lists.newArrayList();

		if( flowTmplateChart.getNodes() != null ) {
			for( Entry<String, flow_tmp_node> entry : flowTmplateChart.getNodes().entrySet() ) {
				flow_tmp_node node = entry.getValue();
				node.setId( null );
				node.setTid( templateId );
				node.setKey( entry.getKey() );
				nodes.add( node );
			}
		}

		if( flowTmplateChart.getLines() != null ) {
			for( Entry<String, flow_tmp_line> entry : flowTmplateChart.getLines().entrySet() ) {
				flow_tmp_line line = entry.getValue();
				line.setId( null );
				line.setTid( templateId );
				line.setKey( entry.getKey() );
				lines.add( line );
			}
		}

		if( flowTmplateChart.getAreas() != null ) {
			for( Entry<String, flow_tmp_area> entry : flowTmplateChart.getAreas().entrySet() ) {
				flow_tmp_area area = entry.getValue();
				area.setId( null );
				area.setKey( entry.getKey() );
				area.setTid( templateId );
				areas.add( area );
			}
		}

		//删除原有节点、连接线、AREA相关数据
		tmpNodeRepository.deleteByTid( templateId );
		tmpLineRepository.deleteByTid( templateId );
		tmpAreaRepository.deleteByTid( templateId );

		//重新新增
		tmpNodeRepository.save( nodes );
		tmpLineRepository.save( lines );
		tmpAreaRepository.save( areas );

		return new Result<FlowTmplateChart>( flowTmplateChart );
	}

}
