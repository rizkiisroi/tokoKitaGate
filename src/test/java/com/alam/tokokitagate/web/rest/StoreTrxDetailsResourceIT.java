package com.alam.tokokitagate.web.rest;

import com.alam.tokokitagate.TokoKitaGateApp;
import com.alam.tokokitagate.domain.StoreTrxDetails;
import com.alam.tokokitagate.repository.StoreTrxDetailsRepository;
import com.alam.tokokitagate.repository.search.StoreTrxDetailsSearchRepository;
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
 * Integration tests for the {@link StoreTrxDetailsResource} REST controller.
 */
@SpringBootTest(classes = TokoKitaGateApp.class)
public class StoreTrxDetailsResourceIT {

    private static final String DEFAULT_ITEM_ID = "AAAAAAAAAA";
    private static final String UPDATED_ITEM_ID = "BBBBBBBBBB";

    private static final Double DEFAULT_FINAL_PRICE = 1D;
    private static final Double UPDATED_FINAL_PRICE = 2D;

    private static final Double DEFAULT_DISCOUNT = 1D;
    private static final Double UPDATED_DISCOUNT = 2D;

    @Autowired
    private StoreTrxDetailsRepository storeTrxDetailsRepository;

    /**
     * This repository is mocked in the com.alam.tokokitagate.repository.search test package.
     *
     * @see com.alam.tokokitagate.repository.search.StoreTrxDetailsSearchRepositoryMockConfiguration
     */
    @Autowired
    private StoreTrxDetailsSearchRepository mockStoreTrxDetailsSearchRepository;

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

    private MockMvc restStoreTrxDetailsMockMvc;

    private StoreTrxDetails storeTrxDetails;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StoreTrxDetailsResource storeTrxDetailsResource = new StoreTrxDetailsResource(storeTrxDetailsRepository, mockStoreTrxDetailsSearchRepository);
        this.restStoreTrxDetailsMockMvc = MockMvcBuilders.standaloneSetup(storeTrxDetailsResource)
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
    public static StoreTrxDetails createEntity(EntityManager em) {
        StoreTrxDetails storeTrxDetails = new StoreTrxDetails()
            .itemId(DEFAULT_ITEM_ID)
            .finalPrice(DEFAULT_FINAL_PRICE)
            .discount(DEFAULT_DISCOUNT);
        return storeTrxDetails;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StoreTrxDetails createUpdatedEntity(EntityManager em) {
        StoreTrxDetails storeTrxDetails = new StoreTrxDetails()
            .itemId(UPDATED_ITEM_ID)
            .finalPrice(UPDATED_FINAL_PRICE)
            .discount(UPDATED_DISCOUNT);
        return storeTrxDetails;
    }

    @BeforeEach
    public void initTest() {
        storeTrxDetails = createEntity(em);
    }

    @Test
    @Transactional
    public void createStoreTrxDetails() throws Exception {
        int databaseSizeBeforeCreate = storeTrxDetailsRepository.findAll().size();

        // Create the StoreTrxDetails
        restStoreTrxDetailsMockMvc.perform(post("/api/store-trx-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(storeTrxDetails)))
            .andExpect(status().isCreated());

        // Validate the StoreTrxDetails in the database
        List<StoreTrxDetails> storeTrxDetailsList = storeTrxDetailsRepository.findAll();
        assertThat(storeTrxDetailsList).hasSize(databaseSizeBeforeCreate + 1);
        StoreTrxDetails testStoreTrxDetails = storeTrxDetailsList.get(storeTrxDetailsList.size() - 1);
        assertThat(testStoreTrxDetails.getItemId()).isEqualTo(DEFAULT_ITEM_ID);
        assertThat(testStoreTrxDetails.getFinalPrice()).isEqualTo(DEFAULT_FINAL_PRICE);
        assertThat(testStoreTrxDetails.getDiscount()).isEqualTo(DEFAULT_DISCOUNT);

        // Validate the StoreTrxDetails in Elasticsearch
        verify(mockStoreTrxDetailsSearchRepository, times(1)).save(testStoreTrxDetails);
    }

    @Test
    @Transactional
    public void createStoreTrxDetailsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = storeTrxDetailsRepository.findAll().size();

        // Create the StoreTrxDetails with an existing ID
        storeTrxDetails.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStoreTrxDetailsMockMvc.perform(post("/api/store-trx-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(storeTrxDetails)))
            .andExpect(status().isBadRequest());

        // Validate the StoreTrxDetails in the database
        List<StoreTrxDetails> storeTrxDetailsList = storeTrxDetailsRepository.findAll();
        assertThat(storeTrxDetailsList).hasSize(databaseSizeBeforeCreate);

        // Validate the StoreTrxDetails in Elasticsearch
        verify(mockStoreTrxDetailsSearchRepository, times(0)).save(storeTrxDetails);
    }


    @Test
    @Transactional
    public void checkItemIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = storeTrxDetailsRepository.findAll().size();
        // set the field null
        storeTrxDetails.setItemId(null);

        // Create the StoreTrxDetails, which fails.

        restStoreTrxDetailsMockMvc.perform(post("/api/store-trx-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(storeTrxDetails)))
            .andExpect(status().isBadRequest());

        List<StoreTrxDetails> storeTrxDetailsList = storeTrxDetailsRepository.findAll();
        assertThat(storeTrxDetailsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllStoreTrxDetails() throws Exception {
        // Initialize the database
        storeTrxDetailsRepository.saveAndFlush(storeTrxDetails);

        // Get all the storeTrxDetailsList
        restStoreTrxDetailsMockMvc.perform(get("/api/store-trx-details?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(storeTrxDetails.getId().intValue())))
            .andExpect(jsonPath("$.[*].itemId").value(hasItem(DEFAULT_ITEM_ID)))
            .andExpect(jsonPath("$.[*].finalPrice").value(hasItem(DEFAULT_FINAL_PRICE.doubleValue())))
            .andExpect(jsonPath("$.[*].discount").value(hasItem(DEFAULT_DISCOUNT.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getStoreTrxDetails() throws Exception {
        // Initialize the database
        storeTrxDetailsRepository.saveAndFlush(storeTrxDetails);

        // Get the storeTrxDetails
        restStoreTrxDetailsMockMvc.perform(get("/api/store-trx-details/{id}", storeTrxDetails.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(storeTrxDetails.getId().intValue()))
            .andExpect(jsonPath("$.itemId").value(DEFAULT_ITEM_ID))
            .andExpect(jsonPath("$.finalPrice").value(DEFAULT_FINAL_PRICE.doubleValue()))
            .andExpect(jsonPath("$.discount").value(DEFAULT_DISCOUNT.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingStoreTrxDetails() throws Exception {
        // Get the storeTrxDetails
        restStoreTrxDetailsMockMvc.perform(get("/api/store-trx-details/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStoreTrxDetails() throws Exception {
        // Initialize the database
        storeTrxDetailsRepository.saveAndFlush(storeTrxDetails);

        int databaseSizeBeforeUpdate = storeTrxDetailsRepository.findAll().size();

        // Update the storeTrxDetails
        StoreTrxDetails updatedStoreTrxDetails = storeTrxDetailsRepository.findById(storeTrxDetails.getId()).get();
        // Disconnect from session so that the updates on updatedStoreTrxDetails are not directly saved in db
        em.detach(updatedStoreTrxDetails);
        updatedStoreTrxDetails
            .itemId(UPDATED_ITEM_ID)
            .finalPrice(UPDATED_FINAL_PRICE)
            .discount(UPDATED_DISCOUNT);

        restStoreTrxDetailsMockMvc.perform(put("/api/store-trx-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedStoreTrxDetails)))
            .andExpect(status().isOk());

        // Validate the StoreTrxDetails in the database
        List<StoreTrxDetails> storeTrxDetailsList = storeTrxDetailsRepository.findAll();
        assertThat(storeTrxDetailsList).hasSize(databaseSizeBeforeUpdate);
        StoreTrxDetails testStoreTrxDetails = storeTrxDetailsList.get(storeTrxDetailsList.size() - 1);
        assertThat(testStoreTrxDetails.getItemId()).isEqualTo(UPDATED_ITEM_ID);
        assertThat(testStoreTrxDetails.getFinalPrice()).isEqualTo(UPDATED_FINAL_PRICE);
        assertThat(testStoreTrxDetails.getDiscount()).isEqualTo(UPDATED_DISCOUNT);

        // Validate the StoreTrxDetails in Elasticsearch
        verify(mockStoreTrxDetailsSearchRepository, times(1)).save(testStoreTrxDetails);
    }

    @Test
    @Transactional
    public void updateNonExistingStoreTrxDetails() throws Exception {
        int databaseSizeBeforeUpdate = storeTrxDetailsRepository.findAll().size();

        // Create the StoreTrxDetails

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStoreTrxDetailsMockMvc.perform(put("/api/store-trx-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(storeTrxDetails)))
            .andExpect(status().isBadRequest());

        // Validate the StoreTrxDetails in the database
        List<StoreTrxDetails> storeTrxDetailsList = storeTrxDetailsRepository.findAll();
        assertThat(storeTrxDetailsList).hasSize(databaseSizeBeforeUpdate);

        // Validate the StoreTrxDetails in Elasticsearch
        verify(mockStoreTrxDetailsSearchRepository, times(0)).save(storeTrxDetails);
    }

    @Test
    @Transactional
    public void deleteStoreTrxDetails() throws Exception {
        // Initialize the database
        storeTrxDetailsRepository.saveAndFlush(storeTrxDetails);

        int databaseSizeBeforeDelete = storeTrxDetailsRepository.findAll().size();

        // Delete the storeTrxDetails
        restStoreTrxDetailsMockMvc.perform(delete("/api/store-trx-details/{id}", storeTrxDetails.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<StoreTrxDetails> storeTrxDetailsList = storeTrxDetailsRepository.findAll();
        assertThat(storeTrxDetailsList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the StoreTrxDetails in Elasticsearch
        verify(mockStoreTrxDetailsSearchRepository, times(1)).deleteById(storeTrxDetails.getId());
    }

    @Test
    @Transactional
    public void searchStoreTrxDetails() throws Exception {
        // Initialize the database
        storeTrxDetailsRepository.saveAndFlush(storeTrxDetails);
        when(mockStoreTrxDetailsSearchRepository.search(queryStringQuery("id:" + storeTrxDetails.getId())))
            .thenReturn(Collections.singletonList(storeTrxDetails));
        // Search the storeTrxDetails
        restStoreTrxDetailsMockMvc.perform(get("/api/_search/store-trx-details?query=id:" + storeTrxDetails.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(storeTrxDetails.getId().intValue())))
            .andExpect(jsonPath("$.[*].itemId").value(hasItem(DEFAULT_ITEM_ID)))
            .andExpect(jsonPath("$.[*].finalPrice").value(hasItem(DEFAULT_FINAL_PRICE.doubleValue())))
            .andExpect(jsonPath("$.[*].discount").value(hasItem(DEFAULT_DISCOUNT.doubleValue())));
    }
}
