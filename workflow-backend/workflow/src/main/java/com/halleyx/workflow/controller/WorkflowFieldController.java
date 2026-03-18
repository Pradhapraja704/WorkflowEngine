package com.halleyx.workflow.controller;

import com.halleyx.workflow.model.WorkflowField;
import com.halleyx.workflow.service.WorkflowFieldService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/workflow-fields")
@CrossOrigin(origins = "*")
public class WorkflowFieldController {

    @Autowired
    private WorkflowFieldService workflowFieldService;

    @PostMapping
    public WorkflowField createField(@RequestBody WorkflowField field) {
        return workflowFieldService.createField(field);
    }

    @GetMapping("/workflow/{workflowId}")
    public List<WorkflowField> getFields(@PathVariable Long workflowId) {
        return workflowFieldService.getFieldsByWorkflow(workflowId);
    }

    @DeleteMapping("/{id}")
    public void deleteField(@PathVariable Long id) {
        workflowFieldService.deleteField(id);
    }
}