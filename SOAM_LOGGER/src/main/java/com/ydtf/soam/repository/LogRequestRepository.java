package com.ydtf.soam.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ydtf.soam.entity.log_request;

public interface LogRequestRepository extends MongoRepository<log_request, String> {
}
