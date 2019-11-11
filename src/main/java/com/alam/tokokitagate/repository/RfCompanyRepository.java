package com.alam.tokokitagate.repository;
import com.alam.tokokitagate.domain.RfCompany;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the RfCompany entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RfCompanyRepository extends JpaRepository<RfCompany, Long> {

}
