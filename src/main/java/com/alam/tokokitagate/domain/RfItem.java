package com.alam.tokokitagate.domain;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

/**
 * A RfItem.
 */
@Entity
@Table(name = "rf_item")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "rfitem")
public class RfItem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Column(name = "item_desc")
    private String itemDesc;

    @Column(name = "qty")
    private Integer qty;

    @Column(name = "net_price")
    private Double netPrice;

    @Column(name = "sell_price")
    private Double sellPrice;

    @Column(name = "tax")
    private Double tax;

    @Column(name = "active")
    private Boolean active;

    @OneToOne(fetch = FetchType.LAZY)

    @JoinColumn(unique = true)
    private RfBranch rfBranch;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getItemDesc() {
        return itemDesc;
    }

    public RfItem itemDesc(String itemDesc) {
        this.itemDesc = itemDesc;
        return this;
    }

    public void setItemDesc(String itemDesc) {
        this.itemDesc = itemDesc;
    }

    public Integer getQty() {
        return qty;
    }

    public RfItem qty(Integer qty) {
        this.qty = qty;
        return this;
    }

    public void setQty(Integer qty) {
        this.qty = qty;
    }

    public Double getNetPrice() {
        return netPrice;
    }

    public RfItem netPrice(Double netPrice) {
        this.netPrice = netPrice;
        return this;
    }

    public void setNetPrice(Double netPrice) {
        this.netPrice = netPrice;
    }

    public Double getSellPrice() {
        return sellPrice;
    }

    public RfItem sellPrice(Double sellPrice) {
        this.sellPrice = sellPrice;
        return this;
    }

    public void setSellPrice(Double sellPrice) {
        this.sellPrice = sellPrice;
    }

    public Double getTax() {
        return tax;
    }

    public RfItem tax(Double tax) {
        this.tax = tax;
        return this;
    }

    public void setTax(Double tax) {
        this.tax = tax;
    }

    public Boolean isActive() {
        return active;
    }

    public RfItem active(Boolean active) {
        this.active = active;
        return this;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public RfBranch getRfBranch() {
        return rfBranch;
    }

    public RfItem rfBranch(RfBranch rfBranch) {
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
        if (!(o instanceof RfItem)) {
            return false;
        }
        return id != null && id.equals(((RfItem) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "RfItem{" +
            "id=" + getId() +
            ", itemDesc='" + getItemDesc() + "'" +
            ", qty=" + getQty() +
            ", netPrice=" + getNetPrice() +
            ", sellPrice=" + getSellPrice() +
            ", tax=" + getTax() +
            ", active='" + isActive() + "'" +
            "}";
    }
}
