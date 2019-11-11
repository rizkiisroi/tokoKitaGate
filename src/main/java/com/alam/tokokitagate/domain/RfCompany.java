package com.alam.tokokitagate.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.time.Instant;

/**
 * A RfCompany.
 */
@Entity
@Table(name = "rf_company")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "rfcompany")
public class RfCompany implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Column(name = "company_name")
    private String companyName;

    @Column(name = "registered_by")
    private String registeredBy;

    @Column(name = "registered_date")
    private String registeredDate;

    @Column(name = "approved_by")
    private String approvedBy;

    @Column(name = "approved_date")
    private Instant approvedDate;

    @Column(name = "active")
    private Boolean active;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties("rfCompanies")
    private RfBranch rfBranch;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public RfCompany companyName(String companyName) {
        this.companyName = companyName;
        return this;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getRegisteredBy() {
        return registeredBy;
    }

    public RfCompany registeredBy(String registeredBy) {
        this.registeredBy = registeredBy;
        return this;
    }

    public void setRegisteredBy(String registeredBy) {
        this.registeredBy = registeredBy;
    }

    public String getRegisteredDate() {
        return registeredDate;
    }

    public RfCompany registeredDate(String registeredDate) {
        this.registeredDate = registeredDate;
        return this;
    }

    public void setRegisteredDate(String registeredDate) {
        this.registeredDate = registeredDate;
    }

    public String getApprovedBy() {
        return approvedBy;
    }

    public RfCompany approvedBy(String approvedBy) {
        this.approvedBy = approvedBy;
        return this;
    }

    public void setApprovedBy(String approvedBy) {
        this.approvedBy = approvedBy;
    }

    public Instant getApprovedDate() {
        return approvedDate;
    }

    public RfCompany approvedDate(Instant approvedDate) {
        this.approvedDate = approvedDate;
        return this;
    }

    public void setApprovedDate(Instant approvedDate) {
        this.approvedDate = approvedDate;
    }

    public Boolean isActive() {
        return active;
    }

    public RfCompany active(Boolean active) {
        this.active = active;
        return this;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public RfBranch getRfBranch() {
        return rfBranch;
    }

    public RfCompany rfBranch(RfBranch rfBranch) {
        this.rfBranch = rfBranch;
        return this;
    }

    public void setRfBranch(RfBranch rfBranch) {
        this.rfBranch = rfBranch;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RfCompany)) {
            return false;
        }
        return id != null && id.equals(((RfCompany) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "RfCompany{" +
            "id=" + getId() +
            ", companyName='" + getCompanyName() + "'" +
            ", registeredBy='" + getRegisteredBy() + "'" +
            ", registeredDate='" + getRegisteredDate() + "'" +
            ", approvedBy='" + getApprovedBy() + "'" +
            ", approvedDate='" + getApprovedDate() + "'" +
            ", active='" + isActive() + "'" +
            "}";
    }
}
