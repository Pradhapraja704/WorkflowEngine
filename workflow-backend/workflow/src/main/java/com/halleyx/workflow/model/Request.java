package com.halleyx.workflow.model;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Request {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String requestData;

    private String status;

    private int currentStep;

    private LocalDateTime submittedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workflow_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Workflow workflow;


    private String amount;
    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }
    public Long getId() {
        return id;
    }

    public String getRequestData() {
        return requestData;
    }

    public String getStatus() {
        return status;
    }

    public int getCurrentStep() {
        return currentStep;
    }

    public LocalDateTime getSubmittedAt() {
        return submittedAt;
    }

    public User getUser() {
        return user;
    }

    public Workflow getWorkflow() {
        return workflow;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setRequestData(String requestData) {
        this.requestData = requestData;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setCurrentStep(int currentStep) {
        this.currentStep = currentStep;
    }

    public void setSubmittedAt(LocalDateTime submittedAt) {
        this.submittedAt = submittedAt;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setWorkflow(Workflow workflow) {
        this.workflow = workflow;
    }
}