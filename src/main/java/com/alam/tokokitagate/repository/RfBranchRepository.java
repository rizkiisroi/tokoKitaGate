package com.alam.tokokitagate.repository;
import com.alam.tokokitagate.domain.RfBranch;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the RfBranch entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RfBranchRepository extends JpaRepository<RfBranch, Long> {

}
