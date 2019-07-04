package com.ydtf.soam.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.ydtf.soam.entity.db.xtzc_user;

public interface UserRepository extends JpaRepository<xtzc_user, Long> {
	xtzc_user findByYhmAndYhmm( String yhm, String yhmm );

	xtzc_user findByYhm( String yhm );

	@Modifying
	@Query("update xtzc_user set orgid = null where orgid in ?1")
	int updateByOrgIds( List<Long> orgIds );
}
