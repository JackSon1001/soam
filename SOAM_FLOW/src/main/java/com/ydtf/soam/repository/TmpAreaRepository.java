package com.ydtf.soam.repository;

import java.util.List;

import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.ydtf.soam.entity.db.flow_tmp_area;

@SuppressWarnings("unchecked")
@CacheConfig(cacheNames = "soam_flow_tmp_area")
public interface TmpAreaRepository extends JpaRepository<flow_tmp_area, Long> {

	/*@Cacheable
	Page<flow_tmp_area> findAll( PageEntity<flow_tmp_area> pageEntity );
	
	@Cacheable
	List<flow_tmp_area> findAll( flow_tmp_area entity );*/

	@Cacheable
	flow_tmp_area findOne( Long id );

	@CacheEvict(allEntries = true)
	flow_tmp_area save( flow_tmp_area entity );

	@CacheEvict(allEntries = true)
	void delete( Long id );

	@Cacheable
	List<flow_tmp_area> findByTid( Long tid );

	/**
	 * 根据模板ID删除
	 * */
	@CacheEvict(allEntries = true)
	@Modifying
	@Query("delete from flow_tmp_area where tid = ?1")
	Integer deleteByTid( Long tid );

	/**
	 * 根据多个模板ID删除
	 * */
	@CacheEvict(allEntries = true)
	@Modifying
	@Query("delete from flow_tmp_area where tid in ?1")
	Integer deleteByTidIn( List<Long> tids );
}