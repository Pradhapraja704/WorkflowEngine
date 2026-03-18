package com.halleyx.workflow.repository;

import com.halleyx.workflow.model.WorkflowField;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface WorkflowFieldRepository extends JpaRepository<WorkflowField, Long> {

    @Query("SELECT f FROM WorkflowField f WHERE f.workflow.id = :workflowId")
    List<WorkflowField> getFieldsByWorkflow(@Param("workflowId") Long workflowId);

}