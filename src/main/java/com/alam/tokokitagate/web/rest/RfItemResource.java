package com.alam.tokokitagate.web.rest;

import com.alam.tokokitagate.domain.RfItem;
import com.alam.tokokitagate.repository.RfItemRepository;
import com.alam.tokokitagate.repository.search.RfItemSearchRepository;
import com.alam.tokokitagate.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link com.alam.tokokitagate.domain.RfItem}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class RfItemResource {

    private final Logger log = LoggerFactory.getLogger(RfItemResource.class);

    private static final String ENTITY_NAME = "rfItem";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RfItemRepository rfItemRepository;

    private final RfItemSearchRepository rfItemSearchRepository;

    public RfItemResource(RfItemRepository rfItemRepository, RfItemSearchRepository rfItemSearchRepository) {
        this.rfItemRepository = rfItemRepository;
        this.rfItemSearchRepository = rfItemSearchRepository;
    }

    /**
     * {@code POST  /rf-items} : Create a new rfItem.
     *
     * @param rfItem the rfItem to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new rfItem, or with status {@code 400 (Bad Request)} if the rfItem has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/rf-items")
    public ResponseEntity<RfItem> createRfItem(@RequestBody RfItem rfItem) throws URISyntaxException {
        log.debug("REST request to save RfItem : {}", rfItem);
        if (rfItem.getId() != null) {
            throw new BadRequestAlertException("A new rfItem cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RfItem result = rfItemRepository.save(rfItem);
        rfItemSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/rf-items/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /rf-items} : Updates an existing rfItem.
     *
     * @param rfItem the rfItem to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated rfItem,
     * or with status {@code 400 (Bad Request)} if the rfItem is not valid,
     * or with status {@code 500 (Internal Server Error)} if the rfItem couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/rf-items")
    public ResponseEntity<RfItem> updateRfItem(@RequestBody RfItem rfItem) throws URISyntaxException {
        log.debug("REST request to update RfItem : {}", rfItem);
        if (rfItem.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RfItem result = rfItemRepository.save(rfItem);
        rfItemSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, rfItem.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /rf-items} : get all the rfItems.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of rfItems in body.
     */
    @GetMapping("/rf-items")
    public List<RfItem> getAllRfItems() {
        log.debug("REST request to get all RfItems");
        return rfItemRepository.findAll();
    }

    /**
     * {@code GET  /rf-items/:id} : get the "id" rfItem.
     *
     * @param id the id of the rfItem to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the rfItem, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/rf-items/{id}")
    public ResponseEntity<RfItem> getRfItem(@PathVariable Long id) {
        log.debug("REST request to get RfItem : {}", id);
        Optional<RfItem> rfItem = rfItemRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(rfItem);
    }

    /**
     * {@code DELETE  /rf-items/:id} : delete the "id" rfItem.
     *
     * @param id the id of the rfItem to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/rf-items/{id}")
    public ResponseEntity<Void> deleteRfItem(@PathVariable Long id) {
        log.debug("REST request to delete RfItem : {}", id);
        rfItemRepository.deleteById(id);
        rfItemSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/rf-items?query=:query} : search for the rfItem corresponding
     * to the query.
     *
     * @param query the query of the rfItem search.
     * @return the result of the search.
     */
    @GetMapping("/_search/rf-items")
    public List<RfItem> searchRfItems(@RequestParam String query) {
        log.debug("REST request to search RfItems for query {}", query);
        return StreamSupport
            .stream(rfItemSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
