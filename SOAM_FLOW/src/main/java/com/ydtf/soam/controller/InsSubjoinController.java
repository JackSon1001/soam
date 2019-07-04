package com.ydtf.soam.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ydtf.soam.entity.db.flow_ins_subjoin;
import com.ydtf.soam.repository.InsSubjoinRepository;
import com.ydtf.soam.system.base.entity.Result;
import com.ydtf.soam.system.base.entity.ResultEnum;

@RestController
public class InsSubjoinController {

	@Autowired
	InsSubjoinRepository insSubjoinRepository;

	@RequestMapping(value = "/instance/subjoin/{pid}", method = RequestMethod.GET)
	public Result<flow_ins_subjoin> queryData( @PathVariable("pid") Long pid ) {
		flow_ins_subjoin data = insSubjoinRepository.findByPid( pid );
		return new Result<flow_ins_subjoin>( data );
	}

	@RequestMapping(value = "/instance/subjoin", method = RequestMethod.POST)
	public Result<Integer> addData( @RequestBody flow_ins_subjoin entity ) {
		entity.setId( null );
		insSubjoinRepository.save( entity );
		return new Result<Integer>( ResultEnum.OK );
	}

}
