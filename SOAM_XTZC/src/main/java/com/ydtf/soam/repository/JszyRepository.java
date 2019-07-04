package com.ydtf.soam.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.ydtf.soam.entity.db.xtzc_jszy;

public interface JszyRepository extends JpaRepository<xtzc_jszy, Long> {

	@Modifying
	@Query("delete from xtzc_jszy where roleid in ?1")
	int deleteByRoleIdIn( List<Long> roleIds );

	@Modifying
	@Query("delete from xtzc_jszy where zyid in ?1")
	int deleteByZyIdIn( List<Long> zyid );
}
