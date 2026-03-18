package com.halleyx.workflow.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.halleyx.workflow.model.Request;
import com.halleyx.workflow.model.Step;
import com.halleyx.workflow.repository.StepRepository;
import com.halleyx.workflow.service.RequestService;
import com.halleyx.workflow.service.WorkflowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/requests")
@CrossOrigin(origins = "*")
public class RequestController {

    @Autowired
    private RequestService requestService;

    @Autowired
    private StepRepository stepRepository;

    @Autowired
    private WorkflowService workflowService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @PostMapping
    public Request createRequest(@RequestBody Request request) {
        return requestService.createRequest(request);
    }

    @GetMapping
    public List<Request> getAllRequests() {
        return requestService.getAllRequests();
    }

    @PutMapping("/{id}/approve")
    public Request approveRequest(
            @PathVariable Long id,
            @RequestParam String role
    ) {
        return requestService.approveRequest(id, role);
    }

    @PutMapping("/{id}/reject")
    public Request rejectRequest(
            @PathVariable Long id,
            @RequestParam String role
    ) {
        return requestService.rejectRequest(id, role);
    }

    @DeleteMapping("/{id}")
    public void deleteRequest(@PathVariable Long id) {
        requestService.deleteRequest(id);
    }

    @GetMapping("/{id}/current-approver")
    public String getCurrentApprover(@PathVariable Long id) {

        Request request = requestService.getAllRequests()
                .stream()
                .filter(r -> r.getId().equals(id))
                .findFirst()
                .orElse(null);

        if (request == null) return "NOT_FOUND";

        List<Step> steps =
                stepRepository.findByWorkflow_IdOrderByStepOrder(
                        request.getWorkflow().getId());

        if (request.getCurrentStep() > steps.size()) {
            return "COMPLETED";
        }

        Step current = steps.get(request.getCurrentStep() - 1);

        if (!current.getStepType().equalsIgnoreCase("APPROVAL")) {
            return "AUTO_STEP";
        }

        try {

            Map<String, Object> data =
                    objectMapper.readValue(request.getRequestData(),
                            new TypeReference<Map<String, Object>>() {});

            if (request.getAmount() != null) {
                data.put("amount", Double.parseDouble(request.getAmount()));
            }

            return workflowService.evaluateStep(current, data);

        } catch (Exception e) {
            return "ERROR";
        }
    }
}