package com.burns.chat.service;

import com.burns.chat.domain.Channel;
import com.burns.chat.domain.Message;
import com.burns.chat.domain.User;
import com.burns.chat.repository.MessageRepository;
import com.burns.chat.service.dto.MessageDTO;
import com.burns.chat.service.mapper.MessageMapper;
import com.burns.chat.web.rest.vm.NewMessageVm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.Optional;


/**
 * Service Implementation for managing Message.
 */
@Service
@Transactional
public class MessageService {

    private final Logger log = LoggerFactory.getLogger(MessageService.class);

    private final UserService userService;

    private final MessageRepository messageRepository;

    private final MessageMapper messageMapper;

    public MessageService(UserService userService,
                          MessageRepository messageRepository,
                          MessageMapper messageMapper) {
        this.userService = userService;
        this.messageRepository = messageRepository;
        this.messageMapper = messageMapper;
    }


    public MessageDTO createMessage(NewMessageVm vm) {
        log.debug("Request to save Message : {}", vm);
        Optional<User> optionalUser = userService.getCurrentUser();
        if (!optionalUser.isPresent()) {
            throw new IllegalStateException("Unable to get user");
        }
        User user = optionalUser.get();
        Message message = new Message();
        message.setContent(vm.getContent());
        message.setUser(user);
        message.setTimestamp(ZonedDateTime.now());

        Channel channel = new Channel();
        channel.setId(vm.getChannelId());
        message.setChannel(channel);
        message = messageRepository.save(message);
        return messageMapper.toDto(message);
    }

    /**
     * Save a message.
     *
     * @param messageDTO the entity to save
     * @return the persisted entity
     */
    public MessageDTO save(MessageDTO messageDTO) {
        log.debug("Request to save Message : {}", messageDTO);
        Message message = messageMapper.toEntity(messageDTO);
        message = messageRepository.save(message);
        return messageMapper.toDto(message);
    }

    /**
     * Get all the messages.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<MessageDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Messages");
        return messageRepository.findAll(pageable)
            .map(messageMapper::toDto);
    }

    /**
     * Get the messages for a channel.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<MessageDTO> findByChannelId(Long channelId, Pageable pageable) {
        log.debug("Request to get all Messages");
        return messageRepository.findByChannelId(channelId, pageable)
            .map(messageMapper::toDto);
    }

    /**
     * Get one message by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public MessageDTO findOne(Long id) {
        log.debug("Request to get Message : {}", id);
        Message message = messageRepository.findOne(id);
        return messageMapper.toDto(message);
    }

    /**
     * Delete the message by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Message : {}", id);
        messageRepository.delete(id);
    }
}
