package com.alam.tokokitagate.web.rest;

import com.alam.tokokitagate.TokoKitaGateApp;
import com.alam.tokokitagate.domain.RfBranch;
import com.alam.tokokitagate.repository.RfBranchRepository;
import com.alam.tokokitagate.repository.search.RfBranchSearchRepository;
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
 * Integration tests for the {@link RfBranchResource} REST controller.
 */
@SpringBootTest(classes = TokoKitaGateApp.class)
public class RfBranchResourceIT {

    private static final String DEFAULT_BRANCH_NAME = "AAAAAAAAAA";
    private static final String UPDATED_BRANCH_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_BRANCH_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_BRANCH_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_BRANCH_CITY = "AAAAAAAAAA";
    private static final String UPDATED_BRANCH_CITY = "BBBBBBBBBB";

    private static final Long DEFAULT_BRANCH_PHONE = 1L;
    private static final Long UPDATED_BRANCH_PHONE = 2L;

    private static final String DEFAULT_REGISTERED_BY = "AAAAAAAAAA";
    private static final String UPDATED_REGISTERED_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_REGISTERED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_REGISTERED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_APPROVED_BY = "AAAAAAAAAA";
    private static final String UPDATED_APPROVED_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_APPROVED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_APPROVED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Boolean DEFAULT_ACTIVE = false;
    private static final Boolean UPDATED_ACTIVE = true;

    @Autowired
    private RfBranchRepository rfBranchRepository;

    /**
     * This repository is mocked in the com.alam.tokokitagate.repository.search test package.
     *
     * @see com.alam.tokokitagate.repository.search.RfBranchSearchRepositoryMockConfiguration
     */
    @Autowired
    private RfBranchSearchRepository mockRfBranchSearchRepository;

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

    private MockMvc restRfBranchMockMvc;

    private RfBranch rfBranch;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RfBranchResource rfBranchResource = new RfBranchResource(rfBranchRepository, mockRfBranchSearchRepository);
        this.restRfBranchMockMvc = MockMvcBuilders.standaloneSetup(rfBranchResource)
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
    public static RfBranch createEntity(EntityManager em) {
        RfBranch rfBranch = new RfBranch()
            .branchName(DEFAULT_BRANCH_NAME)
            .branchAddress(DEFAULT_BRANCH_ADDRESS)
            .branchCity(DEFAULT_BRANCH_CITY)
            .branchPhone(DEFAULT_BRANCH_PHONE)
            .registeredBy(DEFAULT_REGISTERED_BY)
            .registeredDate(DEFAULT_REGISTERED_DATE)
            .approvedBy(DEFAULT_APPROVED_BY)
            .approvedDate(DEFAULT_APPROVED_DATE)
            .active(DEFAULT_ACTIVE);
        return rfBranch;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RfBranch createUpdatedEntity(EntityManager em) {
        RfBranch rfBranch = new RfBranch()
            .branchName(UPDATED_BRANCH_NAME)
            .branchAddress(UPDATED_BRANCH_ADDRESS)
            .branchCity(UPDATED_BRANCH_CITY)
            .branchPhone(UPDATED_BRANCH_PHONE)
            .registeredBy(UPDATED_REGISTERED_BY)
            .registeredDate(UPDATED_REGISTERED_DATE)
            .approvedBy(UPDATED_APPROVED_BY)
            .approvedDate(UPDATED_APPROVED_DATE)
            .active(UPDATED_ACTIVE);
        return rfBranch;
    }

    @BeforeEach
    public void initTest() {
        rfBranch = createEntity(em);
    }

    @Test
    @Transactional
    public void createRfBranch() throws Exception {
        int databaseSizeBeforeCreate = rfBranchRepository.findAll().size();

        // Create the RfBranch
        restRfBranchMockMvc.perform(post("/api/rf-branches")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rfBranch)))
            .andExpect(status().isCreated());

        // Validate the RfBranch in the database
        List<RfBranch> rfBranchList = rfBranchRepository.findAll();
        assertThat(rfBranchList).hasSize(databaseSizeBeforeCreate + 1);
        RfBranch testRfBranch = rfBranchList.get(rfBranchList.size() - 1);
        assertThat(testRfBranch.getBranchName()).isEqualTo(DEFAULT_BRANCH_NAME);
        assertThat(testRfBranch.getBranchAddress()).isEqualTo(DEFAULT_BRANCH_ADDRESS);
        assertThat(testRfBranch.getBranchCity()).isEqualTo(DEFAULT_BRANCH_CITY);
        assertThat(testRfBranch.getBranchPhone()).isEqualTo(DEFAULT_BRANCH_PHONE);
        assertThat(testRfBranch.getRegisteredBy()).isEqualTo(DEFAULT_REGISTERED_BY);
        assertThat(testRfBranch.getRegisteredDate()).isEqualTo(DEFAULT_REGISTERED_DATE);
        assertThat(testRfBranch.getApprovedBy()).isEqualTo(DEFAULT_APPROVED_BY);
        assertThat(testRfBranch.getApprovedDate()).isEqualTo(DEFAULT_APPROVED_DATE);
        assertThat(testRfBranch.isActive()).isEqualTo(DEFAULT_ACTIVE);

        // Validate the RfBranch in Elasticsearch
        verify(mockRfBranchSearchRepository, times(1)).save(testRfBranch);
    }

    @Test
    @Transactional
    public void createRfBranchWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = rfBranchRepository.findAll().size();

        // Create the RfBranch with an existing ID
        rfBranch.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRfBranchMockMvc.perform(post("/api/rf-branches")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rfBranch)))
            .andExpect(status().isBadRequest());

        // Validate the RfBranch in the database
        List<RfBranch> rfBranchList = rfBranchRepository.findAll();
        assertThat(rfBranchList).hasSize(databaseSizeBeforeCreate);

        // Validate the RfBranch in Elasticsearch
        verify(mockRfBranchSearchRepository, times(0)).save(rfBranch);
    }


    @Test
    @Transactional
    public void getAllRfBranches() throws Exception {
        // Initialize the database
        rfBranchRepository.saveAndFlush(rfBranch);

        // Get all the rfBranchList
        restRfBranchMockMvc.perform(get("/api/rf-branches?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(rfBranch.getId().intValue())))
            .andExpect(jsonPath("$.[*].branchName").value(hasItem(DEFAULT_BRANCH_NAME)))
            .andExpect(jsonPath("$.[*].branchAddress").value(hasItem(DEFAULT_BRANCH_ADDRESS)))
            .andExpect(jsonPath("$.[*].branchCity").value(hasItem(DEFAULT_BRANCH_CITY)))
            .andExpect(jsonPath("$.[*].branchPhone").value(hasItem(DEFAULT_BRANCH_PHONE.intValue())))
            .andExpect(jsonPath("$.[*].registeredBy").value(hasItem(DEFAULT_REGISTERED_BY)))
            .andExpect(jsonPath("$.[*].registeredDate").value(hasItem(DEFAULT_REGISTERED_DATE.toString())))
            .andExpect(jsonPath("$.[*].approvedBy").value(hasItem(DEFAULT_APPROVED_BY)))
            .andExpect(jsonPath("$.[*].approvedDate").value(hasItem(DEFAULT_APPROVED_DATE.toString())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getRfBranch() throws Exception {
        // Initialize the database
        rfBranchRepository.saveAndFlush(rfBranch);

        // Get the rfBranch
        restRfBranchMockMvc.perform(get("/api/rf-branches/{id}", rfBranch.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(rfBranch.getId().intValue()))
            .andExpect(jsonPath("$.branchName").value(DEFAULT_BRANCH_NAME))
            .andExpect(jsonPath("$.branchAddress").value(DEFAULT_BRANCH_ADDRESS))
            .andExpect(jsonPath("$.branchCity").value(DEFAULT_BRANCH_CITY))
            .andExpect(jsonPath("$.branchPhone").value(DEFAULT_BRANCH_PHONE.intValue()))
            .andExpect(jsonPath("$.registeredBy").value(DEFAULT_REGISTERED_BY))
            .andExpect(jsonPath("$.registeredDate").value(DEFAULT_REGISTERED_DATE.toString()))
            .andExpect(jsonPath("$.approvedBy").value(DEFAULT_APPROVED_BY))
            .andExpect(jsonPath("$.approvedDate").value(DEFAULT_APPROVED_DATE.toString()))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingRfBranch() throws Exception {
        // Get the rfBranch
        restRfBranchMockMvc.perform(get("/api/rf-branches/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRfBranch() throws Exception {
        // Initialize the database
        rfBranchRepository.saveAndFlush(rfBranch);

        int databaseSizeBeforeUpdate = rfBranchRepository.findAll().size();

        // Update the rfBranch
        RfBranch updatedRfBranch = rfBranchRepository.findById(rfBranch.getId()).get();
        // Disconnect from session so that the updates on updatedRfBranch are not directly saved in db
        em.detach(updatedRfBranch);
        updatedRfBranch
            .branchName(UPDATED_BRANCH_NAME)
            .branchAddress(UPDATED_BRANCH_ADDRESS)
            .branchCity(UPDATED_BRANCH_CITY)
            .branchPhone(UPDATED_BRANCH_PHONE)
            .registeredBy(UPDATED_REGISTERED_BY)
            .registeredDate(UPDATED_REGISTERED_DATE)
            .approvedBy(UPDATED_APPROVED_BY)
            .approvedDate(UPDATED_APPROVED_DATE)
            .active(UPDATED_ACTIVE);

        restRfBranchMockMvc.perform(put("/api/rf-branches")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRfBranch)))
            .andExpect(status().isOk());

        // Validate the RfBranch in the database
        List<RfBranch> rfBranchList = rfBranchRepository.findAll();
        assertThat(rfBranchList).hasSize(databaseSizeBeforeUpdate);
        RfBranch testRfBranch = rfBranchList.get(rfBranchList.size() - 1);
        assertThat(testRfBranch.getBranchName()).isEqualTo(UPDATED_BRANCH_NAME);
        assertThat(testRfBranch.getBranchAddress()).isEqualTo(UPDATED_BRANCH_ADDRESS);
        assertThat(testRfBranch.getBranchCity()).isEqualTo(UPDATED_BRANCH_CITY);
        assertThat(testRfBranch.getBranchPhone()).isEqualTo(UPDATED_BRANCH_PHONE);
        assertThat(testRfBranch.getRegisteredBy()).isEqualTo(UPDATED_REGISTERED_BY);
        assertThat(testRfBranch.getRegisteredDate()).isEqualTo(UPDATED_REGISTERED_DATE);
        assertThat(testRfBranch.getApprovedBy()).isEqualTo(UPDATED_APPROVED_BY);
        assertThat(testRfBranch.getApprovedDate()).isEqualTo(UPDATED_APPROVED_DATE);
        assertThat(testRfBranch.isActive()).isEqualTo(UPDATED_ACTIVE);

        // Validate the RfBranch in Elasticsearch
        verify(mockRfBranchSearchRepository, times(1)).save(testRfBranch);
    }

    @Test
    @Transactional
    public void updateNonExistingRfBranch() throws Exception {
        int databaseSizeBeforeUpdate = rfBranchRepository.findAll().size();

        // Create the RfBranch

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRfBranchMockMvc.perform(put("/api/rf-branches")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rfBranch)))
            .andExpect(status().isBadRequest());

        // Validate the RfBranch in the database
        List<RfBranch> rfBranchList = rfBranchRepository.findAll();
        assertThat(rfBranchList).hasSize(databaseSizeBeforeUpdate);

        // Validate the RfBranch in Elasticsearch
        verify(mockRfBranchSearchRepository, times(0)).save(rfBranch);
    }

    @Test
    @Transactional
    public void deleteRfBranch() throws Exception {
        // Initialize the database
        rfBranchRepository.saveAndFlush(rfBranch);

        int databaseSizeBeforeDelete = rfBranchRepository.findAll().size();

        // Delete the rfBranch
        restRfBranchMockMvc.perform(delete("/api/rf-branches/{id}", rfBranch.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<RfBranch> rfBranchList = rfBranchRepository.findAll();
        assertThat(rfBranchList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the RfBranch in Elasticsearch
        verify(mockRfBranchSearchRepository, times(1)).deleteById(rfBranch.getId());
    }

    @Test
    @Transactional
    public void searchRfBranch() throws Exception {
        // Initialize the database
        rfBranchRepository.saveAndFlush(rfBranch);
        when(mockRfBranchSearchRepository.search(queryStringQuery("id:" + rfBranch.getId())))
            .thenReturn(Collections.singletonList(rfBranch));
        // Search the rfBranch
        restRfBranchMockMvc.perform(get("/api/_search/rf-branches?query=id:" + rfBranch.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(rfBranch.getId().intValue())))
            .andExpect(jsonPath("$.[*].branchName").value(hasItem(DEFAULT_BRANCH_NAME)))
            .andExpect(jsonPath("$.[*].branchAddress").value(hasItem(DEFAULT_BRANCH_ADDRESS)))
            .andExpect(jsonPath("$.[*].branchCity").value(hasItem(DEFAULT_BRANCH_CITY)))
            .andExpect(jsonPath("$.[*].branchPhone").value(hasItem(DEFAULT_BRANCH_PHONE.intValue())))
            .andExpect(jsonPath("$.[*].registeredBy").value(hasItem(DEFAULT_REGISTERED_BY)))
            .andExpect(jsonPath("$.[*].registeredDate").value(hasItem(DEFAULT_REGISTERED_DATE.toString())))
            .andExpect(jsonPath("$.[*].approvedBy").value(hasItem(DEFAULT_APPROVED_BY)))
            .andExpect(jsonPath("$.[*].approvedDate").value(hasItem(DEFAULT_APPROVED_DATE.toString())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())));
    }
}
