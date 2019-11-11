package com.alam.tokokitagate.web.rest;

import com.alam.tokokitagate.TokoKitaGateApp;
import com.alam.tokokitagate.domain.StoreTrx;
import com.alam.tokokitagate.repository.StoreTrxRepository;
import com.alam.tokokitagate.repository.search.StoreTrxSearchRepository;
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
 * Integration tests for the {@link StoreTrxResource} REST controller.
 */
@SpringBootTest(classes = TokoKitaGateApp.class)
public class StoreTrxResourceIT {

    private static final Double DEFAULT_TRX_AMOUNT = 1D;
    private static final Double UPDATED_TRX_AMOUNT = 2D;

    private static final String DEFAULT_TRX_METHOD = "AAAAAAAAAA";
    private static final String UPDATED_TRX_METHOD = "BBBBBBBBBB";

    private static final String DEFAULT_TRX_BY = "AAAAAAAAAA";
    private static final String UPDATED_TRX_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_TRX_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_TRX_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private StoreTrxRepository storeTrxRepository;

    /**
     * This repository is mocked in the com.alam.tokokitagate.repository.search test package.
     *
     * @see com.alam.tokokitagate.repository.search.StoreTrxSearchRepositoryMockConfiguration
     */
    @Autowired
    private StoreTrxSearchRepository mockStoreTrxSearchRepository;

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

    private MockMvc restStoreTrxMockMvc;

    private StoreTrx storeTrx;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StoreTrxResource storeTrxResource = new StoreTrxResource(storeTrxRepository, mockStoreTrxSearchRepository);
        this.restStoreTrxMockMvc = MockMvcBuilders.standaloneSetup(storeTrxResource)
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
    public static StoreTrx createEntity(EntityManager em) {
        StoreTrx storeTrx = new StoreTrx()
            .trxAmount(DEFAULT_TRX_AMOUNT)
            .trxMethod(DEFAULT_TRX_METHOD)
            .trxBy(DEFAULT_TRX_BY)
            .trxDate(DEFAULT_TRX_DATE);
        return storeTrx;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StoreTrx createUpdatedEntity(EntityManager em) {
        StoreTrx storeTrx = new StoreTrx()
            .trxAmount(UPDATED_TRX_AMOUNT)
            .trxMethod(UPDATED_TRX_METHOD)
            .trxBy(UPDATED_TRX_BY)
            .trxDate(UPDATED_TRX_DATE);
        return storeTrx;
    }

    @BeforeEach
    public void initTest() {
        storeTrx = createEntity(em);
    }

    @Test
    @Transactional
    public void createStoreTrx() throws Exception {
        int databaseSizeBeforeCreate = storeTrxRepository.findAll().size();

        // Create the StoreTrx
        restStoreTrxMockMvc.perform(post("/api/store-trxes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(storeTrx)))
            .andExpect(status().isCreated());

        // Validate the StoreTrx in the database
        List<StoreTrx> storeTrxList = storeTrxRepository.findAll();
        assertThat(storeTrxList).hasSize(databaseSizeBeforeCreate + 1);
        StoreTrx testStoreTrx = storeTrxList.get(storeTrxList.size() - 1);
        assertThat(testStoreTrx.getTrxAmount()).isEqualTo(DEFAULT_TRX_AMOUNT);
        assertThat(testStoreTrx.getTrxMethod()).isEqualTo(DEFAULT_TRX_METHOD);
        assertThat(testStoreTrx.getTrxBy()).isEqualTo(DEFAULT_TRX_BY);
        assertThat(testStoreTrx.getTrxDate()).isEqualTo(DEFAULT_TRX_DATE);

        // Validate the StoreTrx in Elasticsearch
        verify(mockStoreTrxSearchRepository, times(1)).save(testStoreTrx);
    }

    @Test
    @Transactional
    public void createStoreTrxWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = storeTrxRepository.findAll().size();

        // Create the StoreTrx with an existing ID
        storeTrx.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStoreTrxMockMvc.perform(post("/api/store-trxes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(storeTrx)))
            .andExpect(status().isBadRequest());

        // Validate the StoreTrx in the database
        List<StoreTrx> storeTrxList = storeTrxRepository.findAll();
        assertThat(storeTrxList).hasSize(databaseSizeBeforeCreate);

        // Validate the StoreTrx in Elasticsearch
        verify(mockStoreTrxSearchRepository, times(0)).save(storeTrx);
    }


    @Test
    @Transactional
    public void getAllStoreTrxes() throws Exception {
        // Initialize the database
        storeTrxRepository.saveAndFlush(storeTrx);

        // Get all the storeTrxList
        restStoreTrxMockMvc.perform(get("/api/store-trxes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(storeTrx.getId().intValue())))
            .andExpect(jsonPath("$.[*].trxAmount").value(hasItem(DEFAULT_TRX_AMOUNT.doubleValue())))
            .andExpect(jsonPath("$.[*].trxMethod").value(hasItem(DEFAULT_TRX_METHOD)))
            .andExpect(jsonPath("$.[*].trxBy").value(hasItem(DEFAULT_TRX_BY)))
            .andExpect(jsonPath("$.[*].trxDate").value(hasItem(DEFAULT_TRX_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getStoreTrx() throws Exception {
        // Initialize the database
        storeTrxRepository.saveAndFlush(storeTrx);

        // Get the storeTrx
        restStoreTrxMockMvc.perform(get("/api/store-trxes/{id}", storeTrx.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(storeTrx.getId().intValue()))
            .andExpect(jsonPath("$.trxAmount").value(DEFAULT_TRX_AMOUNT.doubleValue()))
            .andExpect(jsonPath("$.trxMethod").value(DEFAULT_TRX_METHOD))
            .andExpect(jsonPath("$.trxBy").value(DEFAULT_TRX_BY))
            .andExpect(jsonPath("$.trxDate").value(DEFAULT_TRX_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingStoreTrx() throws Exception {
        // Get the storeTrx
        restStoreTrxMockMvc.perform(get("/api/store-trxes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStoreTrx() throws Exception {
        // Initialize the database
        storeTrxRepository.saveAndFlush(storeTrx);

        int databaseSizeBeforeUpdate = storeTrxRepository.findAll().size();

        // Update the storeTrx
        StoreTrx updatedStoreTrx = storeTrxRepository.findById(storeTrx.getId()).get();
        // Disconnect from session so that the updates on updatedStoreTrx are not directly saved in db
        em.detach(updatedStoreTrx);
        updatedStoreTrx
            .trxAmount(UPDATED_TRX_AMOUNT)
            .trxMethod(UPDATED_TRX_METHOD)
            .trxBy(UPDATED_TRX_BY)
            .trxDate(UPDATED_TRX_DATE);

        restStoreTrxMockMvc.perform(put("/api/store-trxes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedStoreTrx)))
            .andExpect(status().isOk());

        // Validate the StoreTrx in the database
        List<StoreTrx> storeTrxList = storeTrxRepository.findAll();
        assertThat(storeTrxList).hasSize(databaseSizeBeforeUpdate);
        StoreTrx testStoreTrx = storeTrxList.get(storeTrxList.size() - 1);
        assertThat(testStoreTrx.getTrxAmount()).isEqualTo(UPDATED_TRX_AMOUNT);
        assertThat(testStoreTrx.getTrxMethod()).isEqualTo(UPDATED_TRX_METHOD);
        assertThat(testStoreTrx.getTrxBy()).isEqualTo(UPDATED_TRX_BY);
        assertThat(testStoreTrx.getTrxDate()).isEqualTo(UPDATED_TRX_DATE);

        // Validate the StoreTrx in Elasticsearch
        verify(mockStoreTrxSearchRepository, times(1)).save(testStoreTrx);
    }

    @Test
    @Transactional
    public void updateNonExistingStoreTrx() throws Exception {
        int databaseSizeBeforeUpdate = storeTrxRepository.findAll().size();

        // Create the StoreTrx

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStoreTrxMockMvc.perform(put("/api/store-trxes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(storeTrx)))
            .andExpect(status().isBadRequest());

        // Validate the StoreTrx in the database
        List<StoreTrx> storeTrxList = storeTrxRepository.findAll();
        assertThat(storeTrxList).hasSize(databaseSizeBeforeUpdate);

        // Validate the StoreTrx in Elasticsearch
        verify(mockStoreTrxSearchRepository, times(0)).save(storeTrx);
    }

    @Test
    @Transactional
    public void deleteStoreTrx() throws Exception {
        // Initialize the database
        storeTrxRepository.saveAndFlush(storeTrx);

        int databaseSizeBeforeDelete = storeTrxRepository.findAll().size();

        // Delete the storeTrx
        restStoreTrxMockMvc.perform(delete("/api/store-trxes/{id}", storeTrx.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<StoreTrx> storeTrxList = storeTrxRepository.findAll();
        assertThat(storeTrxList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the StoreTrx in Elasticsearch
        verify(mockStoreTrxSearchRepository, times(1)).deleteById(storeTrx.getId());
    }

    @Test
    @Transactional
    public void searchStoreTrx() throws Exception {
        // Initialize the database
        storeTrxRepository.saveAndFlush(storeTrx);
        when(mockStoreTrxSearchRepository.search(queryStringQuery("id:" + storeTrx.getId())))
            .thenReturn(Collections.singletonList(storeTrx));
        // Search the storeTrx
        restStoreTrxMockMvc.perform(get("/api/_search/store-trxes?query=id:" + storeTrx.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(storeTrx.getId().intValue())))
            .andExpect(jsonPath("$.[*].trxAmount").value(hasItem(DEFAULT_TRX_AMOUNT.doubleValue())))
            .andExpect(jsonPath("$.[*].trxMethod").value(hasItem(DEFAULT_TRX_METHOD)))
            .andExpect(jsonPath("$.[*].trxBy").value(hasItem(DEFAULT_TRX_BY)))
            .andExpect(jsonPath("$.[*].trxDate").value(hasItem(DEFAULT_TRX_DATE.toString())));
    }
}
