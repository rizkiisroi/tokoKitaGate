package com.alam.tokokitagate.web.rest;

import com.alam.tokokitagate.domain.StoreTrx;
import com.alam.tokokitagate.repository.StoreTrxRepository;
import com.alam.tokokitagate.repository.search.StoreTrxSearchRepository;
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
 * REST controller for managing {@link com.alam.tokokitagate.domain.StoreTrx}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class StoreTrxResource {

    private final Logger log = LoggerFactory.getLogger(StoreTrxResource.class);

    private static final String ENTITY_NAME = "storeTrx";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final StoreTrxRepository storeTrxRepository;

    private final StoreTrxSearchRepository storeTrxSearchRepository;

    public StoreTrxResource(StoreTrxRepository storeTrxRepository, StoreTrxSearchRepository storeTrxSearchRepository) {
        this.storeTrxRepository = storeTrxRepository;
        this.storeTrxSearchRepository = storeTrxSearchRepository;
    }

    /**
     * {@code POST  /store-trxes} : Create a new storeTrx.
     *
     * @param storeTrx the storeTrx to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new storeTrx, or with status {@code 400 (Bad Request)} if the storeTrx has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/store-trxes")
    public ResponseEntity<StoreTrx> createStoreTrx(@RequestBody StoreTrx storeTrx) throws URISyntaxException {
        log.debug("REST request to save StoreTrx : {}", storeTrx);
        if (storeTrx.getId() != null) {
            throw new BadRequestAlertException("A new storeTrx cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StoreTrx result = storeTrxRepository.save(storeTrx);
        storeTrxSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/store-trxes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /store-trxes} : Updates an existing storeTrx.
     *
     * @param storeTrx the storeTrx to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated storeTrx,
     * or with status {@code 400 (Bad Request)} if the storeTrx is not valid,
     * or with status {@code 500 (Internal Server Error)} if the storeTrx couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/store-trxes")
    public ResponseEntity<StoreTrx> updateStoreTrx(@RequestBody StoreTrx storeTrx) throws URISyntaxException {
        log.debug("REST request to update StoreTrx : {}", storeTrx);
        if (storeTrx.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        StoreTrx result = storeTrxRepository.save(storeTrx);
        storeTrxSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, storeTrx.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /store-trxes} : get all the storeTrxes.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of storeTrxes in body.
     */
    @GetMapping("/store-trxes")
    public List<StoreTrx> getAllStoreTrxes() {
        log.debug("REST request to get all StoreTrxes");
        return storeTrxRepository.findAll();
    }

    /**
     * {@code GET  /store-trxes/:id} : get the "id" storeTrx.
     *
     * @param id the id of the storeTrx to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the storeTrx, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/store-trxes/{id}")
    public ResponseEntity<StoreTrx> getStoreTrx(@PathVariable Long id) {
        log.debug("REST request to get StoreTrx : {}", id);
        Optional<StoreTrx> storeTrx = storeTrxRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(storeTrx);
    }

    /**
     * {@code DELETE  /store-trxes/:id} : delete the "id" storeTrx.
     *
     * @param id the id of the storeTrx to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/store-trxes/{id}")
    public ResponseEntity<Void> deleteStoreTrx(@PathVariable Long id) {
        log.debug("REST request to delete StoreTrx : {}", id);
        storeTrxRepository.deleteById(id);
        storeTrxSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/store-trxes?query=:query} : search for the storeTrx corresponding
     * to the query.
     *
     * @param query the query of the storeTrx search.
     * @return the result of the search.
     */
    @GetMapping("/_search/store-trxes")
    public List<StoreTrx> searchStoreTrxes(@RequestParam String query) {
        log.debug("REST request to search StoreTrxes for query {}", query);
        return StreamSupport
            .stream(storeTrxSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
