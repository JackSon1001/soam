package com.ydtf.soam.controller;

import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;
import com.google.common.collect.Maps;
import com.ydtf.soam.controller.client.XtzcClient;
import com.ydtf.soam.entity.db.flow_ins_area;
import com.ydtf.soam.entity.db.flow_ins_info;
import com.ydtf.soam.entity.db.flow_ins_line;
import com.ydtf.soam.entity.db.flow_ins_node;
import com.ydtf.soam.entity.struct.FlowInstanceChart;
import com.ydtf.soam.repository.InsAreaRepository;
import com.ydtf.soam.repository.InsInfoRepository;
import com.ydtf.soam.repository.InsLineRepository;
import com.ydtf.soam.repository.InsNodeRepository;
import com.ydtf.soam.system.base.contants.Constants;
import com.ydtf.soam.system.base.entity.PageEntity;
import com.ydtf.soam.system.base.entity.Result;
import com.ydtf.soam.system.base.entity.ResultEnum;
import com.ydtf.soam.system.base.entity.TreeNote;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;

@RestController
public class InsInfoController {
	@Autowired
	InsInfoRepository insInfoRepository;

	@Autowired
	InsNodeRepository insNodeRepository;

	@Autowired
	InsLineRepository insLineRepository;

	@Autowired
	InsAreaRepository insAreaRepository;

	@Autowired
	XtzcClient xtzcClient;

	@ApiOperation(value = "获取实例详细信息", notes = "根据url的id来获取实例详细信息")
	@ApiImplicitParam(name = "insid", value = "用户ID", required = true, paramType = "path", dataType = "Long")
	@RequestMapping(value = "/instance/{insid}", method = RequestMethod.GET)
	public Result<flow_ins_info> queryIns( @PathVariable("insid") Long insid ) {
		flow_ins_info ins = insInfoRepository.findOne( insid );
		return new Result<flow_ins_info>( ins );
	}

	@ApiOperation(value = "新增实例")
	@RequestMapping(value = "/instance", method = RequestMethod.POST)
	public Result<Integer> addIns( @RequestBody flow_ins_info ins ) throws Exception {
		ins.setId( null );
		insInfoRepository.save( ins );
		return new Result<Integer>( ResultEnum.OK );
	}

	@ApiOperation(value = "删除实例信息")
	@ApiImplicitParam(name = "insid", value = "用户ID", required = true, paramType = "path", dataType = "Long")
	@RequestMapping(value = "/instance/{insid}", method = RequestMethod.DELETE)
	public Result<Integer> deleteIns( @PathVariable("insid") Long insid ) {
		boolean exists = insInfoRepository.exists( insid );
		if( exists ) {
			insInfoRepository.delete( insid );
			return new Result<Integer>( ResultEnum.OK );
		}
		else {
			return new Result<Integer>( ResultEnum.ERROR );
		}
	}

	@ApiOperation(value = "删除多个实例信息")
	@RequestMapping(value = "/instance/list", method = RequestMethod.DELETE)
	@Transactional
	public Result<Integer> deleteInss( @RequestBody List<flow_ins_info> inss ) {
		if( null == inss || inss.size() < 1 ) {
			return new Result<Integer>( ResultEnum.OK );
		}
		insInfoRepository.delete( inss );
		return new Result<Integer>( ResultEnum.OK );
	}

	@RequestMapping(value = "/instance/list", method = RequestMethod.GET)
	public Result<List<flow_ins_info>> findIns() {
		List<flow_ins_info> inss = insInfoRepository.findAll();
		Result<List<flow_ins_info>> result = new Result<List<flow_ins_info>>( inss );
		return result;
	}

	@RequestMapping(value = "/instance/list", method = RequestMethod.POST)
	public Result<List<flow_ins_info>> findIns( @RequestBody flow_ins_info ins ) {
		List<flow_ins_info> inss = insInfoRepository.findAll( Example.of( ins.removeEmpty() ) );
		Result<List<flow_ins_info>> result = new Result<List<flow_ins_info>>( inss );
		return result;
	}

	@RequestMapping(value = "/instance/count", method = RequestMethod.POST)
	public Result<JSONObject> countInsNumber( @RequestBody flow_ins_info ins ) {
		JSONObject json = new JSONObject();
		ins.setDqzt( Long.valueOf( Constants.FLOW.INSTANCE_STATUS.ZC ) );
		List<flow_ins_info> inss1 = insInfoRepository.findAll( Example.of( ins ) );
		json.put( "zc", inss1.size() );
		ins.setDqzt( Long.valueOf( Constants.FLOW.INSTANCE_STATUS.YC ) );
		List<flow_ins_info> inss2 = insInfoRepository.findAll( Example.of( ins ) );
		json.put( "yc", inss2.size() );
		ins.setDqzt( Long.valueOf( Constants.FLOW.INSTANCE_STATUS.GQ ) );
		List<flow_ins_info> inss3 = insInfoRepository.findAll( Example.of( ins ) );
		json.put( "gq", inss3.size() );
		return new Result<JSONObject>( json );
	}

	@RequestMapping(value = "/instance/page", method = RequestMethod.POST)
	public Result<Page<flow_ins_info>> findInsPage( @RequestBody PageEntity<flow_ins_info> pageEntity ) {
		Page<flow_ins_info> data = insInfoRepository.findAll( Example.of( pageEntity.getEntity().removeEmpty() ),
				pageEntity.getPageRequest() );
		Result<Page<flow_ins_info>> result = new Result<Page<flow_ins_info>>( data );
		return result;
	}

	@ApiOperation(value = "查询并生成机构树节点数据")
	@RequestMapping(value = "/instance/orgTree", method = RequestMethod.GET)
	public Result<List<TreeNote>> findOrgTree() {
		return xtzcClient.queryOrgTree( Constants.ZT.YX );
	}

	@ApiOperation(value = "查询并生成业务类别节点数据")
	@RequestMapping(value = "/instance/ywyTree", method = RequestMethod.POST)
	public Result<List<?>> queryYwyTree( @RequestBody ModelMap inData ) {
		return xtzcClient.queryYwyTree( inData );
	}

	@ApiOperation(value = "获取流程实例图数据", notes = "根据url的id获取流程实例图JSON数据")
	@RequestMapping(value = "/instance/chart/{id}", method = RequestMethod.GET)
	public Result<FlowInstanceChart> queryChart( @PathVariable("id") Long iid ) throws Exception {
		flow_ins_info info = insInfoRepository.findOne( iid );
		if( info == null ) return new Result<FlowInstanceChart>( ResultEnum.OK );

		Map<String, flow_ins_node> nodeMap = Maps.newConcurrentMap();
		Map<String, flow_ins_line> lineMap = Maps.newConcurrentMap();
		Map<String, flow_ins_area> areaMap = Maps.newConcurrentMap();

		List<flow_ins_node> nodes = insNodeRepository.findByIid( iid );
		List<flow_ins_line> lines = insLineRepository.findByIid( iid );
		List<flow_ins_area> areas = insAreaRepository.findByIid( iid );

		for( flow_ins_node node : nodes ) {
			nodeMap.put( node.getKey(), node );
		}
		for( flow_ins_line line : lines ) {
			lineMap.put( line.getKey(), line );
		}
		for( flow_ins_area area : areas ) {
			areaMap.put( area.getKey(), area );
		}

		FlowInstanceChart flowInstanceChart = new FlowInstanceChart();
		flowInstanceChart.setId( info.getId() ); //实例ID
		flowInstanceChart.setYwid( info.getYwid() ); //业务ID
		flowInstanceChart.setTitle( info.getName() ); //流程名称
		flowInstanceChart.setInitNum( info.getInitNum() ); //初始化索引
		flowInstanceChart.setArea( info.getArea() ); //所属地区
		flowInstanceChart.setNodes( nodeMap );
		flowInstanceChart.setLines( lineMap );
		flowInstanceChart.setAreas( areaMap );
		flowInstanceChart.setInitNum( nodeMap.size() + lineMap.size() + areaMap.size() );

		return new Result<FlowInstanceChart>( flowInstanceChart );
	}

}
