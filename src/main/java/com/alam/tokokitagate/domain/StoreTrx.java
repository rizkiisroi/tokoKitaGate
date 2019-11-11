package com.alam.tokokitagate.domain;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A StoreTrx.
 */
@Entity
@Table(name = "store_trx")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "storetrx")
public class StoreTrx implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Column(name = "trx_amount")
    private Double trxAmount;

    @Column(name = "trx_method")
    private String trxMethod;

    @Column(name = "trx_by")
    private String trxBy;

    @Column(name = "trx_date")
    private Instant trxDate;

    @OneToOne(fetch = FetchType.LAZY)

    @JoinColumn(unique = true)
    private RfBranch rfBranch;

    @OneToMany(mappedBy = "storeTrx")
    private Set<StoreTrxDetails> storeTrxDetails = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getTrxAmount() {
        return trxAmount;
    }

    public StoreTrx trxAmount(Double trxAmount) {
        this.trxAmount = trxAmount;
        return this;
    }

    public void setTrxAmount(Double trxAmount) {
        this.trxAmount = trxAmount;
    }

    public String getTrxMethod() {
        return trxMethod;
    }

    public StoreTrx trxMethod(String trxMethod) {
        this.trxMethod = trxMethod;
        return this;
    }

    public void setTrxMethod(String trxMethod) {
        this.trxMethod = trxMethod;
    }

    public String getTrxBy() {
        return trxBy;
    }

    public StoreTrx trxBy(String trxBy) {
        this.trxBy = trxBy;
        return this;
    }

    public void setTrxBy(String trxBy) {
        this.trxBy = trxBy;
    }

    public Instant getTrxDate() {
        return trxDate;
    }

    public StoreTrx trxDate(Instant trxDate) {
        this.trxDate = trxDate;
        return this;
    }

    public void setTrxDate(Instant trxDate) {
        this.trxDate = trxDate;
    }

    public RfBranch getRfBranch() {
        return rfBranch;
    }

    public StoreTrx rfBranch(RfBranch rfBranch) {
        this.rfBranch = rfBranch;
        return this;
    }

    public void setRfBranch(RfBranch rfBranch) {
        this.rfBranch = rfBranch;
    }

    public Set<StoreTrxDetails> getStoreTrxDetails() {
        return storeTrxDetails;
    }

    public StoreTrx storeTrxDetails(Set<StoreTrxDetails> storeTrxDetails) {
        this.storeTrxDetails = storeTrxDetails;
        return this;
    }

    public StoreTrx addStoreTrxDetails(StoreTrxDetails storeTrxDetails) {
        this.storeTrxDetails.add(storeTrxDetails);
        storeTrxDetails.setStoreTrx(this);
        return this;
    }

    public StoreTrx removeStoreTrxDetails(StoreTrxDetails storeTrxDetails) {
        this.storeTrxDetails.remove(storeTrxDetails);
        storeTrxDetails.setStoreTrx(null);
        return this;
    }

    public void setStoreTrxDetails(Set<StoreTrxDetails> storeTrxDetails) {
        this.storeTrxDetails = storeTrxDetails;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof StoreTrx)) {
            return false;
        }
        return id != null && id.equals(((StoreTrx) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "StoreTrx{" +
            "id=" + getId() +
            ", trxAmount=" + getTrxAmount() +
            ", trxMethod='" + getTrxMethod() + "'" +
            ", trxBy='" + getTrxBy() + "'" +
            ", trxDate='" + getTrxDate() + "'" +
            "}";
    }
}
