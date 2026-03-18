package com.halleyx.workflow.service;

import com.halleyx.workflow.model.Workflow;
import com.halleyx.workflow.model.WorkflowField;
import com.halleyx.workflow.repository.WorkflowFieldRepository;
import com.halleyx.workflow.repository.WorkflowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkflowFieldService {

    @Autowired
    private WorkflowFieldRepository workflowFieldRepository;

    @Autowired
    private WorkflowRepository workflowRepository;

    public WorkflowField createField(WorkflowField field) {

        Long workflowId = field.getWorkflow().getId();

        Workflow workflow = workflowRepository.findById(workflowId)
                .orElseThrow(() -> new RuntimeException("Workflow not found"));

        field.setWorkflow(workflow);

        return workflowFieldRepository.save(field);
    }

    public List<WorkflowField> getFieldsByWorkflow(Long workflowId) {
        return workflowFieldRepository.getFieldsByWorkflow(workflowId);
    }

    public void deleteField(Long id) {
        workflowFieldRepository.deleteById(id);
    }
}