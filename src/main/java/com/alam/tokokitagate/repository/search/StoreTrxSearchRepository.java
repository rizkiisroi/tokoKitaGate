package com.alam.tokokitagate.repository.search;
import com.alam.tokokitagate.domain.StoreTrx;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link StoreTrx} entity.
 */
public interface StoreTrxSearchRepository extends ElasticsearchRepository<StoreTrx, Long> {
}
