package com.halleyx.workflow.service;

import com.halleyx.workflow.model.Step;
import com.halleyx.workflow.model.Workflow;
import com.halleyx.workflow.repository.RequestRepository;
import com.halleyx.workflow.repository.StepRepository;
import com.halleyx.workflow.repository.WorkflowFieldRepository;
import com.halleyx.workflow.repository.WorkflowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class WorkflowService {

    @Autowired
    private RequestRepository requestRepository;

    @Autowired
    private StepRepository stepRepository;

    @Autowired
    private WorkflowFieldRepository workflowFieldRepository;

    @Autowired
    private WorkflowRepository workflowRepository;

    @Autowired
    private RuleEngine ruleEngine;

    public Workflow createWorkflow(Workflow workflow) {
        return workflowRepository.save(workflow);
    }

    public List<Workflow> getAllWorkflows() {
        return workflowRepository.findAll();
    }

    public Workflow getWorkflowById(Long id) {
        return workflowRepository.findById(id).orElse(null);
    }

    public void deleteWorkflow(Long id) {
        workflowRepository.deleteById(id);
    }

    public String evaluateStep(Step step, Map<String, Object> data) {

        if (step.getRules() == null || step.getRules().isEmpty()) {
            return step.getRole();
        }

        return ruleEngine.evaluate(step.getRules(), data);
    }
}