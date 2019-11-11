package com.alam.tokokitagate.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A RfBranch.
 */
@Entity
@Table(name = "rf_branch")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "rfbranch")
public class RfBranch implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Column(name = "branch_name")
    private String branchName;

    @Column(name = "branch_address")
    private String branchAddress;

    @Column(name = "branch_city")
    private String branchCity;

    @Column(name = "branch_phone")
    private Long branchPhone;

    @Column(name = "registered_by")
    private String registeredBy;

    @Column(name = "registered_date")
    private Instant registeredDate;

    @Column(name = "approved_by")
    private String approvedBy;

    @Column(name = "approved_date")
    private Instant approvedDate;

    @Column(name = "active")
    private Boolean active;

    @OneToMany(mappedBy = "rfBranch")
    private Set<RfCompany> rfCompanies = new HashSet<>();

    @OneToOne(mappedBy = "rfBranch")
    @JsonIgnore
    private RfItem rfItem;

    @OneToOne(mappedBy = "rfBranch")
    @JsonIgnore
    private StoreTrx storeTrx;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBranchName() {
        return branchName;
    }

    public RfBranch branchName(String branchName) {
        this.branchName = branchName;
        return this;
    }

    public void setBranchName(String branchName) {
        this.branchName = branchName;
    }

    public String getBranchAddress() {
        return branchAddress;
    }

    public RfBranch branchAddress(String branchAddress) {
        this.branchAddress = branchAddress;
        return this;
    }

    public void setBranchAddress(String branchAddress) {
        this.branchAddress = branchAddress;
    }

    public String getBranchCity() {
        return branchCity;
    }

    public RfBranch branchCity(String branchCity) {
        this.branchCity = branchCity;
        return this;
    }

    public void setBranchCity(String branchCity) {
        this.branchCity = branchCity;
    }

    public Long getBranchPhone() {
        return branchPhone;
    }

    public RfBranch branchPhone(Long branchPhone) {
        this.branchPhone = branchPhone;
        return this;
    }

    public void setBranchPhone(Long branchPhone) {
        this.branchPhone = branchPhone;
    }

    public String getRegisteredBy() {
        return registeredBy;
    }

    public RfBranch registeredBy(String registeredBy) {
        this.registeredBy = registeredBy;
        return this;
    }

    public void setRegisteredBy(String registeredBy) {
        this.registeredBy = registeredBy;
    }

    public Instant getRegisteredDate() {
        return registeredDate;
    }

    public RfBranch registeredDate(Instant registeredDate) {
        this.registeredDate = registeredDate;
        return this;
    }

    public void setRegisteredDate(Instant registeredDate) {
        this.registeredDate = registeredDate;
    }

    public String getApprovedBy() {
        return approvedBy;
    }

    public RfBranch approvedBy(String approvedBy) {
        this.approvedBy = approvedBy;
        return this;
    }

    public void setApprovedBy(String approvedBy) {
        this.approvedBy = approvedBy;
    }

    public Instant getApprovedDate() {
        return approvedDate;
    }

    public RfBranch approvedDate(Instant approvedDate) {
        this.approvedDate = approvedDate;
        return this;
    }

    public void setApprovedDate(Instant approvedDate) {
        this.approvedDate = approvedDate;
    }

    public Boolean isActive() {
        return active;
    }

    public RfBranch active(Boolean active) {
        this.active = active;
        return this;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Set<RfCompany> getRfCompanies() {
        return rfCompanies;
    }

    public RfBranch rfCompanies(Set<RfCompany> rfCompanies) {
        this.rfCompanies = rfCompanies;
        return this;
    }

    public RfBranch addRfCompany(RfCompany rfCompany) {
        this.rfCompanies.add(rfCompany);
        rfCompany.setRfBranch(this);
        return this;
    }

    public RfBranch removeRfCompany(RfCompany rfCompany) {
        this.rfCompanies.remove(rfCompany);
        rfCompany.setRfBranch(null);
        return this;
    }

    public void setRfCompanies(Set<RfCompany> rfCompanies) {
        this.rfCompanies = rfCompanies;
    }

    public RfItem getRfItem() {
        return rfItem;
    }

    public RfBranch rfItem(RfItem rfItem) {
        this.rfItem = rfItem;
        return this;
    }

    public void setRfItem(RfItem rfItem) {
        this.rfItem = rfItem;
    }

    public StoreTrx getStoreTrx() {
        return storeTrx;
    }

    public RfBranch storeTrx(StoreTrx storeTrx) {
        this.storeTrx = storeTrx;
        return this;
    }

    public void setStoreTrx(StoreTrx storeTrx) {
        this.storeTrx = storeTrx;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RfBranch)) {
            return false;
        }
        return id != null && id.equals(((RfBranch) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "RfBranch{" +
            "id=" + getId() +
            ", branchName='" + getBranchName() + "'" +
            ", branchAddress='" + getBranchAddress() + "'" +
            ", branchCity='" + getBranchCity() + "'" +
            ", branchPhone=" + getBranchPhone() +
            ", registeredBy='" + getRegisteredBy() + "'" +
            ", registeredDate='" + getRegisteredDate() + "'" +
            ", approvedBy='" + getApprovedBy() + "'" +
            ", approvedDate='" + getApprovedDate() + "'" +
            ", active='" + isActive() + "'" +
            "}";
    }
}
