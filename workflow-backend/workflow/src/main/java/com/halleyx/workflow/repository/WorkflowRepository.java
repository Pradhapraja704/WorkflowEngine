package com.halleyx.workflow.repository;

import com.halleyx.workflow.model.Workflow;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkflowRepository extends JpaRepository<Workflow, Long> {

}