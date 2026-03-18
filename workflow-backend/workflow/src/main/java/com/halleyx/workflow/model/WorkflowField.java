package com.halleyx.workflow.model;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
public class WorkflowField {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fieldName;

    private String fieldType;

    private boolean required;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workflow_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Workflow workflow;

    public Long getId() {
        return id;
    }

    public String getFieldName() {
        return fieldName;
    }

    public String getFieldType() {
        return fieldType;
    }

    public boolean isRequired() {
        return required;
    }

    public Workflow getWorkflow() {
        return workflow;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setFieldName(String fieldName) {
        this.fieldName = fieldName;
    }

    public void setFieldType(String fieldType) {
        this.fieldType = fieldType;
    }

    public void setRequired(boolean required) {
        this.required = required;
    }

    public void setWorkflow(Workflow workflow) {
        this.workflow = workflow;
    }
}