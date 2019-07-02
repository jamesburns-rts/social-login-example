package com.burns.chat.service.mapper;

import com.burns.chat.domain.*;
import com.burns.chat.service.dto.ChannelDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Channel and its DTO ChannelDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ChannelMapper extends EntityMapper<ChannelDTO, Channel> {



    default Channel fromId(Long id) {
        if (id == null) {
            return null;
        }
        Channel channel = new Channel();
        channel.setId(id);
        return channel;
    }
}
