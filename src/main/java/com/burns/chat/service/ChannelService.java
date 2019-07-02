package com.burns.chat.service;

import com.burns.chat.domain.Channel;
import com.burns.chat.domain.User;
import com.burns.chat.domain.UserChannel;
import com.burns.chat.repository.ChannelRepository;
import com.burns.chat.service.dto.ChannelDTO;
import com.burns.chat.service.dto.UserChannelDTO;
import com.burns.chat.service.mapper.ChannelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Channel.
 */
@Service
@Transactional
public class ChannelService {

    private final Logger log = LoggerFactory.getLogger(ChannelService.class);

    private final UserService userService;

    private final ChannelRepository channelRepository;
    private final UserChannelService userChannelService;

    private final ChannelMapper channelMapper;

    public ChannelService(UserService userService,
                          ChannelRepository channelRepository,
                          UserChannelService userChannelService,
                          ChannelMapper channelMapper) {
        this.userService = userService;
        this.channelRepository = channelRepository;
        this.userChannelService = userChannelService;
        this.channelMapper = channelMapper;
    }

    /**
     * Save a channel.
     *
     * @param channelDTO the entity to save
     * @return the persisted entity
     */
    public ChannelDTO save(ChannelDTO channelDTO) {
        log.debug("Request to save Channel : {}", channelDTO);

        boolean isNewChannel = channelDTO.getId() == null;

        User user = null;
        if (isNewChannel) {
            Optional<User> optionalUser = userService.getCurrentUser();
            if (!optionalUser.isPresent()) {
                throw new IllegalStateException("Unable to get user");
            }
            user = optionalUser.get();
        }

        Channel channel = channelMapper.toEntity(channelDTO);
        channel = channelRepository.save(channel);

        // if new channel
        if (isNewChannel) {
            UserChannelDTO userChannel = new UserChannelDTO();
            userChannel.setChannelId(channel.getId());
            userChannel.setUserId(user.getId());
            userChannelService.save(userChannel);
        }

        return channelMapper.toDto(channel);
    }

    /**
     * Get all the channels.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<ChannelDTO> findAll() {
        log.debug("Request to get all Channels");
        List<Long> userChannels = userChannelService.findAll().stream()
            .map(UserChannelDTO::getChannelId)
            .collect(Collectors.toList());

        return channelRepository.findAll(userChannels).stream()
            .map(channelMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one channel by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public ChannelDTO findOne(Long id) {
        log.debug("Request to get Channel : {}", id);
        Channel channel = channelRepository.findOne(id);
        return channelMapper.toDto(channel);
    }

    /**
     * Delete the channel by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Channel : {}", id);
        channelRepository.delete(id);
    }

    public boolean userHasAccessTo(Long id) {
        return userChannelService.userHasAccessTo(id);
    }
}
