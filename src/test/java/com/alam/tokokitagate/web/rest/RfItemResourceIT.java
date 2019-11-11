package com.alam.tokokitagate.web.rest;

import com.alam.tokokitagate.TokoKitaGateApp;
import com.alam.tokokitagate.domain.RfItem;
import com.alam.tokokitagate.repository.RfItemRepository;
import com.alam.tokokitagate.repository.search.RfItemSearchRepository;
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
 * Integration tests for the {@link RfItemResource} REST controller.
 */
@SpringBootTest(classes = TokoKitaGateApp.class)
public class RfItemResourceIT {

    private static final String DEFAULT_ITEM_DESC = "AAAAAAAAAA";
    private static final String UPDATED_ITEM_DESC = "BBBBBBBBBB";

    private static final Integer DEFAULT_QTY = 1;
    private static final Integer UPDATED_QTY = 2;

    private static final Double DEFAULT_NET_PRICE = 1D;
    private static final Double UPDATED_NET_PRICE = 2D;

    private static final Double DEFAULT_SELL_PRICE = 1D;
    private static final Double UPDATED_SELL_PRICE = 2D;

    private static final Double DEFAULT_TAX = 1D;
    private static final Double UPDATED_TAX = 2D;

    private static final Boolean DEFAULT_ACTIVE = false;
    private static final Boolean UPDATED_ACTIVE = true;

    @Autowired
    private RfItemRepository rfItemRepository;

    /**
     * This repository is mocked in the com.alam.tokokitagate.repository.search test package.
     *
     * @see com.alam.tokokitagate.repository.search.RfItemSearchRepositoryMockConfiguration
     */
    @Autowired
    private RfItemSearchRepository mockRfItemSearchRepository;

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

    private MockMvc restRfItemMockMvc;

    private RfItem rfItem;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RfItemResource rfItemResource = new RfItemResource(rfItemRepository, mockRfItemSearchRepository);
        this.restRfItemMockMvc = MockMvcBuilders.standaloneSetup(rfItemResource)
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
    public static RfItem createEntity(EntityManager em) {
        RfItem rfItem = new RfItem()
            .itemDesc(DEFAULT_ITEM_DESC)
            .qty(DEFAULT_QTY)
            .netPrice(DEFAULT_NET_PRICE)
            .sellPrice(DEFAULT_SELL_PRICE)
            .tax(DEFAULT_TAX)
            .active(DEFAULT_ACTIVE);
        return rfItem;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RfItem createUpdatedEntity(EntityManager em) {
        RfItem rfItem = new RfItem()
            .itemDesc(UPDATED_ITEM_DESC)
            .qty(UPDATED_QTY)
            .netPrice(UPDATED_NET_PRICE)
            .sellPrice(UPDATED_SELL_PRICE)
            .tax(UPDATED_TAX)
            .active(UPDATED_ACTIVE);
        return rfItem;
    }

    @BeforeEach
    public void initTest() {
        rfItem = createEntity(em);
    }

    @Test
    @Transactional
    public void createRfItem() throws Exception {
        int databaseSizeBeforeCreate = rfItemRepository.findAll().size();

        // Create the RfItem
        restRfItemMockMvc.perform(post("/api/rf-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rfItem)))
            .andExpect(status().isCreated());

        // Validate the RfItem in the database
        List<RfItem> rfItemList = rfItemRepository.findAll();
        assertThat(rfItemList).hasSize(databaseSizeBeforeCreate + 1);
        RfItem testRfItem = rfItemList.get(rfItemList.size() - 1);
        assertThat(testRfItem.getItemDesc()).isEqualTo(DEFAULT_ITEM_DESC);
        assertThat(testRfItem.getQty()).isEqualTo(DEFAULT_QTY);
        assertThat(testRfItem.getNetPrice()).isEqualTo(DEFAULT_NET_PRICE);
        assertThat(testRfItem.getSellPrice()).isEqualTo(DEFAULT_SELL_PRICE);
        assertThat(testRfItem.getTax()).isEqualTo(DEFAULT_TAX);
        assertThat(testRfItem.isActive()).isEqualTo(DEFAULT_ACTIVE);

        // Validate the RfItem in Elasticsearch
        verify(mockRfItemSearchRepository, times(1)).save(testRfItem);
    }

    @Test
    @Transactional
    public void createRfItemWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = rfItemRepository.findAll().size();

        // Create the RfItem with an existing ID
        rfItem.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRfItemMockMvc.perform(post("/api/rf-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rfItem)))
            .andExpect(status().isBadRequest());

        // Validate the RfItem in the database
        List<RfItem> rfItemList = rfItemRepository.findAll();
        assertThat(rfItemList).hasSize(databaseSizeBeforeCreate);

        // Validate the RfItem in Elasticsearch
        verify(mockRfItemSearchRepository, times(0)).save(rfItem);
    }


    @Test
    @Transactional
    public void getAllRfItems() throws Exception {
        // Initialize the database
        rfItemRepository.saveAndFlush(rfItem);

        // Get all the rfItemList
        restRfItemMockMvc.perform(get("/api/rf-items?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(rfItem.getId().intValue())))
            .andExpect(jsonPath("$.[*].itemDesc").value(hasItem(DEFAULT_ITEM_DESC)))
            .andExpect(jsonPath("$.[*].qty").value(hasItem(DEFAULT_QTY)))
            .andExpect(jsonPath("$.[*].netPrice").value(hasItem(DEFAULT_NET_PRICE.doubleValue())))
            .andExpect(jsonPath("$.[*].sellPrice").value(hasItem(DEFAULT_SELL_PRICE.doubleValue())))
            .andExpect(jsonPath("$.[*].tax").value(hasItem(DEFAULT_TAX.doubleValue())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getRfItem() throws Exception {
        // Initialize the database
        rfItemRepository.saveAndFlush(rfItem);

        // Get the rfItem
        restRfItemMockMvc.perform(get("/api/rf-items/{id}", rfItem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(rfItem.getId().intValue()))
            .andExpect(jsonPath("$.itemDesc").value(DEFAULT_ITEM_DESC))
            .andExpect(jsonPath("$.qty").value(DEFAULT_QTY))
            .andExpect(jsonPath("$.netPrice").value(DEFAULT_NET_PRICE.doubleValue()))
            .andExpect(jsonPath("$.sellPrice").value(DEFAULT_SELL_PRICE.doubleValue()))
            .andExpect(jsonPath("$.tax").value(DEFAULT_TAX.doubleValue()))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingRfItem() throws Exception {
        // Get the rfItem
        restRfItemMockMvc.perform(get("/api/rf-items/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRfItem() throws Exception {
        // Initialize the database
        rfItemRepository.saveAndFlush(rfItem);

        int databaseSizeBeforeUpdate = rfItemRepository.findAll().size();

        // Update the rfItem
        RfItem updatedRfItem = rfItemRepository.findById(rfItem.getId()).get();
        // Disconnect from session so that the updates on updatedRfItem are not directly saved in db
        em.detach(updatedRfItem);
        updatedRfItem
            .itemDesc(UPDATED_ITEM_DESC)
            .qty(UPDATED_QTY)
            .netPrice(UPDATED_NET_PRICE)
            .sellPrice(UPDATED_SELL_PRICE)
            .tax(UPDATED_TAX)
            .active(UPDATED_ACTIVE);

        restRfItemMockMvc.perform(put("/api/rf-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRfItem)))
            .andExpect(status().isOk());

        // Validate the RfItem in the database
        List<RfItem> rfItemList = rfItemRepository.findAll();
        assertThat(rfItemList).hasSize(databaseSizeBeforeUpdate);
        RfItem testRfItem = rfItemList.get(rfItemList.size() - 1);
        assertThat(testRfItem.getItemDesc()).isEqualTo(UPDATED_ITEM_DESC);
        assertThat(testRfItem.getQty()).isEqualTo(UPDATED_QTY);
        assertThat(testRfItem.getNetPrice()).isEqualTo(UPDATED_NET_PRICE);
        assertThat(testRfItem.getSellPrice()).isEqualTo(UPDATED_SELL_PRICE);
        assertThat(testRfItem.getTax()).isEqualTo(UPDATED_TAX);
        assertThat(testRfItem.isActive()).isEqualTo(UPDATED_ACTIVE);

        // Validate the RfItem in Elasticsearch
        verify(mockRfItemSearchRepository, times(1)).save(testRfItem);
    }

    @Test
    @Transactional
    public void updateNonExistingRfItem() throws Exception {
        int databaseSizeBeforeUpdate = rfItemRepository.findAll().size();

        // Create the RfItem

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRfItemMockMvc.perform(put("/api/rf-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rfItem)))
            .andExpect(status().isBadRequest());

        // Validate the RfItem in the database
        List<RfItem> rfItemList = rfItemRepository.findAll();
        assertThat(rfItemList).hasSize(databaseSizeBeforeUpdate);

        // Validate the RfItem in Elasticsearch
        verify(mockRfItemSearchRepository, times(0)).save(rfItem);
    }

    @Test
    @Transactional
    public void deleteRfItem() throws Exception {
        // Initialize the database
        rfItemRepository.saveAndFlush(rfItem);

        int databaseSizeBeforeDelete = rfItemRepository.findAll().size();

        // Delete the rfItem
        restRfItemMockMvc.perform(delete("/api/rf-items/{id}", rfItem.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<RfItem> rfItemList = rfItemRepository.findAll();
        assertThat(rfItemList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the RfItem in Elasticsearch
        verify(mockRfItemSearchRepository, times(1)).deleteById(rfItem.getId());
    }

    @Test
    @Transactional
    public void searchRfItem() throws Exception {
        // Initialize the database
        rfItemRepository.saveAndFlush(rfItem);
        when(mockRfItemSearchRepository.search(queryStringQuery("id:" + rfItem.getId())))
            .thenReturn(Collections.singletonList(rfItem));
        // Search the rfItem
        restRfItemMockMvc.perform(get("/api/_search/rf-items?query=id:" + rfItem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(rfItem.getId().intValue())))
            .andExpect(jsonPath("$.[*].itemDesc").value(hasItem(DEFAULT_ITEM_DESC)))
            .andExpect(jsonPath("$.[*].qty").value(hasItem(DEFAULT_QTY)))
            .andExpect(jsonPath("$.[*].netPrice").value(hasItem(DEFAULT_NET_PRICE.doubleValue())))
            .andExpect(jsonPath("$.[*].sellPrice").value(hasItem(DEFAULT_SELL_PRICE.doubleValue())))
            .andExpect(jsonPath("$.[*].tax").value(hasItem(DEFAULT_TAX.doubleValue())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())));
    }
}
