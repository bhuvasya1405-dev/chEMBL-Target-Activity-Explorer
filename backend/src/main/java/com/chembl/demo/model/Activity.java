package com.chembl.demo.model;

public class Activity {

    private String moleculeId;
    private String type;
    private String value;

    public Activity(String moleculeId, String type, String value) {
        this.moleculeId = moleculeId;
        this.type = type;
        this.value = value;
    }

    public String getMoleculeId() {
        return moleculeId;
    }

    public String getType() {
        return type;
    }

    public String getValue() {
        return value;
    }
}