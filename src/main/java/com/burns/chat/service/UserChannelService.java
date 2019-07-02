package com.burns.chat.service;

import com.burns.chat.domain.UserChannel;
import com.burns.chat.repository.UserChannelRepository;
import com.burns.chat.service.dto.UserChannelDTO;
import com.burns.chat.service.mapper.UserChannelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing UserChannel.
 */
@Service
@Transactional
public class UserChannelService {

    private final Logger log = LoggerFactory.getLogger(UserChannelService.class);

    private final UserChannelRepository userChannelRepository;

    private final UserChannelMapper userChannelMapper;

    public UserChannelService(UserChannelRepository userChannelRepository, UserChannelMapper userChannelMapper) {
        this.userChannelRepository = userChannelRepository;
        this.userChannelMapper = userChannelMapper;
    }

    /**
     * Save a userChannel.
     *
     * @param userChannelDTO the entity to save
     * @return the persisted entity
     */
    public UserChannelDTO save(UserChannelDTO userChannelDTO) {
        log.debug("Request to save UserChannel : {}", userChannelDTO);
        UserChannel userChannel = userChannelMapper.toEntity(userChannelDTO);
        userChannel = userChannelRepository.save(userChannel);
        return userChannelMapper.toDto(userChannel);
    }

    /**
     * Get all the userChannels.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<UserChannelDTO> findAll() {
        log.debug("Request to get all UserChannels");
        return userChannelRepository.findByUserIsCurrentUser().stream()
            .map(userChannelMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one userChannel by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public UserChannelDTO findOne(Long id) {
        log.debug("Request to get UserChannel : {}", id);
        UserChannel userChannel = userChannelRepository.findOne(id);
        return userChannelMapper.toDto(userChannel);
    }

    /**
     * Delete the userChannel by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete UserChannel : {}", id);
        userChannelRepository.delete(id);
    }

    public boolean userHasAccessTo(Long channelId) {
        return userChannelRepository.findByUserIsCurrentUserAndChannelId(channelId).isPresent();
    }
}
