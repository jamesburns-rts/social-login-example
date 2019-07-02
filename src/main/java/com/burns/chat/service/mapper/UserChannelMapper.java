package com.burns.chat.service.mapper;

import com.burns.chat.domain.*;
import com.burns.chat.service.dto.UserChannelDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity UserChannel and its DTO UserChannelDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, ChannelMapper.class, MessageMapper.class})
public interface UserChannelMapper extends EntityMapper<UserChannelDTO, UserChannel> {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.login", target = "userLogin")
    @Mapping(source = "channel.id", target = "channelId")
    @Mapping(source = "lastRead.id", target = "lastReadId")
    UserChannelDTO toDto(UserChannel userChannel);

    @Mapping(source = "userId", target = "user")
    @Mapping(source = "channelId", target = "channel")
    @Mapping(source = "lastReadId", target = "lastRead")
    UserChannel toEntity(UserChannelDTO userChannelDTO);

    default UserChannel fromId(Long id) {
        if (id == null) {
            return null;
        }
        UserChannel userChannel = new UserChannel();
        userChannel.setId(id);
        return userChannel;
    }
}
