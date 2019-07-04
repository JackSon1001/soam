package com.ydtf.soam.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ydtf.soam.entity.log_soam;

public interface LogRepository extends MongoRepository<log_soam, String> {

	List<log_soam> findByLevel( String level );

	List<log_soam> findByThread( String thread );

	List<log_soam> findByThreadLike( String thread );

	List<log_soam> findByMessageLike( String msg );

	List<log_soam> findByDateBetween( Date start, Date end );

	Long countByLevel( String level );

	Long countByThread( String thread );

	Long countByMessageLike( String msg );

	Long countByServiceAndDateBetween( String service, Date start, Date end );

	Long countByDateBetween( Date start, Date end );

	Long countByDateBefore( Date date );
}
