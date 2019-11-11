package com.alam.tokokitagate.web.rest;

import com.alam.tokokitagate.domain.StoreTrxDetails;
import com.alam.tokokitagate.repository.StoreTrxDetailsRepository;
import com.alam.tokokitagate.repository.search.StoreTrxDetailsSearchRepository;
import com.alam.tokokitagate.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link com.alam.tokokitagate.domain.StoreTrxDetails}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class StoreTrxDetailsResource {

    private final Logger log = LoggerFactory.getLogger(StoreTrxDetailsResource.class);

    private static final String ENTITY_NAME = "storeTrxDetails";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final StoreTrxDetailsRepository storeTrxDetailsRepository;

    private final StoreTrxDetailsSearchRepository storeTrxDetailsSearchRepository;

    public StoreTrxDetailsResource(StoreTrxDetailsRepository storeTrxDetailsRepository, StoreTrxDetailsSearchRepository storeTrxDetailsSearchRepository) {
        this.storeTrxDetailsRepository = storeTrxDetailsRepository;
        this.storeTrxDetailsSearchRepository = storeTrxDetailsSearchRepository;
    }

    /**
     * {@code POST  /store-trx-details} : Create a new storeTrxDetails.
     *
     * @param storeTrxDetails the storeTrxDetails to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new storeTrxDetails, or with status {@code 400 (Bad Request)} if the storeTrxDetails has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/store-trx-details")
    public ResponseEntity<StoreTrxDetails> createStoreTrxDetails(@Valid @RequestBody StoreTrxDetails storeTrxDetails) throws URISyntaxException {
        log.debug("REST request to save StoreTrxDetails : {}", storeTrxDetails);
        if (storeTrxDetails.getId() != null) {
            throw new BadRequestAlertException("A new storeTrxDetails cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StoreTrxDetails result = storeTrxDetailsRepository.save(storeTrxDetails);
        storeTrxDetailsSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/store-trx-details/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /store-trx-details} : Updates an existing storeTrxDetails.
     *
     * @param storeTrxDetails the storeTrxDetails to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated storeTrxDetails,
     * or with status {@code 400 (Bad Request)} if the storeTrxDetails is not valid,
     * or with status {@code 500 (Internal Server Error)} if the storeTrxDetails couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/store-trx-details")
    public ResponseEntity<StoreTrxDetails> updateStoreTrxDetails(@Valid @RequestBody StoreTrxDetails storeTrxDetails) throws URISyntaxException {
        log.debug("REST request to update StoreTrxDetails : {}", storeTrxDetails);
        if (storeTrxDetails.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        StoreTrxDetails result = storeTrxDetailsRepository.save(storeTrxDetails);
        storeTrxDetailsSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, storeTrxDetails.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /store-trx-details} : get all the storeTrxDetails.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of storeTrxDetails in body.
     */
    @GetMapping("/store-trx-details")
    public List<StoreTrxDetails> getAllStoreTrxDetails() {
        log.debug("REST request to get all StoreTrxDetails");
        return storeTrxDetailsRepository.findAll();
    }

    /**
     * {@code GET  /store-trx-details/:id} : get the "id" storeTrxDetails.
     *
     * @param id the id of the storeTrxDetails to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the storeTrxDetails, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/store-trx-details/{id}")
    public ResponseEntity<StoreTrxDetails> getStoreTrxDetails(@PathVariable Long id) {
        log.debug("REST request to get StoreTrxDetails : {}", id);
        Optional<StoreTrxDetails> storeTrxDetails = storeTrxDetailsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(storeTrxDetails);
    }

    /**
     * {@code DELETE  /store-trx-details/:id} : delete the "id" storeTrxDetails.
     *
     * @param id the id of the storeTrxDetails to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/store-trx-details/{id}")
    public ResponseEntity<Void> deleteStoreTrxDetails(@PathVariable Long id) {
        log.debug("REST request to delete StoreTrxDetails : {}", id);
        storeTrxDetailsRepository.deleteById(id);
        storeTrxDetailsSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/store-trx-details?query=:query} : search for the storeTrxDetails corresponding
     * to the query.
     *
     * @param query the query of the storeTrxDetails search.
     * @return the result of the search.
     */
    @GetMapping("/_search/store-trx-details")
    public List<StoreTrxDetails> searchStoreTrxDetails(@RequestParam String query) {
        log.debug("REST request to search StoreTrxDetails for query {}", query);
        return StreamSupport
            .stream(storeTrxDetailsSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
