package com.burns.chat.repository;

import com.burns.chat.domain.UserChannel;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;
import java.util.Optional;

/**
 * Spring Data JPA repository for the UserChannel entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserChannelRepository extends JpaRepository<UserChannel, Long> {

    @Query("select user_channel from UserChannel user_channel where user_channel.user.login = ?#{principal.username}")
    List<UserChannel> findByUserIsCurrentUser();

    @Query("select user_channel from UserChannel user_channel where user_channel.user.login = ?#{principal.username} and user_channel.channel.id = :channelId")
    Optional<UserChannel> findByUserIsCurrentUserAndChannelId(@Param("channelId") Long channelId);
}
