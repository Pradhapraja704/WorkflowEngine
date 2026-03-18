package com.halleyx.workflow.model;

import jakarta.persistence.*;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Workflow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    @OneToMany(mappedBy = "workflow", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Step> steps;

    @OneToMany(mappedBy = "workflow", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Request> requests;

    @OneToMany(mappedBy = "workflow", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<WorkflowField> fields;

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public List<Step> getSteps() {
        return steps;
    }

    public List<Request> getRequests() {
        return requests;
    }

    public List<WorkflowField> getFields() {
        return fields;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setSteps(List<Step> steps) {
        this.steps = steps;
    }

    public void setRequests(List<Request> requests) {
        this.requests = requests;
    }

    public void setFields(List<WorkflowField> fields) {
        this.fields = fields;
    }
}