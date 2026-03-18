package com.halleyx.workflow.repository;

import com.halleyx.workflow.model.Request;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequestRepository extends JpaRepository<Request, Long> {


}