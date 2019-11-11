package com.alam.tokokitagate.repository.search;
import com.alam.tokokitagate.domain.StoreTrxDetails;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link StoreTrxDetails} entity.
 */
public interface StoreTrxDetailsSearchRepository extends ElasticsearchRepository<StoreTrxDetails, Long> {
}
