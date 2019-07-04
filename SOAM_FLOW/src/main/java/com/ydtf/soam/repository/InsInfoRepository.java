package com.ydtf.soam.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ydtf.soam.entity.db.flow_ins_info;

public interface InsInfoRepository extends JpaRepository<flow_ins_info, Long> {

}
