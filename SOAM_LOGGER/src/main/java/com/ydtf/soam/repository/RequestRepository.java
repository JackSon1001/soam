package com.ydtf.soam.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.ydtf.soam.entity.log_request;

public interface RequestRepository extends MongoRepository<log_request, String> {

	Long countByDateBetween( Date start, Date end );

	Long countByServiceAndDateBetween( String service, Date start, Date end );

	List<log_request> findByDateBetween( Date start, Date end );
	
	Page<log_request> findBy(TextCriteria criteria, Pageable page);
}
