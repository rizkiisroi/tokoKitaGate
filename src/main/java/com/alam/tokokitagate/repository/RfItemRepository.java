package com.alam.tokokitagate.repository;
import com.alam.tokokitagate.domain.RfItem;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the RfItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RfItemRepository extends JpaRepository<RfItem, Long> {

}
