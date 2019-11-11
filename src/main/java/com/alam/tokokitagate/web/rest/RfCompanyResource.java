package com.alam.tokokitagate.web.rest;

import com.alam.tokokitagate.domain.RfCompany;
import com.alam.tokokitagate.repository.RfCompanyRepository;
import com.alam.tokokitagate.repository.search.RfCompanySearchRepository;
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
 * REST controller for managing {@link com.alam.tokokitagate.domain.RfCompany}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class RfCompanyResource {

    private final Logger log = LoggerFactory.getLogger(RfCompanyResource.class);

    private static final String ENTITY_NAME = "rfCompany";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RfCompanyRepository rfCompanyRepository;

    private final RfCompanySearchRepository rfCompanySearchRepository;

    public RfCompanyResource(RfCompanyRepository rfCompanyRepository, RfCompanySearchRepository rfCompanySearchRepository) {
        this.rfCompanyRepository = rfCompanyRepository;
        this.rfCompanySearchRepository = rfCompanySearchRepository;
    }

    /**
     * {@code POST  /rf-companies} : Create a new rfCompany.
     *
     * @param rfCompany the rfCompany to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new rfCompany, or with status {@code 400 (Bad Request)} if the rfCompany has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/rf-companies")
    public ResponseEntity<RfCompany> createRfCompany(@RequestBody RfCompany rfCompany) throws URISyntaxException {
        log.debug("REST request to save RfCompany : {}", rfCompany);
        if (rfCompany.getId() != null) {
            throw new BadRequestAlertException("A new rfCompany cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RfCompany result = rfCompanyRepository.save(rfCompany);
        rfCompanySearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/rf-companies/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /rf-companies} : Updates an existing rfCompany.
     *
     * @param rfCompany the rfCompany to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated rfCompany,
     * or with status {@code 400 (Bad Request)} if the rfCompany is not valid,
     * or with status {@code 500 (Internal Server Error)} if the rfCompany couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/rf-companies")
    public ResponseEntity<RfCompany> updateRfCompany(@RequestBody RfCompany rfCompany) throws URISyntaxException {
        log.debug("REST request to update RfCompany : {}", rfCompany);
        if (rfCompany.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RfCompany result = rfCompanyRepository.save(rfCompany);
        rfCompanySearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, rfCompany.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /rf-companies} : get all the rfCompanies.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of rfCompanies in body.
     */
    @GetMapping("/rf-companies")
    public List<RfCompany> getAllRfCompanies() {
        log.debug("REST request to get all RfCompanies");
        return rfCompanyRepository.findAll();
    }

    /**
     * {@code GET  /rf-companies/:id} : get the "id" rfCompany.
     *
     * @param id the id of the rfCompany to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the rfCompany, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/rf-companies/{id}")
    public ResponseEntity<RfCompany> getRfCompany(@PathVariable Long id) {
        log.debug("REST request to get RfCompany : {}", id);
        Optional<RfCompany> rfCompany = rfCompanyRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(rfCompany);
    }

    /**
     * {@code DELETE  /rf-companies/:id} : delete the "id" rfCompany.
     *
     * @param id the id of the rfCompany to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/rf-companies/{id}")
    public ResponseEntity<Void> deleteRfCompany(@PathVariable Long id) {
        log.debug("REST request to delete RfCompany : {}", id);
        rfCompanyRepository.deleteById(id);
        rfCompanySearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/rf-companies?query=:query} : search for the rfCompany corresponding
     * to the query.
     *
     * @param query the query of the rfCompany search.
     * @return the result of the search.
     */
    @GetMapping("/_search/rf-companies")
    public List<RfCompany> searchRfCompanies(@RequestParam String query) {
        log.debug("REST request to search RfCompanies for query {}", query);
        return StreamSupport
            .stream(rfCompanySearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
