package com.ydtf.soam.repository;

import java.util.List;

import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.ydtf.soam.entity.db.flow_tmp_node;

@SuppressWarnings("unchecked")
@CacheConfig(cacheNames = "soam_flow_tmp_node")
public interface TmpNodeRepository extends JpaRepository<flow_tmp_node, Long> {

	/*@Cacheable
	Page<flow_tmp_node> findAuto( PageEntity<flow_tmp_node> pageEntity );
	
	@Cacheable
	List<flow_tmp_node> findAuto( flow_tmp_node node );*/

	@Cacheable
	flow_tmp_node findOne( Long id );

	@CacheEvict(allEntries = true)
	flow_tmp_node save( flow_tmp_node node );

	@CacheEvict(allEntries = true)
	void delete( Long id );

	@Cacheable
	List<flow_tmp_node> findByTid( Long tid );

	/**
	 * 根据模板ID删除
	 * */
	@CacheEvict(allEntries = true)
	@Modifying
	@Query("delete from flow_tmp_node where tid = ?1")
	Integer deleteByTid( Long tid );

	/**
	 * 根据多个模板ID删除
	 * */
	@CacheEvict(allEntries = true)
	@Modifying
	@Query("delete from flow_tmp_node where tid in ?1")
	Integer deleteByTidIn( List<Long> tids );
}