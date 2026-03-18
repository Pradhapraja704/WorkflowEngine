package com.halleyx.workflow.controller;

import com.halleyx.workflow.model.Step;
import com.halleyx.workflow.service.StepService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/steps")
@CrossOrigin(origins = "*")
public class StepController {

    @Autowired
    private StepService stepService;

    @PostMapping
    public Step createStep(@RequestBody Step step) {
        return stepService.createStep(step);
    }

    @GetMapping("/workflow/{workflowId}")
    public List<Step> getSteps(@PathVariable Long workflowId) {
        return stepService.getStepsByWorkflow(workflowId);
    }

    @DeleteMapping("/{id}")
    public void deleteStep(@PathVariable Long id) {
        stepService.deleteStep(id);
    }
}