package com.ydtf.soam.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ydtf.soam.entity.db.xtzc_zy;

public interface ZyRepository extends JpaRepository<xtzc_zy, Long> {

	List<xtzc_zy> findByZt( Integer zt );

	@Query(value = "select * from xtzc_zy where pid in ?1", nativeQuery = true)
	List<xtzc_zy> selectByPIdIn( List<Long> pIds );

	@Query(value = "select zy.* from xtzc_zy as zy "
			+ "inner join xtzc_jszy as jszy on zy.zyid = jszy.zyid "
			+ "inner join xtzc_role as role on jszy.roleid = role.roleid "
			+ "inner join xtzc_yhjsgx yhjsgx on yhjsgx.roleid = role.roleid "
			+ "where yhjsgx.userid = ?1", 
			nativeQuery = true)
	List<xtzc_zy> selectByUserId( Long userId );
}
