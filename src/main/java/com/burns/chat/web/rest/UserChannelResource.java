package com.burns.chat.web.rest;

import com.burns.chat.service.UserChannelService;
import com.burns.chat.service.dto.UserChannelDTO;
import com.burns.chat.web.rest.errors.BadRequestAlertException;
import com.burns.chat.web.rest.util.HeaderUtil;
import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing UserChannel.
 */
@RestController
@RequestMapping("/api")
public class UserChannelResource {

    private final Logger log = LoggerFactory.getLogger(UserChannelResource.class);

    private static final String ENTITY_NAME = "userChannel";

    private final UserChannelService userChannelService;

    public UserChannelResource(UserChannelService userChannelService) {
        this.userChannelService = userChannelService;
    }

    /**
     * POST  /user-channels : Create a new userChannel.
     *
     * @param userChannelDTO the userChannelDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new userChannelDTO, or with status 400 (Bad Request) if the userChannel has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/user-channels")
    @Timed
    public ResponseEntity<UserChannelDTO> createUserChannel(@Valid @RequestBody UserChannelDTO userChannelDTO) throws URISyntaxException {
        log.debug("REST request to save UserChannel : {}", userChannelDTO);
        if (userChannelDTO.getId() != null) {
            throw new BadRequestAlertException("A new userChannel cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserChannelDTO result = userChannelService.save(userChannelDTO);
        return ResponseEntity.created(new URI("/api/user-channels/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /user-channels : Updates an existing userChannel.
     *
     * @param userChannelDTO the userChannelDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated userChannelDTO,
     * or with status 400 (Bad Request) if the userChannelDTO is not valid,
     * or with status 500 (Internal Server Error) if the userChannelDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/user-channels")
    @Timed
    public ResponseEntity<UserChannelDTO> updateUserChannel(@Valid @RequestBody UserChannelDTO userChannelDTO) throws URISyntaxException {
        log.debug("REST request to update UserChannel : {}", userChannelDTO);
        if (userChannelDTO.getId() == null) {
            return createUserChannel(userChannelDTO);
        }
        UserChannelDTO result = userChannelService.save(userChannelDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, userChannelDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /user-channels : get all the userChannels.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of userChannels in body
     */
    @GetMapping("/user-channels")
    @Timed
    public List<UserChannelDTO> getAllUserChannels() {
        log.debug("REST request to get all UserChannels");
        return userChannelService.findAll();
    }

    /**
     * GET  /user-channels/:id : get the "id" userChannel.
     *
     * @param id the id of the userChannelDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the userChannelDTO, or with status 404 (Not Found)
     */
    @GetMapping("/user-channels/{id}")
    @Timed
    public ResponseEntity<UserChannelDTO> getUserChannel(@PathVariable Long id) {
        log.debug("REST request to get UserChannel : {}", id);
        UserChannelDTO userChannelDTO = userChannelService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(userChannelDTO));
    }

    /**
     * DELETE  /user-channels/:id : delete the "id" userChannel.
     *
     * @param id the id of the userChannelDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/user-channels/{id}")
    @Timed
    public ResponseEntity<Void> deleteUserChannel(@PathVariable Long id) {
        log.debug("REST request to delete UserChannel : {}", id);
        userChannelService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
