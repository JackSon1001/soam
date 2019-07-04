package com.ydtf.soam.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.ydtf.soam.entity.db.xtzc_org;

public interface OrgRepository extends JpaRepository<xtzc_org, Long> {

	List<xtzc_org> findByZt( Integer zt );

	@Modifying
	@Query("delete xtzc_org where orgid in ?1 or pid in ?2")
	int deleteByOrgIdsOrPids( List<Long> orgIds, List<Long> pIds );
}
