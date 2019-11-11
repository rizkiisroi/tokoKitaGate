package com.alam.tokokitagate.repository.search;
import com.alam.tokokitagate.domain.RfCompany;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link RfCompany} entity.
 */
public interface RfCompanySearchRepository extends ElasticsearchRepository<RfCompany, Long> {
}
