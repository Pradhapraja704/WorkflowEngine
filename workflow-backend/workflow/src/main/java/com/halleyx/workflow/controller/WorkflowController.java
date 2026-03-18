package com.halleyx.workflow.controller;

import com.halleyx.workflow.model.Workflow;
import com.halleyx.workflow.service.WorkflowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/workflows")
@CrossOrigin(origins = "*")
public class WorkflowController {

    @Autowired
    private WorkflowService workflowService;

    @PostMapping
    public Workflow createWorkflow(@RequestBody Workflow workflow) {
        return workflowService.createWorkflow(workflow);
    }

    @GetMapping
    public List<Workflow> getAllWorkflows() {
        return workflowService.getAllWorkflows();
    }
    @DeleteMapping("/{id}")
    public void deleteWorkflow(@PathVariable Long id) {
        workflowService.deleteWorkflow(id);
    }
}