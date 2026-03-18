package com.halleyx.workflow.service;
import com.halleyx.workflow.model.Step;
import com.halleyx.workflow.model.Workflow;
import com.halleyx.workflow.repository.StepRepository;
import com.halleyx.workflow.repository.WorkflowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StepService {

    @Autowired
    private StepRepository stepRepository;

    @Autowired
    private WorkflowRepository workflowRepository;

    public List<Step> getAllSteps() {
        return stepRepository.findAll();
    }

    public Step createStep(Step step) {

        if (step.getWorkflow() == null || step.getWorkflow().getId() == null) {
            throw new RuntimeException("Workflow ID missing");
        }

        Workflow workflow = workflowRepository.findById(step.getWorkflow().getId())
                .orElseThrow(() -> new RuntimeException("Workflow not found"));

        step.setWorkflow(workflow);

        return stepRepository.save(step);
    }

    public List<Step> getStepsByWorkflow(Long workflowId) {
        return stepRepository.findByWorkflow_IdOrderByStepOrder(workflowId);
    }

    public void deleteStep(Long id) {
        stepRepository.deleteById(id);
    }
}