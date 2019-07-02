package com.burns.chat.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the UserChannel entity.
 */
public class UserChannelDTO implements Serializable {

    private Long id;

    private Long userId;

    private String userLogin;

    private Long channelId;

    private Long lastReadId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserLogin() {
        return userLogin;
    }

    public void setUserLogin(String userLogin) {
        this.userLogin = userLogin;
    }

    public Long getChannelId() {
        return channelId;
    }

    public void setChannelId(Long channelId) {
        this.channelId = channelId;
    }

    public Long getLastReadId() {
        return lastReadId;
    }

    public void setLastReadId(Long messageId) {
        this.lastReadId = messageId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        UserChannelDTO userChannelDTO = (UserChannelDTO) o;
        if(userChannelDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userChannelDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserChannelDTO{" +
            "id=" + getId() +
            "}";
    }
}
