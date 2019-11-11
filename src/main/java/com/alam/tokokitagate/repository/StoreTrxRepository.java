package com.alam.tokokitagate.repository;
import com.alam.tokokitagate.domain.StoreTrx;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the StoreTrx entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StoreTrxRepository extends JpaRepository<StoreTrx, Long> {

}
