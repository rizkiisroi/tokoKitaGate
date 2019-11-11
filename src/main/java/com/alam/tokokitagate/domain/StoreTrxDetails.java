package com.alam.tokokitagate.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

/**
 * A StoreTrxDetails.
 */
@Entity
@Table(name = "store_trx_details")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "storetrxdetails")
public class StoreTrxDetails implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @NotNull
    @Size(max = 100)
    @Column(name = "item_id", length = 100, nullable = false, unique = true)
    private String itemId;

    @Column(name = "final_price")
    private Double finalPrice;

    @Column(name = "discount")
    private Double discount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties("storeTrxDetails")
    private StoreTrx storeTrx;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getItemId() {
        return itemId;
    }

    public StoreTrxDetails itemId(String itemId) {
        this.itemId = itemId;
        return this;
    }

    public void setItemId(String itemId) {
        this.itemId = itemId;
    }

    public Double getFinalPrice() {
        return finalPrice;
    }

    public StoreTrxDetails finalPrice(Double finalPrice) {
        this.finalPrice = finalPrice;
        return this;
    }

    public void setFinalPrice(Double finalPrice) {
        this.finalPrice = finalPrice;
    }

    public Double getDiscount() {
        return discount;
    }

    public StoreTrxDetails discount(Double discount) {
        this.discount = discount;
        return this;
    }

    public void setDiscount(Double discount) {
        this.discount = discount;
    }

    public StoreTrx getStoreTrx() {
        return storeTrx;
    }

    public StoreTrxDetails storeTrx(StoreTrx storeTrx) {
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
        if (!(o instanceof StoreTrxDetails)) {
            return false;
        }
        return id != null && id.equals(((StoreTrxDetails) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "StoreTrxDetails{" +
            "id=" + getId() +
            ", itemId='" + getItemId() + "'" +
            ", finalPrice=" + getFinalPrice() +
            ", discount=" + getDiscount() +
            "}";
    }
}
