package com.alam.tokokitagate.repository.search;
import com.alam.tokokitagate.domain.RfBranch;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link RfBranch} entity.
 */
public interface RfBranchSearchRepository extends ElasticsearchRepository<RfBranch, Long> {
}
