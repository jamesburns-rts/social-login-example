package com.burns.chat.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Channel entity.
 */
public class ChannelDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(min = 1)
    private String name;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ChannelDTO channelDTO = (ChannelDTO) o;
        if(channelDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), channelDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ChannelDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
