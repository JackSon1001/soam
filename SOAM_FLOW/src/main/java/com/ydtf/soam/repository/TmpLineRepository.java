package com.ydtf.soam.repository;

import java.util.List;

import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.ydtf.soam.entity.db.flow_tmp_line;

@SuppressWarnings("unchecked")
@CacheConfig(cacheNames = "soam_flow_tmp_line")
public interface TmpLineRepository extends JpaRepository<flow_tmp_line, Long> {

	/*@Cacheable
	Page<flow_tmp_line> findAll( PageEntity<flow_tmp_line> pageEntity );
	
	@Cacheable
	List<flow_tmp_line> findAll( flow_tmp_line line );*/

	@Cacheable
	flow_tmp_line findOne( Long id );

	@CacheEvict(allEntries = true)
	flow_tmp_line save( flow_tmp_line node );

	@CacheEvict(allEntries = true)
	void delete( Long id );

	@Cacheable
	List<flow_tmp_line> findByTid( Long tid );

	/**
	 * 根据模板ID删除
	 * */
	@CacheEvict(allEntries = true)
	@Modifying
	@Query("delete from flow_tmp_line where tid = ?1")
	Integer deleteByTid( Long tid );

	/**
	 * 根据多个模板ID删除
	 * */
	@CacheEvict(allEntries = true)
	@Modifying
	@Query("delete from flow_tmp_line where tid in ?1")
	Integer deleteByTidIn( List<Long> tids );
}