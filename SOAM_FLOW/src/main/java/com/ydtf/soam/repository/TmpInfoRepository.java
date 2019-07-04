package com.ydtf.soam.repository;

import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ydtf.soam.entity.db.flow_tmp_info;

@SuppressWarnings("unchecked")
@CacheConfig(cacheNames = "soam_flow_tmp_info")
public interface TmpInfoRepository extends JpaRepository<flow_tmp_info, Long> {

	/*@Cacheable
	Page<flow_tmp_info> findAll( PageEntity<flow_tmp_info> pageEntity );
	
	@Cacheable
	List<flow_tmp_info> findAll( Example<flow_tmp_info> entity );*/

	@Cacheable
	flow_tmp_info findOne( Long id );

	@CacheEvict(allEntries = true)
	flow_tmp_info save( flow_tmp_info entity );

	@CacheEvict(allEntries = true)
	void delete( Long id );
}