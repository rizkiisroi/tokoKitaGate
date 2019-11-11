package com.alam.tokokitagate.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link StoreTrxDetailsSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class StoreTrxDetailsSearchRepositoryMockConfiguration {

    @MockBean
    private StoreTrxDetailsSearchRepository mockStoreTrxDetailsSearchRepository;

}
