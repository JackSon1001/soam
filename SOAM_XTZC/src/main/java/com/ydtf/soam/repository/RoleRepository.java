package com.ydtf.soam.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.ydtf.soam.entity.db.xtzc_role;

public interface RoleRepository extends JpaRepository<xtzc_role, Long> {

	@Modifying
	@Query("delete from xtzc_role where roleid in ?1")
	int deleteByRoleIdIn( List<Long> roleIds );
}
