package com.alam.tokokitagate.repository.search;
import com.alam.tokokitagate.domain.RfItem;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link RfItem} entity.
 */
public interface RfItemSearchRepository extends ElasticsearchRepository<RfItem, Long> {
}
