package com.halleyx.workflow.controller;

import com.halleyx.workflow.model.Rule;
import com.halleyx.workflow.model.Step;
import com.halleyx.workflow.repository.StepRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rules")
@CrossOrigin
public class RuleController {

    @Autowired
    private StepRepository stepRepository;

    @PostMapping("/add/{stepId}")
    public Step addRulesToStep(@PathVariable Long stepId, @RequestBody List<Rule> rules) {

        Step step = stepRepository.findById(stepId)
                .orElseThrow(() -> new RuntimeException("Step not found"));

        if (rules == null || rules.isEmpty()) {
            throw new RuntimeException("Rules cannot be empty");
        }

        for (Rule rule : rules) {

            if (rule.getCondition() == null || rule.getCondition().isEmpty()) {
                rule.setCondition("DEFAULT");
            }

            if (rule.getNextStep() == null || rule.getNextStep().isEmpty()) {
                throw new RuntimeException("nextStep is required");
            }
        }

        step.setRules(rules);

        return stepRepository.save(step);
    }

    @GetMapping("/{stepId}")
    public List<Rule> getRulesByStep(@PathVariable Long stepId) {

        Step step = stepRepository.findById(stepId)
                .orElseThrow(() -> new RuntimeException("Step not found"));

        return step.getRules();
    }
}