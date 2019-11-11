package com.alam.tokokitagate.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link RfBranchSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class RfBranchSearchRepositoryMockConfiguration {

    @MockBean
    private RfBranchSearchRepository mockRfBranchSearchRepository;

}
