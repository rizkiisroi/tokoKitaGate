package com.alam.tokokitagate.repository;
import com.alam.tokokitagate.domain.StoreTrxDetails;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the StoreTrxDetails entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StoreTrxDetailsRepository extends JpaRepository<StoreTrxDetails, Long> {

}
