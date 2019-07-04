package com.ydtf.soam.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.ydtf.soam.entity.db.flow_ins_line;

public interface InsLineRepository extends JpaRepository<flow_ins_line, Long> {

	List<flow_ins_line> findByIid( Long Iid );

	/**
	 * 根据实例ID删除
	 * */
	@Modifying
	@Query("delete from flow_ins_line where iid = ?1")
	Integer deleteByIid( Long iid );

	/**
	 * 根据多个实例ID删除
	 * */
	@Modifying
	@Query("delete from flow_ins_line where iid in ?1")
	Integer deleteByIidIn( List<Long> iids );
}