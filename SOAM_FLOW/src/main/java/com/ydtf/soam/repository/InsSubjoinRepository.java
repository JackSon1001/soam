package com.ydtf.soam.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ydtf.soam.entity.db.flow_ins_subjoin;

public interface InsSubjoinRepository extends MongoRepository<flow_ins_subjoin, String> {

	flow_ins_subjoin findByPid( Long pid );

	Integer deleteByPid( Long pid );
}