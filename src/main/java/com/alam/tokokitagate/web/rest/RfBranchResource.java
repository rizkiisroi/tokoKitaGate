package com.alam.tokokitagate.web.rest;

import com.alam.tokokitagate.domain.RfBranch;
import com.alam.tokokitagate.repository.RfBranchRepository;
import com.alam.tokokitagate.repository.search.RfBranchSearchRepository;
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
 * REST controller for managing {@link com.alam.tokokitagate.domain.RfBranch}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class RfBranchResource {

    private final Logger log = LoggerFactory.getLogger(RfBranchResource.class);

    private static final String ENTITY_NAME = "rfBranch";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RfBranchRepository rfBranchRepository;

    private final RfBranchSearchRepository rfBranchSearchRepository;

    public RfBranchResource(RfBranchRepository rfBranchRepository, RfBranchSearchRepository rfBranchSearchRepository) {
        this.rfBranchRepository = rfBranchRepository;
        this.rfBranchSearchRepository = rfBranchSearchRepository;
    }

    /**
     * {@code POST  /rf-branches} : Create a new rfBranch.
     *
     * @param rfBranch the rfBranch to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new rfBranch, or with status {@code 400 (Bad Request)} if the rfBranch has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/rf-branches")
    public ResponseEntity<RfBranch> createRfBranch(@RequestBody RfBranch rfBranch) throws URISyntaxException {
        log.debug("REST request to save RfBranch : {}", rfBranch);
        if (rfBranch.getId() != null) {
            throw new BadRequestAlertException("A new rfBranch cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RfBranch result = rfBranchRepository.save(rfBranch);
        rfBranchSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/rf-branches/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /rf-branches} : Updates an existing rfBranch.
     *
     * @param rfBranch the rfBranch to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated rfBranch,
     * or with status {@code 400 (Bad Request)} if the rfBranch is not valid,
     * or with status {@code 500 (Internal Server Error)} if the rfBranch couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/rf-branches")
    public ResponseEntity<RfBranch> updateRfBranch(@RequestBody RfBranch rfBranch) throws URISyntaxException {
        log.debug("REST request to update RfBranch : {}", rfBranch);
        if (rfBranch.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RfBranch result = rfBranchRepository.save(rfBranch);
        rfBranchSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, rfBranch.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /rf-branches} : get all the rfBranches.
     *

     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of rfBranches in body.
     */
    @GetMapping("/rf-branches")
    public List<RfBranch> getAllRfBranches(@RequestParam(required = false) String filter) {
        if ("rfitem-is-null".equals(filter)) {
            log.debug("REST request to get all RfBranchs where rfItem is null");
            return StreamSupport
                .stream(rfBranchRepository.findAll().spliterator(), false)
                .filter(rfBranch -> rfBranch.getRfItem() == null)
                .collect(Collectors.toList());
        }
        if ("storetrx-is-null".equals(filter)) {
            log.debug("REST request to get all RfBranchs where storeTrx is null");
            return StreamSupport
                .stream(rfBranchRepository.findAll().spliterator(), false)
                .filter(rfBranch -> rfBranch.getStoreTrx() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all RfBranches");
        return rfBranchRepository.findAll();
    }

    /**
     * {@code GET  /rf-branches/:id} : get the "id" rfBranch.
     *
     * @param id the id of the rfBranch to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the rfBranch, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/rf-branches/{id}")
    public ResponseEntity<RfBranch> getRfBranch(@PathVariable Long id) {
        log.debug("REST request to get RfBranch : {}", id);
        Optional<RfBranch> rfBranch = rfBranchRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(rfBranch);
    }

    /**
     * {@code DELETE  /rf-branches/:id} : delete the "id" rfBranch.
     *
     * @param id the id of the rfBranch to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/rf-branches/{id}")
    public ResponseEntity<Void> deleteRfBranch(@PathVariable Long id) {
        log.debug("REST request to delete RfBranch : {}", id);
        rfBranchRepository.deleteById(id);
        rfBranchSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/rf-branches?query=:query} : search for the rfBranch corresponding
     * to the query.
     *
     * @param query the query of the rfBranch search.
     * @return the result of the search.
     */
    @GetMapping("/_search/rf-branches")
    public List<RfBranch> searchRfBranches(@RequestParam String query) {
        log.debug("REST request to search RfBranches for query {}", query);
        return StreamSupport
            .stream(rfBranchSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
