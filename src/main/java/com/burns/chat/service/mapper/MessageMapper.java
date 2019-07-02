package com.burns.chat.service.mapper;

import com.burns.chat.domain.*;
import com.burns.chat.service.dto.MessageDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Message and its DTO MessageDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, ChannelMapper.class})
public interface MessageMapper extends EntityMapper<MessageDTO, Message> {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.login", target = "userLogin")
    @Mapping(source = "channel.id", target = "channelId")
    MessageDTO toDto(Message message);

    @Mapping(source = "userId", target = "user")
    @Mapping(source = "channelId", target = "channel")
    Message toEntity(MessageDTO messageDTO);

    default Message fromId(Long id) {
        if (id == null) {
            return null;
        }
        Message message = new Message();
        message.setId(id);
        return message;
    }
}
