package com.halleyx.workflow.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.halleyx.workflow.model.ExecutionLog;
import com.halleyx.workflow.model.Request;
import com.halleyx.workflow.model.Step;
import com.halleyx.workflow.model.WorkflowField;
import com.halleyx.workflow.repository.ExecutionLogRepository;
import com.halleyx.workflow.repository.RequestRepository;
import com.halleyx.workflow.repository.StepRepository;
import com.halleyx.workflow.repository.WorkflowFieldRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class RequestService {

    @Autowired
    private RequestRepository requestRepository;

    @Autowired
    private WorkflowService workflowService;

    @Autowired
    private StepRepository stepRepository;

    @Autowired
    private ExecutionLogRepository executionLogRepository;

    @Autowired
    private WorkflowFieldRepository workflowFieldRepository;

    private final ObjectMapper objectMapper = new ObjectMapper();

    public Request createRequest(Request request) {

        validateRequestData(request);

        request.setStatus("PENDING");
        request.setCurrentStep(1);
        request.setSubmittedAt(LocalDateTime.now());

        return requestRepository.save(request);
    }

    public List<Request> getAllRequests() {
        return requestRepository.findAll();
    }

    private void validateRequestData(Request request) {

        if (request.getWorkflow() == null || request.getWorkflow().getId() == null) {
            throw new RuntimeException("Workflow is missing");
        }

        List<WorkflowField> fields =
                workflowFieldRepository.getFieldsByWorkflow(
                        request.getWorkflow().getId());

        String data = request.getRequestData();

        if (data == null || data.isEmpty()) {
            throw new RuntimeException("Request data is missing");
        }

        for (WorkflowField field : fields) {

            if (field.isRequired()) {

                if (!data.contains("\"" + field.getFieldName() + "\"")) {
                    throw new RuntimeException(
                            "Missing required field: " + field.getFieldName());
                }
            }
        }
    }

    public void deleteRequest(Long id) {

        Request request = requestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        executionLogRepository.deleteAll(
                executionLogRepository.findByRequest(request)
        );

        requestRepository.delete(request);
    }

    public Request approveRequest(Long requestId, String approverRole) {

        Request request = requestRepository.findById(requestId).orElse(null);
        if (request == null) return null;

        List<Step> steps =
                stepRepository.findByWorkflow_IdOrderByStepOrder(
                        request.getWorkflow().getId());

        if (request.getCurrentStep() > steps.size()) {
            return request;
        }

        Step current = steps.get(request.getCurrentStep() - 1);

        if (!current.getStepType().equalsIgnoreCase("APPROVAL")) {
            request.setCurrentStep(request.getCurrentStep() + 1);
            return requestRepository.save(request);
        }

        Map<String, Object> data = parseRequestData(request);

        String nextRole = workflowService.evaluateStep(current, data);

        if (!nextRole.equalsIgnoreCase(approverRole)) {
            throw new RuntimeException("Unauthorized approver");
        }

        ExecutionLog log = new ExecutionLog();
        log.setRequest(request);
        log.setApproverRole(approverRole);
        log.setStepOrder(request.getCurrentStep());
        log.setApprovedAt(LocalDateTime.now());

        executionLogRepository.save(log);

        request.setCurrentStep(request.getCurrentStep() + 1);

        if (request.getCurrentStep() > steps.size()) {
            request.setStatus("APPROVED");
        }

        return requestRepository.save(request);
    }

    private Map<String, Object> parseRequestData(Request request) {
        try {
            Map<String, Object> data =
                    objectMapper.readValue(request.getRequestData(),
                            new TypeReference<Map<String, Object>>() {});

            if (request.getAmount() != null) {
                data.put("amount", Double.parseDouble(request.getAmount()));
            }

            return data;

        } catch (Exception e) {
            throw new RuntimeException("Invalid requestData JSON");
        }
    }

    public Request rejectRequest(Long requestId, String approverRole) {

        Request request = requestRepository.findById(requestId).orElse(null);
        if (request == null) return null;

        List<Step> steps =
                stepRepository.findByWorkflow_IdOrderByStepOrder(
                        request.getWorkflow().getId());

        Step current = steps.get(request.getCurrentStep() - 1);

        if (!current.getRole().equalsIgnoreCase(approverRole)) {
            throw new RuntimeException("Unauthorized approver");
        }

        ExecutionLog log = new ExecutionLog();
        log.setRequest(request);
        log.setApproverRole(approverRole);
        log.setStepOrder(current.getStepOrder());
        log.setApprovedAt(LocalDateTime.now());

        executionLogRepository.save(log);

        request.setStatus("REJECTED");

        return requestRepository.save(request);
    }
}