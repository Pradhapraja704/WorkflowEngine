package com.halleyx.workflow.repository;

import com.halleyx.workflow.model.Step;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StepRepository extends JpaRepository<Step, Long> {

    List<Step> findByWorkflow_IdOrderByStepOrder(Long workflowId);

}