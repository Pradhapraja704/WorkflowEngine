package com.halleyx.workflow.repository;

import com.halleyx.workflow.model.ExecutionLog;
import com.halleyx.workflow.model.Request;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExecutionLogRepository extends JpaRepository<ExecutionLog, Long> {

    List<ExecutionLog> findByRequest(Request request);

}