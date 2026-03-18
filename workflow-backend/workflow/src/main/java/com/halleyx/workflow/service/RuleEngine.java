package com.halleyx.workflow.service;

import com.halleyx.workflow.model.Rule;
import org.mvel2.MVEL;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public class RuleEngine {

    public String evaluate(List<Rule> rules, Map<String, Object> data) {

        if (rules == null || rules.isEmpty()) {
            throw new RuntimeException("No rules found");
        }

        rules.sort((a, b) -> Integer.compare(a.getPriority(), b.getPriority()));

        for (Rule rule : rules) {

            boolean matched = evaluateCondition(rule.getCondition(), data);

            if (matched) {
                return rule.getNextStep();
            }
        }

        throw new RuntimeException("No rule matched (add DEFAULT rule)");
    }

    private boolean evaluateCondition(String condition, Map<String, Object> data) {

        if (condition == null || condition.equalsIgnoreCase("DEFAULT")) {
            return true;
        }

        try {
            return MVEL.evalToBoolean(condition, data);
        } catch (Exception e) {
            throw new RuntimeException("Invalid condition: " + condition);
        }
    }
}