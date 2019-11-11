package com.alam.tokokitagate.web.rest;

import com.alam.tokokitagate.TokoKitaGateApp;
import com.alam.tokokitagate.domain.RfCompany;
import com.alam.tokokitagate.repository.RfCompanyRepository;
import com.alam.tokokitagate.repository.search.RfCompanySearchRepository;
import com.alam.tokokitagate.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.List;

import static com.alam.tokokitagate.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link RfCompanyResource} REST controller.
 */
@SpringBootTest(classes = TokoKitaGateApp.class)
public class RfCompanyResourceIT {

    private static final String DEFAULT_COMPANY_NAME = "AAAAAAAAAA";
    private static final String UPDATED_COMPANY_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_REGISTERED_BY = "AAAAAAAAAA";
    private static final String UPDATED_REGISTERED_BY = "BBBBBBBBBB";

    private static final String DEFAULT_REGISTERED_DATE = "AAAAAAAAAA";
    private static final String UPDATED_REGISTERED_DATE = "BBBBBBBBBB";

    private static final String DEFAULT_APPROVED_BY = "AAAAAAAAAA";
    private static final String UPDATED_APPROVED_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_APPROVED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_APPROVED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Boolean DEFAULT_ACTIVE = false;
    private static final Boolean UPDATED_ACTIVE = true;

    @Autowired
    private RfCompanyRepository rfCompanyRepository;

    /**
     * This repository is mocked in the com.alam.tokokitagate.repository.search test package.
     *
     * @see com.alam.tokokitagate.repository.search.RfCompanySearchRepositoryMockConfiguration
     */
    @Autowired
    private RfCompanySearchRepository mockRfCompanySearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restRfCompanyMockMvc;

    private RfCompany rfCompany;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RfCompanyResource rfCompanyResource = new RfCompanyResource(rfCompanyRepository, mockRfCompanySearchRepository);
        this.restRfCompanyMockMvc = MockMvcBuilders.standaloneSetup(rfCompanyResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RfCompany createEntity(EntityManager em) {
        RfCompany rfCompany = new RfCompany()
            .companyName(DEFAULT_COMPANY_NAME)
            .registeredBy(DEFAULT_REGISTERED_BY)
            .registeredDate(DEFAULT_REGISTERED_DATE)
            .approvedBy(DEFAULT_APPROVED_BY)
            .approvedDate(DEFAULT_APPROVED_DATE)
            .active(DEFAULT_ACTIVE);
        return rfCompany;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RfCompany createUpdatedEntity(EntityManager em) {
        RfCompany rfCompany = new RfCompany()
            .companyName(UPDATED_COMPANY_NAME)
            .registeredBy(UPDATED_REGISTERED_BY)
            .registeredDate(UPDATED_REGISTERED_DATE)
            .approvedBy(UPDATED_APPROVED_BY)
            .approvedDate(UPDATED_APPROVED_DATE)
            .active(UPDATED_ACTIVE);
        return rfCompany;
    }

    @BeforeEach
    public void initTest() {
        rfCompany = createEntity(em);
    }

    @Test
    @Transactional
    public void createRfCompany() throws Exception {
        int databaseSizeBeforeCreate = rfCompanyRepository.findAll().size();

        // Create the RfCompany
        restRfCompanyMockMvc.perform(post("/api/rf-companies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rfCompany)))
            .andExpect(status().isCreated());

        // Validate the RfCompany in the database
        List<RfCompany> rfCompanyList = rfCompanyRepository.findAll();
        assertThat(rfCompanyList).hasSize(databaseSizeBeforeCreate + 1);
        RfCompany testRfCompany = rfCompanyList.get(rfCompanyList.size() - 1);
        assertThat(testRfCompany.getCompanyName()).isEqualTo(DEFAULT_COMPANY_NAME);
        assertThat(testRfCompany.getRegisteredBy()).isEqualTo(DEFAULT_REGISTERED_BY);
        assertThat(testRfCompany.getRegisteredDate()).isEqualTo(DEFAULT_REGISTERED_DATE);
        assertThat(testRfCompany.getApprovedBy()).isEqualTo(DEFAULT_APPROVED_BY);
        assertThat(testRfCompany.getApprovedDate()).isEqualTo(DEFAULT_APPROVED_DATE);
        assertThat(testRfCompany.isActive()).isEqualTo(DEFAULT_ACTIVE);

        // Validate the RfCompany in Elasticsearch
        verify(mockRfCompanySearchRepository, times(1)).save(testRfCompany);
    }

    @Test
    @Transactional
    public void createRfCompanyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = rfCompanyRepository.findAll().size();

        // Create the RfCompany with an existing ID
        rfCompany.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRfCompanyMockMvc.perform(post("/api/rf-companies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rfCompany)))
            .andExpect(status().isBadRequest());

        // Validate the RfCompany in the database
        List<RfCompany> rfCompanyList = rfCompanyRepository.findAll();
        assertThat(rfCompanyList).hasSize(databaseSizeBeforeCreate);

        // Validate the RfCompany in Elasticsearch
        verify(mockRfCompanySearchRepository, times(0)).save(rfCompany);
    }


    @Test
    @Transactional
    public void getAllRfCompanies() throws Exception {
        // Initialize the database
        rfCompanyRepository.saveAndFlush(rfCompany);

        // Get all the rfCompanyList
        restRfCompanyMockMvc.perform(get("/api/rf-companies?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(rfCompany.getId().intValue())))
            .andExpect(jsonPath("$.[*].companyName").value(hasItem(DEFAULT_COMPANY_NAME)))
            .andExpect(jsonPath("$.[*].registeredBy").value(hasItem(DEFAULT_REGISTERED_BY)))
            .andExpect(jsonPath("$.[*].registeredDate").value(hasItem(DEFAULT_REGISTERED_DATE)))
            .andExpect(jsonPath("$.[*].approvedBy").value(hasItem(DEFAULT_APPROVED_BY)))
            .andExpect(jsonPath("$.[*].approvedDate").value(hasItem(DEFAULT_APPROVED_DATE.toString())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getRfCompany() throws Exception {
        // Initialize the database
        rfCompanyRepository.saveAndFlush(rfCompany);

        // Get the rfCompany
        restRfCompanyMockMvc.perform(get("/api/rf-companies/{id}", rfCompany.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(rfCompany.getId().intValue()))
            .andExpect(jsonPath("$.companyName").value(DEFAULT_COMPANY_NAME))
            .andExpect(jsonPath("$.registeredBy").value(DEFAULT_REGISTERED_BY))
            .andExpect(jsonPath("$.registeredDate").value(DEFAULT_REGISTERED_DATE))
            .andExpect(jsonPath("$.approvedBy").value(DEFAULT_APPROVED_BY))
            .andExpect(jsonPath("$.approvedDate").value(DEFAULT_APPROVED_DATE.toString()))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingRfCompany() throws Exception {
        // Get the rfCompany
        restRfCompanyMockMvc.perform(get("/api/rf-companies/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRfCompany() throws Exception {
        // Initialize the database
        rfCompanyRepository.saveAndFlush(rfCompany);

        int databaseSizeBeforeUpdate = rfCompanyRepository.findAll().size();

        // Update the rfCompany
        RfCompany updatedRfCompany = rfCompanyRepository.findById(rfCompany.getId()).get();
        // Disconnect from session so that the updates on updatedRfCompany are not directly saved in db
        em.detach(updatedRfCompany);
        updatedRfCompany
            .companyName(UPDATED_COMPANY_NAME)
            .registeredBy(UPDATED_REGISTERED_BY)
            .registeredDate(UPDATED_REGISTERED_DATE)
            .approvedBy(UPDATED_APPROVED_BY)
            .approvedDate(UPDATED_APPROVED_DATE)
            .active(UPDATED_ACTIVE);

        restRfCompanyMockMvc.perform(put("/api/rf-companies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRfCompany)))
            .andExpect(status().isOk());

        // Validate the RfCompany in the database
        List<RfCompany> rfCompanyList = rfCompanyRepository.findAll();
        assertThat(rfCompanyList).hasSize(databaseSizeBeforeUpdate);
        RfCompany testRfCompany = rfCompanyList.get(rfCompanyList.size() - 1);
        assertThat(testRfCompany.getCompanyName()).isEqualTo(UPDATED_COMPANY_NAME);
        assertThat(testRfCompany.getRegisteredBy()).isEqualTo(UPDATED_REGISTERED_BY);
        assertThat(testRfCompany.getRegisteredDate()).isEqualTo(UPDATED_REGISTERED_DATE);
        assertThat(testRfCompany.getApprovedBy()).isEqualTo(UPDATED_APPROVED_BY);
        assertThat(testRfCompany.getApprovedDate()).isEqualTo(UPDATED_APPROVED_DATE);
        assertThat(testRfCompany.isActive()).isEqualTo(UPDATED_ACTIVE);

        // Validate the RfCompany in Elasticsearch
        verify(mockRfCompanySearchRepository, times(1)).save(testRfCompany);
    }

    @Test
    @Transactional
    public void updateNonExistingRfCompany() throws Exception {
        int databaseSizeBeforeUpdate = rfCompanyRepository.findAll().size();

        // Create the RfCompany

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRfCompanyMockMvc.perform(put("/api/rf-companies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rfCompany)))
            .andExpect(status().isBadRequest());

        // Validate the RfCompany in the database
        List<RfCompany> rfCompanyList = rfCompanyRepository.findAll();
        assertThat(rfCompanyList).hasSize(databaseSizeBeforeUpdate);

        // Validate the RfCompany in Elasticsearch
        verify(mockRfCompanySearchRepository, times(0)).save(rfCompany);
    }

    @Test
    @Transactional
    public void deleteRfCompany() throws Exception {
        // Initialize the database
        rfCompanyRepository.saveAndFlush(rfCompany);

        int databaseSizeBeforeDelete = rfCompanyRepository.findAll().size();

        // Delete the rfCompany
        restRfCompanyMockMvc.perform(delete("/api/rf-companies/{id}", rfCompany.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<RfCompany> rfCompanyList = rfCompanyRepository.findAll();
        assertThat(rfCompanyList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the RfCompany in Elasticsearch
        verify(mockRfCompanySearchRepository, times(1)).deleteById(rfCompany.getId());
    }

    @Test
    @Transactional
    public void searchRfCompany() throws Exception {
        // Initialize the database
        rfCompanyRepository.saveAndFlush(rfCompany);
        when(mockRfCompanySearchRepository.search(queryStringQuery("id:" + rfCompany.getId())))
            .thenReturn(Collections.singletonList(rfCompany));
        // Search the rfCompany
        restRfCompanyMockMvc.perform(get("/api/_search/rf-companies?query=id:" + rfCompany.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(rfCompany.getId().intValue())))
            .andExpect(jsonPath("$.[*].companyName").value(hasItem(DEFAULT_COMPANY_NAME)))
            .andExpect(jsonPath("$.[*].registeredBy").value(hasItem(DEFAULT_REGISTERED_BY)))
            .andExpect(jsonPath("$.[*].registeredDate").value(hasItem(DEFAULT_REGISTERED_DATE)))
            .andExpect(jsonPath("$.[*].approvedBy").value(hasItem(DEFAULT_APPROVED_BY)))
            .andExpect(jsonPath("$.[*].approvedDate").value(hasItem(DEFAULT_APPROVED_DATE.toString())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())));
    }
}
