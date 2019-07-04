package com.ydtf.soam.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.ydtf.soam.entity.db.xtzc_ywy;

public interface YwyRepository extends JpaRepository<xtzc_ywy, Long> {

	List<xtzc_ywy> findByZt( Integer zt );

	@Modifying
	@Query("delete from xtzc_ywy where ywid in ?1")
	int deleteByYwIdIn( List<Long> ywIds );

	@Modifying
	@Query("select zy from xtzc_ywy as zy where pid in ?1")
	List<xtzc_ywy> selectByPIdIn( List<Long> pIds );
}
