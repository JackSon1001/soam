package com.ydtf.soam.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.ydtf.soam.entity.db.xtzc_yhjsgx;

public interface YhjsgxRepository extends JpaRepository<xtzc_yhjsgx, Long> {

	@Modifying
	@Query("delete from xtzc_yhjsgx where roleid in ?1")
	int deleteByRoleIdIn( List<Long> roleIds );

	@Modifying
	@Query("delete from xtzc_yhjsgx where userid in ?1")
	int deleteByUserIdIn( List<Long> userIds );
}
